'use client'
import Link from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	const closeMobileMenu = () => {
		if (isMobileMenu) handleMobileMenu()
	}

	return (
		<>
			<div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${isMobileMenu ? 'sidebar-visible' : ''}`}>
				<div className="mobile-header-wrapper-inner">
					<div className="mobile-header-logo">
						<Link className="d-flex main-logo align-items-center d-inline-flex" href="/" onClick={closeMobileMenu}>
							<img src="/assets/imgs/home-page-2/template/favicon.svg" alt="infinia" />
							<span className="fs-4 ms-2 text-dark">Hamza.dev</span>
						</Link>
						<div className={`burger-icon burger-icon-white border rounded-3 ${isMobileMenu ? 'burger-close' : ''}`} onClick={handleMobileMenu}>
							<span className="burger-icon-top" />
							<span className="burger-icon-mid" />
							<span className="burger-icon-bottom" />
						</div>
					</div>
					<div className="mobile-header-content-area">
						<PerfectScrollbar className="perfect-scroll">
							<div className="mobile-menu-wrap mobile-header-border">
								<nav>
									<ul className="mobile-menu font-heading ps-0">
										<li className="nav-item">
											<Link className="nav-link" href="/#about" onClick={closeMobileMenu}>About me</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="/#resume" onClick={closeMobileMenu}>Resume</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="/#projects" onClick={closeMobileMenu}>Projects</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="/#services" onClick={closeMobileMenu}>Services</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="/#contact" onClick={closeMobileMenu}>Contact</Link>
										</li>
									</ul>
								</nav>
							</div>
						</PerfectScrollbar>
					</div>
				</div>
			</div>
		</>
	)
}
