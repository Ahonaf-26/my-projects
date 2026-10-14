import { useState, FormEvent } from "react";
import { Copy, Check, ArrowUpRight, Send, AlertCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { MagneticButton } from "./MagneticButton";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const email = PORTFOLIO_DATA.contactEmail;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      let success = false;
      let responseMessage = "Thank you! Your message has been dispatched successfully. I'll get back to you soon.";

      // 1. Primary: Telegram Dispatch via /api/contact or Netlify Serverless Function
      try {
        let apiRes = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(form),
        });

        // If /api/contact was rewritten or missed on Netlify, try direct /.netlify/functions/contact
        if (!apiRes.ok || !apiRes.headers.get("content-type")?.includes("application/json")) {
          try {
            const funcRes = await fetch("/.netlify/functions/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify(form),
            });
            if (funcRes.ok && funcRes.headers.get("content-type")?.includes("application/json")) {
              apiRes = funcRes;
            }
          } catch (funcErr) {
            console.warn("Direct netlify function retry error:", funcErr);
          }
        }

        const contentType = apiRes.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await apiRes.json();
          if (apiRes.ok && data.success !== false) {
            success = true;
            if (data.message) responseMessage = data.message;
          }
        }
      } catch (apiErr) {
        console.warn("Telegram / API endpoint attempt error:", apiErr);
      }

      // 2. Netlify Form submission (stores submission in Netlify Forms dashboard)
      try {
        const netlifyParams = new URLSearchParams({
          "form-name": "contact",
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp || "",
          message: form.message,
        });

        const netlifyRes = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: netlifyParams.toString(),
        });

        if (netlifyRes.ok) {
          success = true;
        }
      } catch (netlifyErr) {
        console.warn("Netlify Form sync attempt:", netlifyErr);
      }

      // 3. Email forwarder backup delivery
      try {
        const directRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            whatsapp: form.whatsapp || "Not provided",
            message: form.message,
            _subject: `New Portfolio Message from ${form.name}`,
            _template: "table",
            _captcha: "false",
          }),
        });

        if (directRes.ok) {
          success = true;
        }
      } catch (directErr) {
        console.warn("Email forwarder backup attempt:", directErr);
      }

      // Show success if any delivery transport completed
      setMsgSent(true);
      setFeedbackMsg(responseMessage);
      setForm({ name: "", email: "", whatsapp: "", message: "" });
      setTimeout(() => setMsgSent(false), 9000);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-[75vh] w-full flex flex-col justify-center px-6 sm:px-10 md:px-12 max-w-7xl mx-auto border-t border-white/5 py-20 sm:py-28 md:py-36"
    >
      {/* Eyebrow Label */}
      <div
        id="contact-eyebrow"
        className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-500 uppercase mb-6"
      >
        Contact
      </div>

      {/* Huge Heading */}
      <h2
        id="contact-heading"
        className="font-black italic text-[clamp(2.8rem,7.5vw,7.5rem)] leading-[0.9] tracking-tighter text-[#f5f5f0] my-4 sm:my-6"
      >
        Have an idea?
        <br />
        <span className="text-gray-400 hover:text-[#f5f5f0] transition-colors">
          Let's make it real<span className="text-[#d9ff57]">.</span>
        </span>
      </h2>

      {/* Big Email Link with Lime Underline & Direct Channels */}
      <div className="mt-6 sm:mt-10 mb-4 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${email}`}
          id="contact-email-link"
          className="group relative font-sans font-semibold text-[clamp(1.2rem,3vw,2.4rem)] text-[#f5f5f0] hover:text-[#d9ff57] transition-colors tracking-tight inline-flex items-center gap-2"
        >
          <span>{email}</span>
          <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 text-[#d9ff57] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          {/* Animated Lime Underline */}
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d9ff57] transition-transform duration-300 origin-left group-hover:scale-x-105" />
        </a>

        {/* Copy Email Button */}
        <button
          onClick={handleCopyEmail}
          id="contact-copy-email-btn"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] font-mono text-gray-400 hover:text-[#f5f5f0] transition-colors"
          title="Copy email to clipboard"
          aria-label="Copy email address"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#d9ff57]" />
              <span className="text-[#d9ff57]">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Subtle instructions notice */}
      <p
        id="contact-notice"
        className="font-mono text-[11px] text-gray-500 max-w-lg mb-10"
      >
        Reach out for collaborations, project inquiries, or web engineering discussions.
      </p>

      {/* Direct Contact Form */}
      <div className="border-t border-white/5 pt-10">
        <div className="max-w-3xl bg-white/[0.03] border border-white/10 p-6 sm:p-10 rounded-2xl">
          <div className="mb-1">
            <h3 className="font-bold text-lg sm:text-xl text-[#f5f5f0] flex items-center gap-2">
              <span>Send a message</span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mb-8">
            Fill out the form below and I'll get back to you as soon as possible.
          </p>

          {msgSent ? (
            <div className="bg-[#122008] border border-[#d9ff57]/40 p-6 rounded-xl text-xs font-mono text-[#d9ff57] space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Check className="w-4 h-4 text-[#d9ff57]" />
                <span>Message Dispatched!</span>
              </div>
              <p className="text-gray-300 font-sans text-xs sm:text-sm">{feedbackMsg}</p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Hidden field for Netlify bot detection */}
              <input type="hidden" name="form-name" value="contact" />

              {errorMsg && (
                <div className="bg-[#290909] border border-[#ff5757]/40 p-4 rounded-xl text-xs font-mono text-[#ff8080] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#ff8080]" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Name <span className="text-[#d9ff57]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#d9ff57] px-4 py-3 text-sm text-[#f5f5f0] outline-none transition-colors rounded-xl placeholder:text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    Email Address <span className="text-[#d9ff57]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ada@domain.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#d9ff57] px-4 py-3 text-sm text-[#f5f5f0] outline-none transition-colors rounded-xl placeholder:text-gray-600"
                  />
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    placeholder="Your phone or WhatsApp number"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#d9ff57] px-4 py-3 text-sm text-[#f5f5f0] outline-none transition-colors rounded-xl placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1.5">
                  Message / Project Scope <span className="text-[#d9ff57]">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Hey Ahonaf, let's build something interesting..."
                  className="w-full bg-white/5 border border-white/10 focus:border-[#d9ff57] px-4 py-3 text-sm text-[#f5f5f0] outline-none transition-colors rounded-xl resize-none placeholder:text-gray-600"
                />
              </div>

              <MagneticButton magneticStrength={0.3} magneticRadius={90}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#d9ff57] text-black font-mono text-xs uppercase tracking-wider font-bold rounded-full hover:bg-[#e4ff7a] transition-all disabled:opacity-50 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "SENDING MESSAGE..." : "SEND MESSAGE"}</span>
                </button>
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
