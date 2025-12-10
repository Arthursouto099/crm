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

          <h1 className="scroll-m-20 text-balance text-3xl font-semibold leading-tight md:text-4xl">
            Bem-vindo de volta,{" "}
            <span className="text-primary">{user?.name}</span>.
          </h1>

          <p className="text-sm text-muted-foreground md:text-base">
            Que bom te ver novamente. Aqui estão todos os seus projetos:
          </p>
        </div>

        {/* Ações: busca + novo projeto */}
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:justify-end">
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

          {/* Botão de novo projeto */}
          <div className="shrink-0">
            <ProjectSettings
          
              onCreated={() => {
                setDataProjectList();
              }}
            />
          </div>

       
        </div>
      </div>

    

      <div className=" w-full mt-6  flex  md:w-full h-full">
        <ProjectCardsSection data={filterByDate} />
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
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Ordenar por:" />
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
