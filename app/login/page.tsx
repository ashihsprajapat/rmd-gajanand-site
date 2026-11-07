import type { Metadata } from "next";
import { BoundaryAnimation } from "@/components/shared/site-ui";
import AuthForm from "@/components/pages/auth/auth-form";
export const metadata: Metadata = { title: "Member login | RMD Gajanand" };
export default function LoginPage() {
  return <main id="main-content" className="auth-page"><div className="auth-art"><p className="eyebrow">EVERY STEP. IN VIEW.</p><h2>Your construction<br/>journey, <em>connected.</em></h2><BoundaryAnimation/><p>One place for your order, installation progress and payment updates.</p></div><AuthForm/></main>;
}
