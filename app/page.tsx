import Layout from "@/components/layout/Layout";
import Contact2 from "@/components/sections/Contact2";
import Education2 from "@/components/sections/Education2";
import Home2 from "@/components/sections/Home2";
import Projects2 from "@/components/sections/Projects2";
import Service2 from "@/components/sections/Service2";
import Skills2 from "@/components/sections/Skills2";
import Static2 from "@/components/sections/Static2";

type ContactStatus = "success" | "error" | "limited" | "invalid";

type HomeProps = {
	searchParams?: {
		contact?: string | string[];
	};
};

function getContactStatus(rawStatus: string | string[] | undefined): ContactStatus | undefined {
	const value = Array.isArray(rawStatus) ? rawStatus[0] : rawStatus;
	if (value === "success" || value === "error" || value === "limited" || value === "invalid") {
		return value;
	}
	return undefined;
}

export default function Home({ searchParams }: HomeProps) {
	const contactStatus = getContactStatus(searchParams?.contact);

	return (
		<div style={{ fontFamily: "var(--dmMono)" }}>
			<Layout>
				<Home2 />
				<Static2 />
				<Education2 />
				<Projects2 />
				<Skills2 />
				<Service2 />
				<Contact2 status={contactStatus} />
			</Layout>
		</div>
	);
}
