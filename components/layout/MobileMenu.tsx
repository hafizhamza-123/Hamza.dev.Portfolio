'use client'
import Link from 'next/link'
import type { MouseEvent } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	const closeMobileMenu = () => {
		if (isMobileMenu) handleMobileMenu()
	}

	const handleNavItemClick = (sectionId: string) => (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		closeMobileMenu()

		const section = document.getElementById(sectionId)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth', block: 'start' })
			window.history.replaceState(null, '', `#${sectionId}`)
			return
		}

		window.location.href = `/#${sectionId}`
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
											<Link className="nav-link" href="#about" onClick={handleNavItemClick('about')}>About me</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="#resume" onClick={handleNavItemClick('resume')}>Resume</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="#projects" onClick={handleNavItemClick('projects')}>Projects</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="#services" onClick={handleNavItemClick('services')}>Services</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" href="#contact" onClick={handleNavItemClick('contact')}>Contact</Link>
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
