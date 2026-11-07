import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <main id="main-content" className="not-found"><span className="eyebrow">404 / A LITTLE OFF SITE</span><h1>This space is<br/><em>still unbuilt.</em></h1><p>We could not find that page. Let’s get you back to familiar ground.</p><Link href="/" className="button"><ArrowLeft size={17}/>Back to home</Link></main>; }
