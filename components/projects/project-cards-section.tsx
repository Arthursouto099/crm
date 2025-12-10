import { Project } from "@/api/types/project.types";
import { ProjectCard } from "./project-card";
import { FileSearchCornerIcon, FolderOpen } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { SelectByDate, SelectByStatus } from "@/app/dashboard/projects/page";
import ProjectSettings from "../project-settings-create";
import { useState } from "react";
import useAuthContext from "@/hooks/use-auth";
import useProjects from "@/hooks/use-projects";

export default function ProjectCardsSection({}: {}) {
  const [filter, setFilter] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");
  const { projectList, setDataProjectList } = useProjects();
  const [statusFilter, setStatusFilter] = useState<string>("");

  const { user } = useAuthContext();

  const filterProjects =
    filter.trim() !== ""
      ? projectList.filter((p) =>
          p.title.toLowerCase().includes(filter.toLowerCase())
        )
      : projectList;

  const filterByDate =
    filterDate.trim() !== "" && filterDate.trim() === "news"
      ? [...filterProjects].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      : [...filterProjects].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

  const filterByStatus =
    statusFilter.trim() !== "" && statusFilter.trim() === "ACTIVE"
      ? [...filterByDate].filter((p) => p.status === "ACTIVE")
      : statusFilter.trim() !== "" && statusFilter.trim() === "ARCHIVED"
      ? [...filterByDate].filter((p) => p.status === "ARCHIVED")
      : statusFilter.trim() !== "" && statusFilter.trim() === "DRAFT"
      ? [...filterByDate].filter((p) => p.status === "DRAFT")
      : filterByDate;

  return (
    <Card className="bg-accent/20 p-5 w-full rounded-lg">
      <CardHeader className="px-0">
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center mb-5">
          {/* Campo de busca */}
          <div className="w-full md:w-64 lg:w-72">
            <Input
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Pesquisar projeto..."
              className="h-10 w-full"
            />
          </div>
          <div className="">
            <SelectByDate
              onSelect={(e) => {
                setFilterDate(e);
              }}
            />
          </div>
          <div className="">
            <SelectByStatus
              onSelect={(e) => {
                setStatusFilter(e);
              }}
            />
          </div>

          {/* Botão de novo projeto */}
          <div className="shrink-0">
            <ProjectSettings
              onCreated={() => {
                setDataProjectList();
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
            <FileSearchCornerIcon size={18} className="text-white" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-accent-foreground/90">
              {filterByStatus.length} projetos encontrados
            </h2>
            <p className="text-xs text-muted-foreground">
              Resultados filtrados conforme sua busca
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {filterByStatus.length < 1 ? (
          <Card className="w-full bg-accent/20 flex items-center justify-center ">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <FolderOpen className="w-8 text-violet-500  h-8" />
              <p className="text-sm border-violet-500 border-b-[0.1px] pb-1">
                Nenhum projeto encontrado com esse filtro.
              </p>
              <span className="text-xs text-muted-foreground/70">
                Ajuste a busca ou inicie um novo projeto.
              </span>
            </div>
          </Card>
        ) : (
          <div className="w-full hide-scrollbar   px-0   grid grid-cols-1 md:grid-cols-5  overflow-y-auto  gap-4  h-full">
            {filterByStatus.map((project) => (
              <ProjectCard key={project.id_project} data={project} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
