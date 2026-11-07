"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Info } from "lucide-react";

export default function EnquiryForm({ application = false }: { application?: boolean }) {
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const draftKey = application ? "rmd-application-draft" : "rmd-demo-draft";
  function restoreDraft() {
    try {
      const raw = localStorage.getItem(draftKey);
      if (!raw) { setMessage("There is no saved draft on this device yet."); return; }
      const draft: unknown = JSON.parse(raw);
      if (!draft || typeof draft !== "object" || Array.isArray(draft)) throw new Error("Invalid draft");
      for (const [name, value] of Object.entries(draft)) {
        const field = formRef.current?.elements.namedItem(name);
        if (typeof value === "string" && (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) field.value = value;
      }
      setSaved(true);
      setMessage("Your saved draft has been restored. It has not been sent.");
    } catch { setMessage("This draft could not be restored. Please enter your details again."); }
  }
  function clearDraft() {
    try {
      localStorage.removeItem(draftKey);
      formRef.current?.reset();
      setSaved(false);
      setMessage("The draft and form details have been cleared from this device.");
    } catch { setMessage("Your browser could not clear the saved draft. You can remove it in browser site settings."); }
  }
  function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      localStorage.setItem(draftKey, JSON.stringify(fields));
      setSaved(true);
      setMessage("Draft saved on this device. It has not been sent to the RMD Gajanand team.");
    } catch {
      setSaved(false);
      setMessage("Your browser could not save this draft. Your details have not been sent.");
    }
  }
  return <form ref={formRef} className="enquiry-form" onSubmit={saveDraft}>
    <div className="form-heading"><span className="mono">{application ? "YOUR APPLICATION" : "YOUR PROJECT DETAILS"}</span><span className="form-tag">Preview</span></div>
    <div className="field-row"><label>Your name<input name="name" required autoComplete="name" placeholder="Full name"/></label><label>Email address<input name="email" type="email" required autoComplete="email" placeholder="you@example.com"/></label></div>
    <label>{application ? "Area of interest" : "I’m interested in"}<select name="topic" defaultValue="" required><option value="" disabled>Select an option</option>{(application ? ["Site installation", "Construction work", "Site management", "Other"] : ["Boundary walls", "Washroom / bathroom", "Room / small home", "Something else"]).map(topic => <option key={topic}>{topic}</option>)}</select></label>
    {!application && <label>Site location <span>(optional)</span><input name="location" placeholder="Village, town or city"/></label>}
    <label>{application ? "Tell us about your experience" : "A little about your project"} <span>(optional)</span><textarea name="message" rows={4} placeholder={application ? "Your skills, experience and availability…" : "Site size, preferred finish or any questions…"}/></label>
    <p className="form-info"><Info size={16}/>Online submissions are being connected. You can save a draft on this device for now.</p>
    <button type="submit" className="button button-full">{saved ? "Update draft" : "Save "+(application ? "application" : "enquiry")+" draft"}<ArrowUpRight size={18}/></button>
    <div className="draft-actions"><button type="button" onClick={restoreDraft}>Restore saved draft</button><button type="button" onClick={clearDraft}>Clear draft</button></div>
    {message && <p role="status" className="form-status">{saved && <CheckCircle2 size={18}/>} {message}</p>}
  </form>;
}
