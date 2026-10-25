import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Chris Akiki.",
};

const ProjectsPage = () => {
  return <Projects as="h1" />;
};

export default ProjectsPage;
