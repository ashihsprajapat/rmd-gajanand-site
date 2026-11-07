import type { Metadata } from "next";
import { PageIntro, CtaBand } from "@/components/shared/site-ui";
import ProjectGallery from "@/components/pages/projects/project-gallery";
import { styles } from "./styles";
export const metadata: Metadata = { title: "Our work | RMD Gajanand" };
export default function ProjectsPage() {
  return <main id="main-content" className={styles.main}><PageIntro label="Our work" title="See the details." accent="Picture the possibilities." description="Explore the boundary-wall references shared by our team. From simple panels to textured finishes, find a starting point for your own site."/><section className="section section-after-intro"><ProjectGallery/><p className="gallery-note">Reference gallery · project dates, locations and client details have not been published.</p></section><CtaBand/></main>;
}
