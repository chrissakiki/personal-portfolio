import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

export const projects = [
  {
    slug: "atlas",
    title: "Atlas",
    summary:
      "A dashboard for following a product from the interface through to the API.",
    description:
      "Atlas keeps a product's work in one place, from the screens people use to the API that stores it.\n\nThe interface is a set of panels. Each one reads from the same Node service, so what you see and what is saved stay in step.",
    year: "2026",
    tags: ["React", "TypeScript", "Node.js"],
    url: "https://example.com",
    github: "https://github.com/example/atlas",
    images: [
      {
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=70",
        alt: "Green abstract forms, placeholder for Atlas",
      },
      {
        src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=70",
        alt: "Dark desk with a screen, placeholder for Atlas",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=70",
        alt: "Charts on a laptop, placeholder for Atlas",
      },
    ],
  },
  {
    slug: "fieldnote",
    title: "Fieldnote",
    summary: "A quiet writing space with a small editor and a publishing API.",
    description:
      "Fieldnote is a small editor with a publishing API beside it. The writing stays quiet, and the server takes care of saving and sending it.\n\nThere is no public link for this one. The build sits behind a login, so the pictures and the write-up are the part that can be shared.",
    year: "2025",
    tags: ["Next.js", "TypeScript"],
    images: [
      {
        src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=70",
        alt: "Soft geometric color blocks, placeholder for Fieldnote",
      },
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=70",
        alt: "Laptop on a wooden desk, placeholder for Fieldnote",
      },
      {
        src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=70",
        alt: "Handwritten pages, placeholder for Fieldnote",
      },
    ],
  },
  {
    slug: "harbor",
    title: "Harbor",
    summary:
      "An account area for signing in, updating a profile, and reading activity.",
    description:
      "Harbor is the account area: sign in, update a profile, and read what happened recently.\n\nThe screens stay thin. The session and the activity live on the server.",
    year: "2025",
    tags: ["React", "Node.js"],
    url: "https://example.com",
    images: [
      {
        src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1600&q=70",
        alt: "Layered pastel shapes, placeholder for Harbor",
      },
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70",
        alt: "Circuit board close-up, placeholder for Harbor",
      },
      {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=70",
        alt: "Code on a dark screen, placeholder for Harbor",
      },
    ],
  },
  {
    slug: "relay",
    title: "Relay",
    summary: "A message board that stays quick from the screen to the server.",
    description:
      "Relay is a message board built to stay quick from the React screen to the Node server.\n\nIt was a freelance build for a private team, so the live product is not linked here.",
    year: "2024",
    tags: ["React", "TypeScript", "Node.js"],
    github: "https://github.com/example/relay",
    images: [
      {
        src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1600&q=70",
        alt: "Bright gradient wash, placeholder for Relay",
      },
      {
        src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&q=70",
        alt: "Code on a monitor in the dark, placeholder for Relay",
      },
      {
        src: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1600&q=70",
        alt: "Design sketches on a desk, placeholder for Relay",
      },
    ],
  },
];

export const getProject = (slug: string) => {
  return projects.find((project) => project.slug === slug);
};

type ProjectsProps = {
  as?: "h1" | "h2";
  showAll?: boolean;
};

const Projects = ({
  as: Heading = "h2",
  showAll = false,
}: ProjectsProps) => {
  return (
    <section id="projects" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading
          as={Heading}
          eyebrow="Selected work"
          title="Projects"
          action={
            showAll ? (
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 pb-1 text-sm font-medium text-white/75 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Show all projects
                <FiArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            ) : undefined
          }
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {projects.map((project, index) => {
            const cover = project.images[0];

            return (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={project.title}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-[#10141a] ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 ease-out [@media(hover:hover)]:grayscale motion-safe:group-hover:scale-105 motion-safe:group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition duration-500 group-hover:from-black/90" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium tracking-[0.22em] text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-white/55">{project.year}</span>
                    </div>
                    <h3 className="mt-2 text-2xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                      {project.title}
                    </h3>

                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-500 ease-out",
                        "grid-rows-[1fr] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr]",
                        "motion-reduce:grid-rows-[1fr]!", // keep the row open when the user has asked the
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pt-3 text-sm leading-relaxed text-white/70">
                          {project.summary}
                        </p>
                        <ul className="flex flex-wrap gap-x-3 gap-y-1 pt-3 text-[0.65rem] tracking-[0.16em] text-white/45 uppercase">
                          {project.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

export default Projects;
