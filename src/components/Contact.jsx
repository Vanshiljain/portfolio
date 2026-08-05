import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { SectionLabel } from "./About";
import Glow from "./Glow";
import { profile } from "../data/resume";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative bg-ink-950 px-6 py-28 md:px-10 md:py-36">
      <Glow variant="reverse" />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel num="06" label="Contact" />

        <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-12">
          <Reveal direction="right" className="md:col-span-5">
            <h2 className="font-display text-4xl leading-tight text-paper md:text-5xl">
              Let's wire something{" "}
              <span className="text-gradient-signal italic">together</span>.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-paper-dim">
              Open to backend, full-stack, and AI-systems roles — or a conversation
              about agent pipelines. Reach out directly, or use the form.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <ContactLink label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <ContactLink label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s+/g, "")}`} />
              <ContactLink label="LinkedIn" value={profile.linkedin} href={profile.linkedinUrl} external />
              <ContactLink label="Location" value={profile.location} />
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.15} className="md:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="conic-border flex flex-col gap-6 rounded-3xl bg-ink-800/40 p-8 backdrop-blur-sm md:p-10"
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

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-hover mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-ink-950 transition-colors hover:bg-amber-300"
              >
                {sent ? "Opening your mail client…" : "Send message"}
                <span>→</span>
              </motion.button>
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
      <span className="font-mono text-[11px] uppercase tracking-widest text-paper-dim/70 transition-colors group-focus-within:text-amber-300">
        {label}
      </span>
      <Component
        name={name}
        type={as === "input" ? type : undefined}
        className="w-full resize-none border-b border-cobalt-500/25 bg-transparent py-2 text-paper outline-none transition-colors placeholder:text-paper-dim/40 focus:border-amber-400"
        {...props}
      />
    </label>
  );
}

function ContactLink({ label, value, href, external }) {
  const content = (
    <>
      <span className="font-mono text-[11px] uppercase tracking-widest text-cobalt-300">
        {label}
      </span>
      <span className="text-paper transition-colors group-hover:text-amber-300">{value}</span>
    </>
  );

  if (!href) {
    return <div className="flex flex-col gap-1">{content}</div>;
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="cursor-hover group flex flex-col gap-1"
    >
      {content}
    </a>
  );
}
