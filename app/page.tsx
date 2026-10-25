// import Link from "next/link";
// import { FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import { LuBraces, LuHash } from "react-icons/lu";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Container from "@/components/Container";
import Projects from "@/components/Projects";
import { cn } from "@/lib/utils";

// const socials = [
//   { label: "GitHub", href: "https://github.com", Icon: FiGithub },
//   { label: "LinkedIn", href: "https://www.linkedin.com", Icon: FiLinkedin },
//   { label: "Email", href: "mailto:", Icon: FiMail },
// ];

const marks = [
  {
    name: "braces",
    Icon: LuBraces,
    className:
      "top-[14%] -left-3 size-20 -rotate-12 sm:top-[16%] sm:left-[4%] sm:size-40",
  },
  {
    name: "hash",
    Icon: LuHash,
    className:
      "top-[18%] -right-1 size-9 rotate-[16deg] sm:top-[22%] sm:right-[10%] sm:size-16",
  },
];

const HomePage = () => {
  return (
    <>
      <section id="home" className="relative h-screen overflow-hidden bg-background">
      <div aria-hidden="true" className="hero-scene">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />
        <p className="hero-watermark">developer</p>
        {marks.map(({ name, Icon, className }) => (
          <Icon
            key={name}
            className={cn(
              "absolute text-[#161b22] drop-shadow-[10px_16px_14px_rgb(0_0_0/0.45)]",
              className,
            )}
          />
        ))}
      </div>

      <Container className="relative z-10 flex h-full flex-col items-center justify-center pt-16 text-center">
        <div>
          <p className="text-[0.7rem] tracking-[0.28em] text-white/45 uppercase">
            Home
          </p>
          <h1 className="mt-5 text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-7xl">
            Hi, I’m Chris Akiki
          </h1>
          <p className="mt-1 md:mt-3 text-xl font-medium text-accent sm:text-2xl md:text-4xl">
            Full stack developer
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-md">
            I specialize in building scalable web applications using React,
            TypeScript, and Node.js. Passionate about clean code, user
            experience, and continuous learning.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-[#0c0e12] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              View projects
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-accent px-6 py-2.5 text-sm font-medium text-accent transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <FiDownload className="size-4" aria-hidden="true" />
              Download resume
            </a>
          </div>
        </div>

        {/*
        <ul className="mt-10 flex items-center gap-8">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} aria-label={label} className="text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        */}
      </Container>

      {/* <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <FiArrowDown className="size-6 motion-safe:animate-bounce" aria-hidden="true" />
      </a> */}
      </section>
      <About />
      <Projects showAll />
      <Contact />
    </>
  );
};

export default HomePage;
