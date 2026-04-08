import Link from 'next/link'

export default function OffCanvas({ isOffCanvas, handleOffCanvas }: any) {
	return (
		<>
			{/* offCanvas-menu */}
			<div className={`offCanvas__info style-2 ${isOffCanvas ? 'active' : ''}`}>
					<div className="offCanvas__close-icon menu-close" onClick={handleOffCanvas}>
						<button><i className="ri-close-line" /></button>
					</div>
					<div className="offCanvas__logo mb-5">
						<h3 className="mb-0 text-linear-4">Get in touch</h3>
					</div>
					<div className="offCanvas__side-info mb-30">
						<div className="contact-list mb-30">
							<p className="fs-6 fw-medium text-200 mb-5">I'm always excited to take on new projects and collaborate with innovative minds.</p>
							<div className="mb-3">
								<span className="text-400 fs-5">Phone Number</span>
								<p className="mb-0">+92-323-2232309</p>
							</div>
							<div className="mb-3">
								<span className="text-400 fs-5">Email</span>
								<p className="mb-0">mhamzabaig.dev@gmail.com</p>
							</div>
							<div className="mb-3">
								<span className="text-400 fs-5">LinkedIn</span>
								<p className="mb-0">M Hamza Baig</p>
							</div>
							<div className="mb-3">
								<span className="text-400 fs-5">Address</span>
								<p className="mb-0">Johar town, Lahore</p>
							</div>
						</div>
						<div className="contact-list">
							<p className="text-400 fs-5 mb-2 text-linear-4">Social</p>
							<div className="d-md-flex d-none gap-3">
								<Link className="offcanvas-social-link" href="https://www.facebook.com/share/18Xzu7kxNX/">
									<i className="ri-facebook-circle-fill fs-18" />
								</Link>
								<Link className="offcanvas-social-link" href="https://twitter.com">
									<i className="ri-twitter-x-fill fs-18" />
								</Link>
								<Link className="offcanvas-social-link" href="https://www.linkedin.com/in/muhammad-hamza-baig-987080318">
									<i className="ri-linkedin-fill fs-18" />
								</Link>
								<Link className="offcanvas-social-link" href="https://github.com/hafizhamza-123">
									<i className="ri-github-fill fs-18" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			<div className={`offCanvas__overly ${isOffCanvas ? 'active' : ''}`}  onClick={handleOffCanvas}/>
		</>
	)
}
