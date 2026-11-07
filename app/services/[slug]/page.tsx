import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, Droplets, House } from "lucide-react";
import { services } from "@/lib/site-content";
import { PageIntro, CheckList, Steps, CtaBand } from "@/components/shared/site-ui";
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = services.find(item => item.slug === slug);
  return { title: service ? service.name+" | RMD Gajanand" : "Solution not found" };
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = services.find(item => item.slug === slug); if (!service) notFound();
  return <main id="main-content"><PageIntro label={service.name} title={service.short} description={service.description}/><section className="section section-after-intro service-detail"><div className="detail-visual">{service.image ? <img src={service.image} alt={service.name}/> : <div className="large-drawing">{slug==="washrooms" ? <Droplets size={130} strokeWidth={1}/> : <House size={150} strokeWidth={1}/>}<span className="mono">PLANNED AROUND YOUR REQUIREMENTS</span></div>}</div><div data-reveal><p className="eyebrow">{service.label}</p><h2>A practical solution.<br/><em>A personal approach.</em></h2><p>{service.detail}</p><CheckList items={service.points}/><Link href="/book-demo" className="button">Discuss this solution <ArrowUpRight size={18}/></Link><Link href="/services" className="back-link"><ArrowLeft size={15}/>All solutions</Link></div></section><section className="section soft-section"><p className="eyebrow">WHAT HAPPENS NEXT</p><Steps/></section><CtaBand/></main>;
}
