import { Project } from "@/api/types/project.types";
import { ProjectCard } from "./project-card";
import { FileSearchCornerIcon, FolderOpen } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function ProjectCardsSection({
  data,
}: {
  data: Array<Project>;
}) {
  if (!data.length) {
    return (
      <Card className="w-full bg-accent/20 flex items-center justify-center ">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <FolderOpen className="w-8 h-8" />
          <p className="text-sm">Nenhum projeto encontrado com esse filtro.</p>
          <span className="text-xs text-muted-foreground/70">
            Ajuste a busca ou inicie um novo projeto.
          </span>
        </div>
      </Card>
    );
  }
  return (
    <Card className="bg-accent/20 p-5 w-full rounded-lg">
<CardHeader className="px-0">
  <div className="flex items-center gap-3">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
      <FileSearchCornerIcon size={18} className="text-primary" />
    </div>

    <div>
      <h2 className="text-lg font-semibold text-accent-foreground/90">
        {data.length} projetos encontrados
      </h2>
      <p className="text-xs text-muted-foreground">
        Resultados filtrados conforme sua busca
      </p>
    </div>
  </div>
</CardHeader>

      <CardContent className="w-full hide-scrollbar  px-0   grid grid-cols-1 md:grid-cols-5  overflow-y-auto  gap-4  h-full" >
         {data.map((project) => (
          <ProjectCard key={project.id_project} data={project} />
        ))}
      </CardContent>
      
    </Card>
  );
}
