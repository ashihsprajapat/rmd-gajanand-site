import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/site-content";
import { PageIntro, CtaBand } from "@/components/shared/site-ui";
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const project = projects.find(item => item.slug === slug);
  return { title: project ? project.subtitle+" | RMD Gajanand" : "Work not found" };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = projects.find(item => item.slug === slug); if (!project) notFound();
  return <main id="main-content"><PageIntro label="Work reference" title={project.title} description={project.subtitle}/><section className="section section-after-intro"><div className="project-detail-image"><img src={project.image} alt={project.subtitle}/><span className="project-category">{project.category} finish</span></div><div className="project-detail-copy" data-reveal><div><p className="eyebrow">A CLOSER LOOK</p><h2>Find the finish<br/>that feels <em>right.</em></h2></div><div><p>{project.description}</p><p className="muted">This image is a construction reference supplied by our team. The final design and scope for your property will be discussed separately.</p><Link className="button" href="/book-demo">Ask about a similar finish <ArrowUpRight size={18}/></Link></div></div><Link href="/projects" className="back-link"><ArrowLeft size={15}/>Back to all work</Link></section><CtaBand/></main>;
}
