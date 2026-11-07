import type { Metadata } from "next";
import { BoundaryAnimation } from "@/components/site-ui";
import AuthForm from "@/components/auth-form";
export const metadata: Metadata = { title: "Create an account | RMD Gajanand" };
export default function SignupPage() {
  return <main id="main-content" className="auth-page"><div className="auth-art"><p className="eyebrow">A STRONG START</p><h2>Good things<br/>start <em>together.</em></h2><BoundaryAnimation/><p>Keep the details of your project in one place, from the first pole to the final panel.</p></div><AuthForm signup/></main>;
}
