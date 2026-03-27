'use client'

import ThemeSwitch from '@/components/elements/ThemeSwitch'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import OffCanvas from '../OffCanvas'
import MobileMenu from '../MobileMenu'

const navItems = [
	{ id: 'about', label: 'About me' },
	{ id: 'resume', label: 'Resume' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'services', label: 'Services' },
	{ id: 'contact', label: 'Contact' },
]

export default function Header2({ isMobileMenu, handleMobileMenu,isOffCanvas, handleOffCanvas }:any) {

	const [activeSection, setActiveSection] = useState<string>('about')

	useEffect(() => {
		const sectionIds = navItems.map((item) => item.id)

		const setActiveFromHash = () => {
			if (window.innerWidth < 992) return
			const hashId = window.location.hash.replace('#', '')
			if (sectionIds.includes(hashId)) {
				setActiveSection(hashId)
			}
		}

		const setActiveFromScroll = () => {
			if (window.innerWidth < 992) return
			if (window.scrollY <= 20) {
				setActiveSection('about')
				return
			}

			const scrollMarker = window.scrollY + 140
			let nextActive = 'about'

			for (const id of sectionIds) {
				const section = document.getElementById(id)
				if (!section) continue
				if (scrollMarker >= section.offsetTop) {
					nextActive = id
				}
			}

			setActiveSection(nextActive)
		}

		setActiveFromHash()
		setActiveFromScroll()

		window.addEventListener('hashchange', setActiveFromHash)
		window.addEventListener('scroll', setActiveFromScroll, { passive: true })
		window.addEventListener('resize', setActiveFromScroll)

		return () => {
			window.removeEventListener('hashchange', setActiveFromHash)
			window.removeEventListener('scroll', setActiveFromScroll)
			window.removeEventListener('resize', setActiveFromScroll)
		}
	}, [])

    return (
        <>
            <header>
				<div className="container position-relative">
					<div className="position-relative">
						<nav className="navbar navbar-expand-lg navbar-home-2 flex-nowrap z-999 p-0 border border-1 rounded-3">
							<a className="navbar-menu p-4 text-center square-100 menu-tigger icon_80 icon-shape d-none d-md-flex" data-bs-target=".offCanvas__info" aria-controls="offCanvas__info" onClick={handleOffCanvas}>
								<i className="ri-menu-2-line" />
							</a>
							<div className="container py-3 px-4">
								<Link className="navbar-brand d-flex main-logo align-items-center" href="/">
									<img src="assets/imgs/home-page-2/template/favicon.svg" alt="zelio" />
									<span className="fs-4 ms-2">Hamza.dev</span>
								</Link>
								<div className="d-none d-lg-flex">
									<div className="collapse navbar-collapse" id="navbarSupportedContent">
										<ul className="navbar-nav me-auto mb-2 mb-lg-0">
											{navItems.map((item) => (
												<li className="nav-item" key={item.id}>
													<Link
														className={activeSection === item.id ? 'nav-link active' : 'nav-link'}
														href={`#${item.id}`}
														onClick={() => setActiveSection(item.id)}
													>
														{item.label}
													</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
								<div className="navbar-social d-flex align-items-center pe-5 pe-lg-0 me-5 me-lg-0">
									<div className="d-md-flex d-none gap-3">
										<Link href="https://www.facebook.com/share/18Xzu7kxNX/">
											<i className="ri-facebook-circle-fill fs-18" />
										</Link>
										<Link href="https://twitter.com">
											<i className="ri-twitter-x-fill fs-18" />
										</Link>
										<Link href="https://www.linkedin.com/in/muhammad-hamza-baig-987080318">
											<i className="ri-linkedin-fill fs-18" />
										</Link>
										<Link href="https://github.com/hafizhamza-123">
											<i className="ri-github-fill fs-18" />
										</Link>
									</div>
									<ThemeSwitch className="mobile-theme-switch d-lg-none" />
									<div className="burger-icon burger-icon-white border rounded-3" onClick={handleMobileMenu}>
										<span className="burger-icon-top" />
										<span className="burger-icon-mid" />
										<span className="burger-icon-bottom" />
									</div>
								</div>
							</div>
							<ThemeSwitch className="desktop-theme-switch d-none d-lg-flex p-4 text-center icon_80 icon-shape" />
						</nav>
					</div>
					{/* offCanvas-menu */}
					<OffCanvas isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} />
					<MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
				</div>
			</header>
        </>
    )
}
