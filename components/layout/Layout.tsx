
'use client'
import { useEffect, useState } from "react"
import AddClassBody from '../elements/AddClassBody'
import BackToTop from '../elements/BackToTop'
import DataBg from '../elements/DataBg'
import ImageHoverEffects from '../elements/ImageHoverEffects'
import Breadcrumb from './Breadcrumb'
import Footer2 from './footer/Footer2'
import Header2 from './header/Header2'

interface LayoutProps {
	children?: React.ReactNode
	breadcrumbTitle?: string
}


export default function Layout({ breadcrumbTitle, children }: LayoutProps) {
	const [isMobileMenu, setMobileMenu] = useState<boolean>(false)
	const handleMobileMenu = (): void => {
		setMobileMenu(!isMobileMenu)
		!isMobileMenu ? document.body.classList.add("mobile-menu-active") : document.body.classList.remove("mobile-menu-active")
	}

	const [isOffCanvas, setOffCanvas] = useState<boolean>(false)
	const handleOffCanvas = (): void => setOffCanvas(!isOffCanvas)

	useEffect(() => {
		const WOW: any = require('wowjs');
		(window as any).wow = new WOW.WOW({
			live: false
		});

		// Initialize WOW.js
		(window as any).wow.init()
	}, [])
	return (
		<>
			<div id="top" />
			<AddClassBody />
			<DataBg />
			<ImageHoverEffects />
			<Header2 isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} isOffCanvas={isOffCanvas} handleOffCanvas={handleOffCanvas} />

			<main className="main">
				{breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}

				{children}
			</main>

			<Footer2 />

			<BackToTop target="#top" />
		</>
	)
}
