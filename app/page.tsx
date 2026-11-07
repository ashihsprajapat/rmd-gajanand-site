import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Layers3 } from "lucide-react";
import { BoundaryAnimation, CtaBand, ServiceCards, Steps } from "@/components/shared/site-ui";

export default function Home() {
  return <main id="main-content">
    <section className="home-hero">
      <div className="hero-copy"><p className="eyebrow"><span/>PRECAST CONCRETE. PERSONAL COMMITMENT.</p><h1>Good boundaries.<br/>Better <em>beginnings.</em></h1><p className="hero-description">From the edge of your land to the room you call your own. We build boundary walls and everyday spaces with care.</p><div className="hero-actions"><Link href="/book-demo" className="button">Let’s discuss your project <ArrowUpRight size={18}/></Link><Link href="/projects" className="text-link">Explore our work <ArrowRight size={16}/></Link></div><div className="hero-assurance"><span><Check size={14}/>Made for your site</span><span><Check size={14}/>Clear, practical construction</span></div></div>
      <div className="hero-image"><img src="/images/boundary-modern.webp" alt="Decorative precast concrete boundary around a residential property" fetchPriority="high"/><div className="hero-image-shade"/><div className="hero-image-label"><span className="status-dot"/>OUR WORK, OUT IN THE WORLD</div><div className="hero-image-caption"><span>Strong by design.<br/><em>Considered in every detail.</em></span><Link href="/projects/residential-boundary" aria-label="Explore residential boundary reference"><ArrowUpRight size={25}/></Link></div><span className="vertical-caption">RMD GAJANAND / CONSTRUCTION</span></div>
    </section>
    <div className="specialties-strip"><span>BUILT AROUND YOUR NEEDS</span><p><Layers3 size={16}/>Precast boundary walls</p><span className="strip-plus">+</span><p>Washrooms & bathrooms</p><span className="strip-plus">+</span><p>Rooms & small homes</p></div>
    <section className="section"><div className="section-heading" data-reveal><div><p className="eyebrow">WHAT WE BUILD</p><h2>Practical spaces.<br/><em>Lasting possibilities.</em></h2></div><div><p>Different needs. The same attention to getting the fundamentals right.</p><Link href="/services" className="text-link">Discover our solutions <ArrowRight size={16}/></Link></div></div><ServiceCards/></section>
    <section className="home-about section" data-reveal><BoundaryAnimation/><div className="home-about-copy"><p className="eyebrow">THE WAY WE BUILD</p><h2>One panel.<br/>One promise.<br/><em>At a time.</em></h2><p>RMD Gajanand is a construction company with a simple purpose: create useful, dependable spaces for the people who need them.</p><p>We work on boundary walls, washrooms, compact homes and rooms—starting with your land and your requirements.</p><Link href="/about" className="text-link">Get to know us <ArrowRight size={16}/></Link></div></section>
    <section className="section process-section"><div className="section-heading" data-reveal><div><p className="eyebrow">A CLEAR PATH FORWARD</p><h2>From your first idea<br/>to the <em>finishing touch.</em></h2></div><Link href="/orders" className="text-link">Your project journey <ArrowRight size={16}/></Link></div><Steps/></section>
    <CtaBand/>
  </main>;
}
