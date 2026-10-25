import { FiArrowUpRight, FiMinus, FiSquare, FiX } from "react-icons/fi";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

const token = {
  name: "text-accent",
  role: "text-[#8eb6ff]",
  year: "text-[#e7c27a]",
  place: "text-[#c9a6ff]",
  code: "text-[#7ddec8]",
} as const;

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node",
  "Express",
  "PostgreSQL",
  "MongoDB",
];

const profiles = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];

const lines = [
  <>
    Hi, I’m <span className={token.name}>Chris</span>, a{" "}
    <span className={token.role}>web and mobile</span> developer.
  </>,
  <>
    I build products from the <span className={token.code}>interface</span>{" "}
    through to the <span className={token.code}>database</span> behind it.
  </>,
  <>
    I have more than <span className={token.year}>7 years</span> of experience,
    based in <span className={token.place}>Lebanon</span>.
  </>,
  <>
    I work with{" "}
    {stack.map((item, index) => (
      <span key={item}>
        {index === 0 ? "" : index === stack.length - 1 ? ", and " : ", "}
        <span className={token.name}>{item}</span>
      </span>
    ))}
    .
  </>,
];

const About = () => {
  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-20 border-t border-line bg-[#12161c] pt-16 pb-28 sm:pt-24 sm:pb-32"
    >
      <Container>
        <SectionHeading eyebrow="Who I am" title="About" />
        <div className="relative mt-10">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e12] shadow-[0_24px_80px_rgb(0_0_0/0.35)]">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5">
              <p className="font-mono text-xs text-white/50">about.tsx</p>
              <div className="flex items-center gap-3 text-white/30" aria-hidden="true">
                <FiMinus className="size-3.5" />
                <FiSquare className="size-3" />
                <FiX className="size-3.5" />
              </div>
            </div>
            <ol className="px-4 py-5 font-mono text-sm leading-7 text-white/75 sm:px-6 sm:py-7 text-[0.8rem] sm:text-[0.95rem] sm:leading-8">
              {lines.map((line, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[1.5rem_1fr] gap-x-2 sm:grid-cols-[2rem_1fr] sm:gap-x-6"
                >
                  <span className="md:text-right text-white/25 select-none">
                    {index + 1}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="absolute bottom-0 right-4 z-10 w-64 translate-y-[calc(100%-1.25rem)] overflow-hidden rounded-xl border border-white/15 bg-[#0c0e12] shadow-[0_18px_50px_rgb(0_0_0/0.45)] sm:right-8">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="font-mono text-xs text-white/50">links.tsx</p>
              <div className="flex items-center gap-2.5 text-white/30" aria-hidden="true">
                <FiMinus className="size-3" />
                <FiSquare className="size-2.5" />
                <FiX className="size-3" />
              </div>
            </div>
            <ol className="px-3 py-2.5 font-mono text-sm leading-7 text-white/75">
              {profiles.map((profile, index) => (
                <li key={profile.label}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid grid-cols-[1.25rem_1fr_auto] items-center gap-x-3 rounded-md transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="text-white/25">{index + 1}</span>
                    <span>{profile.label}</span>
                    <FiArrowUpRight className="size-3.5 text-white/35" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
