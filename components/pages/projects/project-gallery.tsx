"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/site-content";
export default function ProjectGallery() {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter(project => filter === "All work" || project.category === filter);
  return <><div className="gallery-toolbar"><div className="filter-tabs" aria-label="Filter boundary references">{["All work", "Textured", "Plain", "Decorative"].map(item => <button onClick={() => setFilter(item)} key={item} aria-pressed={filter===item} className={filter===item ? "selected" : ""}>{item}</button>)}</div><span className="mono">{visible.length} REFERENCES</span></div><div className="project-grid" key={filter}>{visible.map((project, index) => <Link href={"/projects/"+project.slug} className="project-card" key={project.slug} style={{animationDelay: index*70+"ms"}}><div className="project-image"><img src={project.image} alt={project.subtitle}/><span className="project-category">{project.category}</span><span className="card-arrow"><ArrowUpRight size={20}/></span></div><div className="project-caption"><div><p className="eyebrow">BOUNDARY WALLS</p><h3>{project.title}</h3><p>{project.subtitle}</p></div><span className="mono">0{projects.indexOf(project)+1}</span></div></Link>)}</div></>;
}
