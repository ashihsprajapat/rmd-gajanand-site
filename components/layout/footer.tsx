import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./navbar";

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-top"><div><Logo/><p>Concrete solutions.<br/>A personal commitment.</p></div><div><p className="footer-label">EXPLORE</p><Link href="/services">Our solutions</Link><Link href="/projects">Our work</Link><Link href="/success-stories">Success stories</Link></div><div><p className="footer-label">THE COMPANY</p><Link href="/about">About us</Link><Link href="/team">Our team</Link><Link href="/careers">Careers</Link></div><div><p className="footer-label">LET’S TALK</p><Link href="/book-demo">Book a demo <ArrowUpRight size={14}/></Link><Link href="/orders">Track your work</Link><Link href="/login">Member account</Link></div></div>
    <div className="footer-bottom"><span>© 2026 RMD Gajanand. Built to stand.</span><div><Link href="/terms">Terms of use</Link><Link href="/privacy">Privacy policy</Link></div><span className="footer-signature">MADE WITH CARE. BUILT FOR LIFE.</span></div>
  </footer>;
}
