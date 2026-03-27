const scoreBadgeStyle = {
	background: "linear-gradient(var(--tc-bg-3), var(--tc-bg-3)) padding-box, var(--tc-linear-4) border-box",
	border: "1px solid transparent",
} as const

export default function Education2() {
	return (
		<>
			<section id="resume" className="section-education pt-5">
				<div className="container">
					<div className="row g-4">
						<div className="col-lg-6">
							<div className="rounded-3 border border-1 position-relative h-100 overflow-hidden">
								<div className="box-linear-animation position-relative z-1 p-lg-6 p-4 h-100">
									<div className="d-flex align-items-end">
										<svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 24 24" fill="none" className="pb-2 pe-2 border-end border-1">
											<path className="fill-primary-2" d="M12 3L1 9L12 15L21 10.0909V17H23V9L12 3ZM5 12.6545V16.2727C5 18.4818 8.13401 20.2727 12 20.2727C15.866 20.2727 19 18.4818 19 16.2727V12.6545L12 16.4727L5 12.6545Z" fill="#A8FF53" />
										</svg>
										<h3 className="fw-semibold mb-0 border-bottom border-1 pb-2 w-100">Education</h3>
									</div>

									<div className="mt-5">
										<div className="rounded-3 border border-1 px-4 py-4 mt-4">
											<p className="fw-extra-bold text-linear-4 mb-2">2021 - 2025</p>
											<h5 className="mb-1">Bachelor&apos;s Degree in Computer Science</h5>
											<p className="text-300 mb-0">Government College University, Lahore</p>
											<div className="d-flex justify-content-start mt-3 pt-3 border-top border-1">
												<span className="d-inline-flex align-items-center px-3 py-1 rounded-pill fw-semibold text-primary-2" style={scoreBadgeStyle}>
													CGPA: 3.00/4.00
												</span>
											</div>
										</div>

										<div className="rounded-3 border border-1 px-4 py-4 mt-4">
											<p className="fw-extra-bold text-linear-4 mb-2">2019 - 2021</p>
											<h5 className="mb-1">FSC Pre-Engineering</h5>
											<p className="text-300 mb-0">Government College Township, Lahore</p>
											<div className="d-flex justify-content-start mt-3 pt-3 border-top border-1">
												<span className="d-inline-flex align-items-center px-3 py-1 rounded-pill fw-semibold text-primary-2" style={scoreBadgeStyle}>
													Grade: A+
												</span>
											</div>
										</div>

										<div className="rounded-3 border border-1 px-4 py-4 mt-4">
											<p className="fw-extra-bold text-linear-4 mb-2">2016 - 2018</p>
											<h5 className="mb-1">Matric in Science</h5>
											<p className="text-300 mb-0">The Lahore Garrison School</p>
											<div className="d-flex justify-content-start mt-3 pt-3 border-top border-1">
												<span className="d-inline-flex align-items-center px-3 py-1 rounded-pill fw-semibold text-primary-2" style={scoreBadgeStyle}>
													Grade: A+
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-6">
							<div className="rounded-3 border border-1 position-relative h-100 overflow-hidden">
								<div className="box-linear-animation position-relative z-1 p-lg-6 p-4 h-100">
									<div className="d-flex align-items-end">
										<svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 24 24" fill="none" className="pb-2 pe-2 border-end border-1">
											<path className="fill-primary-2" d="M9 3V5H15V3H17V5H21C21.5523 5 22 5.44772 22 6V19C22 19.5523 21.5523 20 21 20H3C2.44772 20 2 19.5523 2 19V6C2 5.44772 2.44772 5 3 5H7V3H9ZM20 13H4V18H20V13ZM8 7H4V11H20V7H16V9H14V7H10V9H8V7Z" fill="#A8FF53" />
										</svg>
										<h3 className="fw-semibold mb-0 border-bottom border-1 pb-2 w-100">Experience</h3>
									</div>

									<div className="mt-5">
										<div className="rounded-3 border border-1 px-4 py-4 mt-4">
											<div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
												<p className="fw-extra-bold text-linear-4 mb-0">Dec 2025 - Feb 2026</p>
												<span className="text-300 border border-1 rounded-pill px-3 py-1">Internship</span>
											</div>
											<h5 className="mb-1">MERN Stack Intern</h5>
											<p className="text-secondary-2 fw-semibold mb-3">SILICONWHIZ</p>
											<ul className="mb-0 ps-4">
												<li className="text-300 mb-2">Built full-stack applications, including real-time chat and backend automation systems.</li>
												<li className="text-300 mb-2">Implemented scalable data modeling, event-driven workflows, and API integrations.</li>
												<li className="text-300 mb-0">Improved reliability through testing, debugging, and performance optimization in collaborative delivery cycles.</li>
											</ul>
										</div>

										<div className="rounded-3 border border-1 px-4 py-4 mt-4">
											<div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
												<p className="fw-extra-bold text-linear-4 mb-0">Sep 2025 - Nov 2025</p>
												<span className="text-300 border border-1 rounded-pill px-3 py-1">Internship</span>
											</div>
											<h5 className="mb-1">MERN Stack Intern</h5>
											<p className="text-secondary-2 fw-semibold mb-3">ITBEAM</p>
											<ul className="mb-0 ps-4">
												<li className="text-300 mb-2">Developed a full-stack MERN e-commerce platform with secure payments and role-based access control.</li>
												<li className="text-300 mb-0">Optimized APIs and database queries while delivering a fully responsive React UI.</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
