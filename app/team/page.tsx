import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { people } from "@/lib/site-content";
import { PageIntro, CtaBand } from "@/components/site-ui";
export const metadata: Metadata = { title: "Our team | RMD Gajanand" };
export default function TeamPage() {
  return <main id="main-content"><PageIntro label="Our team" title="Good work starts" accent="with good people." description="Meet the people behind RMD Gajanand. A team connected by the work we do and the spaces we help create."/><section className="section section-after-intro"><div className="people-grid">{people.map((person,index)=><article className="person-card" key={person.name} data-reveal><div className={"person-portrait "+person.color}><span className="person-index">0{index+1} / THE PEOPLE</span><span className="person-initials">{person.initials}</span><div className="portrait-lines" aria-hidden="true"/></div><p className="eyebrow">{person.role}</p><h2>{person.name}</h2><p>{person.note}</p></article>)}</div><div className="join-team" data-reveal><div><p className="eyebrow">ROOM FOR GOOD PEOPLE</p><h2>Put your skills<br/><em>to work with us.</em></h2></div><Link href="/careers" className="button button-outline">Explore careers <ArrowUpRight size={18}/></Link></div></section><CtaBand/></main>;
}
