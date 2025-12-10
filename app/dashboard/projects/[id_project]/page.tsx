import ProjectClient from "./project.page";

interface PageProps {
  params: Promise<{
    id_project: string;
  }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { id_project } = await params;

  return (
    <section className="w-full h-full">
      <ProjectClient id_project={id_project}/>
    </section>
  );
}