import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import Container from "@/components/Container";
import { getProject, projects } from "@/components/Projects";

export const generateStaticParams = () => {
  return projects.map((project) => ({ slug: project.slug }));
};

export const generateMetadata = async ({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project" };

  return {
    title: project.title,
    description: project.summary,
  };
};

const ProjectPage = ({
  params,
}: PageProps<"/projects/[slug]">) => {
  return (
    <article className="py-20 md:py-28">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <FiArrowLeft className="size-4" aria-hidden="true" />
          Projects
        </Link>
        <Suspense fallback={null}>
          <ProjectBody params={params} />
        </Suspense>
      </Container>
    </article>
  );
};

const ProjectBody = async ({
  params,
}: {
  params: PageProps<"/projects/[slug]">["params"];
}) => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const [cover, ...gallery] = project.images;

  return (
    <>
        <div className="mt-10 flex items-baseline justify-between gap-4">
          <span className="text-sm font-medium tracking-[0.22em] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm text-muted">{project.year}</span>
        </div>

        <h1 className="mt-4 text-5xl font-medium tracking-tight sm:text-7xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] tracking-[0.16em] text-white/45 uppercase">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Visit
              <FiArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          ) : null}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <FiGithub className="size-4" aria-hidden="true" />
              GitHub
            </a>
          ) : null}
        </div>

        <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl bg-[#10141a] ring-1 ring-white/10">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            unoptimized
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-12 max-w-2xl space-y-5 text-base leading-relaxed text-white/75 sm:text-lg">
          {project.description.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {gallery.length > 0 ? (
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {gallery.map((image) => (
              <li
                key={image.src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#10141a] ring-1 ring-white/10"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        ) : null}
    </>
  );
};

export default ProjectPage;
