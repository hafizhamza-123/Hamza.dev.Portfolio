"use client";

import { FormEvent, type CSSProperties, useState } from "react";
import Script from "next/script";

type ContactStatus = "success" | "error" | "limited" | "invalid";

type Contact2Props = {
	status?: ContactStatus;
};

const E164_PHONE_REGEX = /^(?:\+92|0)3[0-9]{9}$/;

function normalizePhone(phone: string) {
	return phone.replace(/[\s().-]/g, "");
}

function isValidPhone(phone: string) {
	return E164_PHONE_REGEX.test(phone);
}

const statusMessage: Record<
	ContactStatus,
	{ text: string; className: string; style: CSSProperties }
> = {
	success: {
		text: "Your message has been sent successfully.",
		className: "alert rounded-3 border mb-3",
		style: {
			backgroundColor: "#ecfdf3",
			color: "#065f46",
			borderColor: "#6ee7b7",
		},
	},
	error: {
		text: "Something went wrong while sending your message. Please try again.",
		className: "alert rounded-3 border mb-3",
		style: {
			backgroundColor: "#fef2f2",
			color: "#991b1b",
			borderColor: "#fca5a5",
		},
	},
	limited: {
		text: "Too many attempts. Please wait a few minutes before trying again.",
		className: "alert rounded-3 border mb-3",
		style: {
			backgroundColor: "#fffbeb",
			color: "#92400e",
			borderColor: "#fcd34d",
		},
	},
	invalid: {
		text: "Please check your details and try again.",
		className: "alert rounded-3 border mb-3",
		style: {
			backgroundColor: "#fffbeb",
			color: "#92400e",
			borderColor: "#fcd34d",
		},
	},
};

export default function Contact2({ status }: Contact2Props) {
	const [submitStatus, setSubmitStatus] = useState<ContactStatus | undefined>(status);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const feedback = submitStatus ? statusMessage[submitStatus] : null;
	const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(undefined);

		const form = event.currentTarget;
		const body = new FormData(form);
		const rawPhone = typeof body.get("phone") === "string" ? String(body.get("phone")) : "";
		const normalizedPhone = normalizePhone(rawPhone);

		if (normalizedPhone && !isValidPhone(normalizedPhone)) {
			setSubmitStatus("invalid");
			setIsSubmitting(false);
			return;
		}

		body.set("phone", normalizedPhone);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				body,
				headers: {
					Accept: "application/json",
				},
			});

			const data = (await response.json()) as { status?: ContactStatus };
			const nextStatus = data.status ?? "error";
			setSubmitStatus(nextStatus);

			if (nextStatus === "success") {
				form.reset();
			}
		} catch (error) {
			console.error("Contact form request failed", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<>
			<section id="contact" className="section-contact-2 position-relative pt-5 pb-60 overflow-hidden">
				<div className="container position-relative z-1">
					<div className="row align-items-center">
						<div className="col-lg-7 pb-5 pb-lg-0">
							<div className="position-relative">
								<div className="position-relative z-2">
									<h3 className="text-primary-2 mb-3">Let&apos;s connect</h3>
									{feedback && (
										<div className={feedback.className} style={feedback.style} role="status" aria-live="polite">
											{feedback.text}
										</div>
									)}
									<form action="/api/contact" method="POST" onSubmit={handleSubmit}>
										<div className="row g-3">
											<div className="col-md-6 ">
												<input
													type="text"
													className="form-control bg-3 border border-1 rounded-3"
													id="name"
													name="name"
													placeholder="Your name"
													aria-label="name"
													autoComplete="name"
													required
													maxLength={80}
												/>
											</div>
											<div className="col-md-6">
												<input
													type="tel"
													className="form-control bg-3 border border-1 rounded-3"
													id="phone"
													name="phone"
													placeholder="Phone (e.g. +923231234567)"
													aria-label="phone"
													autoComplete="tel"
													inputMode="numeric"
													pattern="\+?[0-9]\d{7,14}"
													title="Use global format: optional +, then 8 to 15 digits."
													maxLength={16}
												/>
											</div>
											<div className="col-md-6">
												<input
													type="email"
													className="form-control bg-3 border border-1 rounded-3"
													id="email"
													name="email"
													placeholder="Email"
													aria-label="email"
													autoComplete="email"
													required
													maxLength={120}
												/>
											</div>
											<div className="col-md-6">
												<input
													type="text"
													className="form-control bg-3 border border-1 rounded-3"
													id="subject"
													name="subject"
													placeholder="Subject"
													aria-label="subject"
													required
													maxLength={140}
												/>
											</div>
											<div className="col-12">
												<textarea
													className="form-control bg-3 border border-1 rounded-3"
													id="message"
													name="message"
													placeholder="Message"
													aria-label="message"
													required
													rows={5}
													maxLength={4000}
													defaultValue={""}
												/>
											</div>
											
											<div className="position-absolute" style={{ left: "-9999px" }} aria-hidden="true">
												<label htmlFor="website">Website</label>
												<input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
											</div>
											<div className="col-12">
												<button type="submit" className="btn btn-primary-2 rounded-2" disabled={isSubmitting}>
													{isSubmitting ? "Sending..." : "Send Message"}
													<i className="ri-arrow-right-up-line" />
												</button>
											</div>
										</div>
									</form>
								</div>
								<div className="z-0 bg-primary-dark rectangle-bg z-1 rounded-3" />
							</div>
						</div>
						<div className="col-lg-5 d-flex flex-column ps-lg-8">
							<div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
								<div className="d-inline-block">
									<div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
										<i className="ri-phone-fill text-primary-2 fs-26" />
									</div>
								</div>
								<div className="ps-3 h-100">
									<span className="text-400 fs-6">Phone Number</span>
									<h6 className="mb-0">+92-323-2232309</h6>
								</div>
								<a href="tel:+92-323-2232309" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
							<div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
								<div className="d-inline-block">
									<div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
										<i className="ri-mail-fill text-primary-2 fs-26" />
									</div>
								</div>
								<div className="ps-3 h-100">
									<span className="text-400 fs-6">Email</span>
									<h6 className="mb-0">mhamza0254cs21@gmail.com</h6>
								</div>
								<a href="mailto:mhamza0254cs21@gmail.com" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
							<div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
								<div className="d-inline-block">
									<div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
										<i className="ri-linkedin-fill text-primary-2 fs-26" />
									</div>
								</div>
								<div className="ps-3 h-100">
									<span className="text-400 fs-6">LinkedIn</span>
									<h6 className="mb-0">M Hamza Baig</h6>
								</div>
								<a href="https://www.linkedin.com/in/muhammad-hamza-baig-987080318" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
							<div className="d-flex align-items-center mb-3 position-relative d-inline-flex">
								<div className="d-inline-block">
									<div className="icon-flip flex-nowrap icon-shape icon-xxl border border-1 rounded-3 bg-3">
										<i className="ri-map-2-fill text-primary-2 fs-26" />
									</div>
								</div>
								<div className="ps-3 h-100">
									<span className="text-400 fs-6">Address</span>
									<h6 className="mb-0">Johar town, Lahore</h6>
								</div>
								<a href="https://maps.app.goo.gl/Yq4gwUtJAuTps4rF6" className="position-absolute top-0 start-0 w-100 h-100" />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
