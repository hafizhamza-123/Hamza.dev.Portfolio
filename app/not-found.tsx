import Link from "next/link";

export default function NotFound() {
	return (
		<main
			style={{
				minHeight: "100vh",
				display: "grid",
				placeItems: "center",
				padding: "2rem",
				textAlign: "center",
			}}
		>
			<div>
				<h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>404</h1>
				<p style={{ marginBottom: "1rem" }}>Page not found.</p>
				<Link href="/">Go back home</Link>
			</div>
		</main>
	);
}
