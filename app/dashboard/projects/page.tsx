"use client";
import ProjectSettings from "@/components/project-settings-create";
import ProjectCardsSection from "@/components/projects/project-cards-section";
import { Input } from "@/components/ui/input";
import useProjects from "@/hooks/use-projects";
import { FileSearchCornerIcon } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuthContext from "@/hooks/use-auth";

export default function Projects() {
  const [filter, setFilter] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");
  const { projectList, setDataProjectList } = useProjects();
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

  return (
    <section className="w-full animate-fadeIn  md:w-full p-2">
      <div className="flex w-full flex-col gap-4 rounded-xl border border-border/60 bg-accent/10 p-4 md:flex-row md:items-center md:justify-between md:p-6">
        {/* Texto de boas-vindas */}
        <div className="space-y-2">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Dashboard Projetos
          </p>

          <h1 className="border-violet-600/50 border-b-[0.1px] pb-1 scroll-m-20 text-balance text-3xl font-semibold leading-tight md:text-4xl">
            Bem-vindo de volta,{" "}
            <span className="text-primary">{user?.name}</span>.
          </h1>


          <p className="text-sm text-muted-foreground md:text-base">
            Que bom te ver novamente. Aqui estão todos os seus projetos:
          </p>
        </div>
      </div>

    

      <div className=" w-full mt-6  flex  md:w-full h-full">
        <ProjectCardsSection  />
      </div>
    </section>
  );
}

interface SelectByDateProps {
  onSelect: (e: string) => void;
}

export function SelectByDate({ onSelect }: SelectByDateProps) {
  return (
    <Select
      onValueChange={(e) => {
        onSelect(e);
      }}
    >
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="Ordenar por data" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordenar por data</SelectLabel>
          <SelectItem value="news">Mais Antigo</SelectItem>
          <SelectItem value="olds">Mais Novo</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

interface SelectByStatusProps {
  onSelect: (e: string) => void;
}


export function SelectByStatus({ onSelect }: SelectByStatusProps) {
  return (
    <Select
      onValueChange={(e) => {
        onSelect(e);
      }}
    >
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="Ordenar por status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordenar por Status</SelectLabel>
          <SelectItem value="ACTIVE">Ativos</SelectItem>
          <SelectItem value="ARCHIVED">Arquivados</SelectItem>
          <SelectItem value="DRAFT">Rascunhos</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
