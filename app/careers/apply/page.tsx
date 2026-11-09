import type { Metadata } from "next";
import { CheckList, PageIntro } from "@/components/shared/site-ui";
import EnquiryForm from "@/components/pages/contact/enquiry-form";
import { styles } from "./styles";
export const metadata: Metadata = { title: "Apply for work | RMD Gajanand" };
export default function ApplyPage() {
  return <main id="main-content" className={styles.main}><PageIntro label="Apply for work" title="Your next chapter" accent="starts here." description="Help us get to know your experience and the work you would like to do."/><section className="section section-after-intro form-page"><aside><p className="eyebrow">COME PREPARED</p><h2>Tell us what<br/><em>you do best.</em></h2><CheckList items={["Your area of experience", "The work you are interested in", "Your availability and location"]}/><p className="muted">Applications are currently available as drafts. Saving a draft does not submit an application or confirm a vacancy.</p></aside><EnquiryForm application/></section></main>;
}
