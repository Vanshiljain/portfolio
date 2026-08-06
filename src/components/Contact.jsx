import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal, { ScanReveal } from "./Reveal";
import { SectionLabel } from "./About";
import Button from "./Button";
import Glow from "./Glow";
import { ArrowIcon, MailIcon, PhoneIcon, LinkedInIcon } from "./Icons";
import { profile } from "../data/resume";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setSending(false);
      setSent(true);
    }, 700);
  }

  return (
    <section id="contact" className="relative px-6 py-28 md:px-10 md:py-36">
      <Glow variant="reverse" />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel num="06" label="Contact" />

        <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal direction="right" className="md:col-span-5">
            <ScanReveal className="font-display text-4xl leading-tight text-paper md:text-5xl">
              Let's wire something{" "}
              <span className="text-gradient-signal italic">together</span>.
            </ScanReveal>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-paper-dim">
              Open to backend, full-stack, and AI-systems roles — or a conversation
              about agent pipelines. Reach out directly, or use the form.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <ContactLink icon={<MailIcon />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <ContactLink
                icon={<PhoneIcon />}
                label="Phone"
                value={profile.phone}
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              />
              <ContactLink
                icon={<LinkedInIcon />}
                label="LinkedIn"
                value={profile.linkedin}
                href={profile.linkedinUrl}
                external
              />
              <ContactLink label="Location" value={profile.location} />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.15} className="md:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="conic-border scanlines flex flex-col gap-6 rounded-3xl bg-ink-800/40 p-8 backdrop-blur-sm md:p-10"
            >
              <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Field
                label="Message"
                name="message"
                as="textarea"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />

              <div className="relative mt-2">
                <Button as="button" type="submit" variant="solid" icon={<ArrowIcon />} className="w-full justify-center">
                  {sending ? "Transmitting…" : sent ? "Sent — opening mail client" : "Send message"}
                </Button>

                <div className="pointer-events-none absolute -bottom-2 left-4 right-4 h-px overflow-hidden">
                  <AnimatePresence>
                    {sending && (
                      <motion.span
                        key="pulse"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: "linear" }}
                        className="block h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_10px_2px_rgba(62,233,255,0.8)]"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <p className="text-center font-mono text-[11px] text-paper-dim/60">
                Opens your email client with this message pre-filled.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", as = "input", ...props }) {
  const Component = as;
  return (
    <label className="group flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-widest text-paper-dim/70 transition-colors group-focus-within:text-magenta-300">
        {label}
      </span>
      <Component
        name={name}
        type={as === "input" ? type : undefined}
        className="w-full resize-none border-b border-cyan-500/25 bg-transparent py-2 text-paper outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-paper-dim/40 focus:border-magenta-400 focus:shadow-[0_1px_0_0_rgba(255,47,208,0.4)]"
        {...props}
      />
    </label>
  );
}

function ContactLink({ icon, label, value, href, external }) {
  const content = (
    <>
      {icon && <span className="text-cyan-300 transition-colors group-hover:text-magenta-300">{icon}</span>}
      <span className="flex flex-col gap-1">
        <span className="font-mono text-[11px] uppercase tracking-widest text-cyan-300">{label}</span>
        <span className="text-paper transition-colors group-hover:text-magenta-300">{value}</span>
      </span>
    </>
  );

  if (!href) {
    return <div className="flex items-center gap-3">{content}</div>;
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="cursor-hover group flex items-center gap-3"
    >
      {content}
    </a>
  );
}
