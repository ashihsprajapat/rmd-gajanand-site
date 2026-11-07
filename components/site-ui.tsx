import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Layers3, House, Droplets } from "lucide-react";
import { services } from "@/lib/site-content";

export function PageIntro({ label, title, accent, description }: { label: string; title: string; accent?: string; description: string }) {
  return <section className="page-intro"><div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={12}/><span>{label}</span></div><p className="eyebrow"><span/>{label}</p><h1>{title} {accent && <em>{accent}</em>}</h1><p className="page-description">{description}</p></section>;
}
export function CtaBand() {
  return <section className="cta-band" data-reveal><div><p className="eyebrow">YOUR LAND. YOUR NEXT CHAPTER.</p><h2>Let’s build something <em>lasting.</em></h2></div><Link href="/book-demo" className="button button-cream">Talk about your project <ArrowUpRight size={18}/></Link><div className="cta-rings" aria-hidden="true"/></section>;
}
export function ServiceCards() {
  return <div className="service-grid">{services.map((service, index) => <Link className={"service-card service-" + index} href={"/services/" + service.slug} key={service.slug} data-reveal>
    <div className="service-visual">{service.image ? <img src={service.image} alt="Textured precast concrete boundary wall" loading="lazy"/> : <div className={"service-drawing drawing-" + index}>{index === 1 ? <Droplets size={74} strokeWidth={1}/> : <House size={88} strokeWidth={1}/>}<span>{index === 1 ? "ESSENTIAL SPACES" : "ROOM FOR POSSIBILITY"}</span></div>}<span className="card-number">{service.number} /</span><span className="card-arrow"><ArrowUpRight size={20}/></span></div>
    <div className="service-copy"><p className="eyebrow">{service.label}</p><h3>{service.name}</h3><p>{service.description}</p><span className="card-link">Explore solution <ArrowRight size={15}/></span></div>
  </Link>)}</div>;
}
export function BoundaryAnimation() {
  return <div className="boundary-illustration" aria-label="Animated illustration of precast panels assembling between poles" role="img"><div className="boundary-sun"/><div className="boundary-ground"/><div className="wall-model">{[0,1,2,3].map((bay) => <div className="wall-bay" key={bay} style={{ "--bay": bay } as React.CSSProperties}><span className="wall-pole"/><div className="wall-panels">{[0,1,2,3,4].map((panel) => <span className="wall-panel" key={panel} style={{ "--panel": panel } as React.CSSProperties}/>)}</div></div>)}<span className="wall-end-pole"/></div><span className="illustration-caption"><Layers3 size={15}/> PANEL BY PANEL. BUILT TOGETHER.</span></div>;
}
export function Steps() {
  return <div className="steps">{[
    ["Let’s talk", "Tell us what you need and book a demo."],
    ["Plan the details", "Agree on the layout, quantities and price."],
    ["Bring it to life", "Follow the work as your site takes shape."],
    ["Finish with care", "Review the work and share your feedback."],
  ].map(([title, text], index) => <article key={title} data-reveal><span className="step-number">0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>;
}
export function CheckList({ items }: { items: readonly string[] }) { return <ul className="check-list">{items.map(item => <li key={item}><Check size={17}/>{item}</li>)}</ul>; }
