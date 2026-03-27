import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactStatus = "success" | "error" | "limited" | "invalid";

type RateLimitEntry = {
	count: number;
	windowStart: number;
};

declare global {
	var __contactRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_FIELD_LENGTH = {
	name: 80,
	phone: 16,
	email: 120,
	subject: 140,
	message: 4000,
};

const E164_PHONE_REGEX = /^\+?[1-9]\d{7,14}$/;

const rateLimitStore =
	globalThis.__contactRateLimitStore ?? new Map<string, RateLimitEntry>();
globalThis.__contactRateLimitStore = rateLimitStore;

export const runtime = "nodejs";

function normalizeInput(value: FormDataEntryValue | null) {
	if (typeof value !== "string") return "";
	return value.trim();
}

function getClientIp(request: NextRequest) {
	const forwardedFor = request.headers.get("x-forwarded-for");
	if (forwardedFor) {
		const first = forwardedFor.split(",")[0];
		if (first) return first.trim();
	}
	const realIp = request.headers.get("x-real-ip");
	if (realIp) return realIp.trim();
	return "unknown";
}

function isRateLimited(identifier: string) {
	const now = Date.now();
	const existing = rateLimitStore.get(identifier);

	if (!existing || now - existing.windowStart > RATE_LIMIT_WINDOW_MS) {
		rateLimitStore.set(identifier, { count: 1, windowStart: now });
		return false;
	}

	existing.count += 1;
	rateLimitStore.set(identifier, existing);
	return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

function clearExpiredRateLimitEntries() {
	const now = Date.now();
	for (const [key, value] of rateLimitStore.entries()) {
		if (now - value.windowStart > RATE_LIMIT_WINDOW_MS) {
			rateLimitStore.delete(key);
		}
	}
}

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(phone: string) {
	return phone.replace(/[\s().-]/g, "");
}

function isValidPhone(phone: string) {
	return E164_PHONE_REGEX.test(phone);
}

function truncate(value: string, maxLength: number) {
	if (value.length <= maxLength) return value;
	return value.slice(0, maxLength);
}

function buildRedirectUrl(request: NextRequest, status: ContactStatus) {
	const requestUrl = new URL(request.url);
	const referer = request.headers.get("referer");
	let target = new URL("/", requestUrl.origin);

	if (referer) {
		try {
			const parsed = new URL(referer);
			if (parsed.origin === requestUrl.origin) {
				target = new URL(parsed.pathname + parsed.search, requestUrl.origin);
			}
		} catch {
			// Ignore invalid referer values and keep default fallback.
		}
	}

	target.searchParams.set("contact", status);
	return target;
}

function respond(request: NextRequest, status: ContactStatus, httpStatus = 303) {
	const redirectUrl = buildRedirectUrl(request, status);
	return NextResponse.redirect(redirectUrl, httpStatus);
}

function wantsJson(request: NextRequest) {
	const accept = request.headers.get("accept") ?? "";
	return accept.includes("application/json");
}

function respondApi(request: NextRequest, status: ContactStatus, httpStatus = 200) {
	if (wantsJson(request)) {
		return NextResponse.json({ status }, { status: httpStatus });
	}
	return respond(request, status);
}

async function verifyTurnstileToken(token: string, remoteIp: string) {
	const secret = process.env.TURNSTILE_SECRET_KEY;
	if (!secret) return true;
	if (!token) return false;

	const body = new URLSearchParams({
		secret,
		response: token,
		remoteip: remoteIp,
	});

	const verificationResponse = await fetch(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		{
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body,
			cache: "no-store",
		},
	);

	if (!verificationResponse.ok) return false;

	const result = (await verificationResponse.json()) as { success?: boolean };
	return Boolean(result.success);
}

async function sendEmail(payload: {
	name: string;
	phone: string;
	email: string;
	subject: string;
	message: string;
}) {
	const smtpHost = process.env.SMTP_HOST;
	const smtpPort = Number(process.env.SMTP_PORT ?? "587");
	const smtpSecure =
		process.env.SMTP_SECURE === "true" || (!Number.isNaN(smtpPort) && smtpPort === 465);
	const smtpUser = process.env.SMTP_USER;
	const smtpPass = process.env.SMTP_PASS;
	const toEmail = process.env.CONTACT_TO_EMAIL;
	const fromEmail = process.env.CONTACT_FROM_EMAIL;

	if (
		!smtpHost ||
		!Number.isFinite(smtpPort) ||
		!smtpUser ||
		!smtpPass ||
		!toEmail ||
		!fromEmail
	) {
		throw new Error(
			"Missing env vars. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.",
		);
	}

	const transporter = nodemailer.createTransport({
		host: smtpHost,
		port: smtpPort,
		secure: smtpSecure,
		auth: {
			user: smtpUser,
			pass: smtpPass,
		},
	});

	const html = `
		<h2>New contact message</h2>
		<p><strong>Name:</strong> ${payload.name}</p>
		<p><strong>Email:</strong> ${payload.email}</p>
		<p><strong>Phone:</strong> ${payload.phone || "-"}</p>
		<p><strong>Subject:</strong> ${payload.subject}</p>
		<p><strong>Message:</strong></p>
		<p>${payload.message.replace(/\n/g, "<br />")}</p>
	`;

	const text = [
		"New contact message",
		`Name: ${payload.name}`,
		`Email: ${payload.email}`,
		`Phone: ${payload.phone || "-"}`,
		`Subject: ${payload.subject}`,
		"",
		"Message:",
		payload.message,
	].join("\n");

	await transporter.sendMail({
		from: fromEmail,
		to: toEmail,
		subject: `[Portfolio] ${truncate(payload.subject, 100)}`,
		html,
		text,
		replyTo: payload.email,
	});
}

export async function POST(request: NextRequest) {
	clearExpiredRateLimitEntries();

	const origin = request.headers.get("origin");
	if (origin && origin !== request.nextUrl.origin) {
		return respondApi(request, "invalid", 400);
	}

	const clientIp = getClientIp(request);
	if (isRateLimited(clientIp)) {
		return respondApi(request, "limited", 429);
	}

	const formData = await request.formData();

	const honeypot = normalizeInput(formData.get("website"));
	if (honeypot) {
		return respondApi(request, "success");
	}

	const turnstileToken = normalizeInput(formData.get("cf-turnstile-response"));
	const captchaValid = await verifyTurnstileToken(turnstileToken, clientIp);
	if (!captchaValid) {
		return respondApi(request, "invalid", 400);
	}

	const name = normalizeInput(formData.get("name"));
	const phone = normalizePhone(normalizeInput(formData.get("phone")));
	const email = normalizeInput(formData.get("email"));
	const subject = normalizeInput(formData.get("subject"));
	const message = normalizeInput(formData.get("message"));

	const hasInvalidLength =
		name.length > MAX_FIELD_LENGTH.name ||
		phone.length > MAX_FIELD_LENGTH.phone ||
		email.length > MAX_FIELD_LENGTH.email ||
		subject.length > MAX_FIELD_LENGTH.subject ||
		message.length > MAX_FIELD_LENGTH.message;

	if (
		!name ||
		!email ||
		!subject ||
		!message ||
		!isValidEmail(email) ||
		(phone.length > 0 && !isValidPhone(phone)) ||
		hasInvalidLength
	) {
		return respondApi(request, "invalid", 400);
	}

	try {
		await sendEmail({
			name: truncate(name, MAX_FIELD_LENGTH.name),
			phone: truncate(phone, MAX_FIELD_LENGTH.phone),
			email: truncate(email, MAX_FIELD_LENGTH.email),
			subject: truncate(subject, MAX_FIELD_LENGTH.subject),
			message: truncate(message, MAX_FIELD_LENGTH.message),
		});
		return respondApi(request, "success");
	} catch (error) {
		console.error("Contact form submission failed", error);
		return respondApi(request, "error", 500);
	}
}
