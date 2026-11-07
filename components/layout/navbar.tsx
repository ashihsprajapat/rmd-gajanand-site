"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function Logo() {
  return <Link className="brand" href="/" aria-label="RMD Gajanand home">
    <svg className="brand-symbol" viewBox="0 0 44 44" fill="none" aria-hidden="true"><rect width="44" height="44" rx="10" fill="currentColor"/><path d="M10 31V17l12-7 12 7v14M17 31V21h10v10M10 26h7m10 0h7M10 21h7m10 0h7" stroke="#f7f5ed" strokeWidth="2.2" strokeLinejoin="round"/><path d="M8 33h28" stroke="#ed8b5f" strokeWidth="2.2"/></svg>
    <span>RMD <b>Gajanand</b><small>BUILT TO STAND.</small></span>
  </Link>;
}

const navigation = [
  ["/services", "Our solutions"], ["/projects", "Our work"],
  ["/success-stories", "Success stories"], ["/about", "About us"],
];

export default function Navbar() {
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const menuOpen = openForPath === pathname;

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="topline"><span>Strong boundaries. Thoughtful spaces.</span><Link href="/careers">Build your career with us <ArrowUpRight size={12}/></Link></div>
    <header className="site-header">
      <Logo/>
      <nav id="site-navigation" className={menuOpen ? "site-nav open" : "site-nav"} aria-label="Main navigation">
        {navigation.map(([href, label]) => <Link key={href} href={href} className={pathname.startsWith(href) ? "active" : ""} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>)}
        <Link className="mobile-only" href="/team">Our team</Link>
        <Link className="mobile-only" href="/orders">Track your work</Link>
      </nav>
      <div className="header-actions"><Link className="login-link" href="/login">Member login <ArrowUpRight size={14}/></Link><Link href="/book-demo" className="button button-small">Book a demo <ArrowUpRight size={15}/></Link></div>
      <button className="menu-toggle" onClick={() => setOpenForPath(menuOpen ? null : pathname)} aria-expanded={menuOpen} aria-controls="site-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
  </>;
}
