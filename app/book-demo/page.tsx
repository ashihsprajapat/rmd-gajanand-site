import type { Metadata } from "next";
import { CheckList, PageIntro } from "@/components/shared/site-ui";
import EnquiryForm from "@/components/pages/contact/enquiry-form";
import { Layers3, ArrowRight } from "lucide-react";
import { styles } from "./styles";
export const metadata: Metadata = { title: "Book a demo | RMD Gajanand" };
export default function BookDemoPage() {
  return <main id="main-content" className={styles.main}><PageIntro label="Book a demo" title="Your site." accent="Let’s see what’s possible." description="A good project starts with a conversation. Share your requirement so the team can understand what you have in mind."/><section className="section section-after-intro form-page"><aside><span className="round-icon"><Layers3 size={27}/></span><h2>A little detail.<br/><em>A clearer plan.</em></h2><p>Whether you need a boundary for your land or a practical new space, start with the basics.</p><CheckList items={["Choose the construction work you need", "Share your site location, if you know it", "Add any questions about layout or finish"]}/><div className="next-step"><span className="mono">AFTER YOUR ENQUIRY</span><p>Discuss requirements <ArrowRight size={13}/> Agree on a site demo</p></div></aside><EnquiryForm/></section></main>;
}
