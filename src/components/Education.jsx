import Reveal from "./Reveal";
import { SectionLabel } from "./About";
import Glow from "./Glow";
import { education } from "../data/resume";

export default function Education() {
  return (
    <section id="education" className="relative bg-ink-900 px-6 py-28 md:px-10 md:py-36">
      <Glow />
      <div className="relative mx-auto max-w-7xl">
        <SectionLabel num="05" label="Education" />

        <Reveal direction="up" delay={0.15} className="mt-10">
          <div className="group flex flex-col gap-8 rounded-3xl border border-cobalt-500/15 bg-ink-800/30 p-8 transition-colors duration-300 hover:border-amber-400/25 md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <h3 className="font-display text-2xl text-paper md:text-3xl">
                {education.degree}
              </h3>
              <p className="mt-2 font-mono text-sm text-cobalt-300">{education.school}</p>
              <p className="mt-1 text-sm text-paper-dim">{education.location}</p>
            </div>

            <div className="flex gap-8 md:flex-col md:items-end md:text-right">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-paper-dim/70">
                  {education.period}
                </p>
              </div>
              <div>
                <p className="font-display text-3xl text-amber-300">{education.detail}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
