"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function AuthForm({ signup = false }: { signup?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(`/api/auth/${signup ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), email: form.get("email"), password: form.get("password") }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) {
        setMessage(result.error ?? "Something went wrong. Please try again.");
        return;
      }
      router.push("/orders");
      router.refresh();
    } catch {
      setMessage("Unable to connect. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }
  return <div className="auth-form">
    <p className="eyebrow">YOUR RMD ACCOUNT</p>
    <h1>{signup ? "A place for" : "Welcome"}<br/><em>{signup ? "your project." : "back."}</em></h1>
    <p>{signup ? "Create an account to keep your construction journey in view." : "Sign in to follow your project, materials and payments."}</p>
    <button type="button" className="google-button" onClick={() => setMessage("Google sign-in is being connected. Please check back when account services launch.")}><span className="google-letter" aria-hidden="true">G</span>Continue with Google</button>
    <div className="form-divider"><span>or use your email</span></div>
    <form onSubmit={submit}>
      {signup && <label>Full name<input required name="name" autoComplete="name" placeholder="Your name"/></label>}
      <label>Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com"/></label>
      <label>Password<div className="password-field"><input required name="password" type={visible ? "text" : "password"} autoComplete={signup ? "new-password" : "current-password"} minLength={8} placeholder="At least 8 characters"/><button type="button" aria-label={visible ? "Hide password" : "Show password"} onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></label>
      <button className="button button-full" type="submit" disabled={submitting}>{submitting ? "Please wait…" : signup ? "Create account" : "Sign in"}<ArrowRight size={18}/></button>
    </form>
    {message && <p role="status" className="form-status">{message}</p>}
    <p className="auth-switch">{signup ? "Already have an account?" : "New to RMD Gajanand?"} <Link href={signup ? "/login" : "/signup"}>{signup ? "Sign in" : "Create an account"} <ArrowRight size={13}/></Link></p>
    <p className="auth-note"><LockKeyhole size={13}/>Your password is securely hashed and your session is protected.</p>
  </div>;
}
