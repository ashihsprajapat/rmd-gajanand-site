import type { Metadata } from "next";
import { PageIntro, ServiceCards, CtaBand, CheckList } from "@/components/shared/site-ui";
export const metadata: Metadata = { title: "Our solutions | RMD Gajanand" };
export default function ServicesPage() {
  return <main id="main-content"><PageIntro label="Our solutions" title="Built for real life." accent="Made for your land." description="Explore our construction work, from a dependable boundary to a practical room. Every project starts with understanding what you need."/><section className="section section-after-intro"><ServiceCards/></section><section className="section soft-section two-columns" data-reveal><div><p className="eyebrow">THE DETAILS MATTER</p><h2>A clear scope.<br/><em>A shared understanding.</em></h2></div><div><p className="body-lead">Before construction, we discuss the decisions that shape your project.</p><CheckList items={["Your site and the space available", "Layout, preferred finish and materials", "Quantities, price and installation scope", "How progress and payments will be tracked"]}/></div></section><CtaBand/></main>;
}
