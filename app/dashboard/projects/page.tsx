"use client";
import { ChartBarDefault } from "@/components/charts/chart-bar-default";
import { ChartPieDonutText } from "@/components/charts/chart-pie-donut-text";
import ProjectCardsSection from "@/components/projects/project-cards-section";
import { Card } from "@/components/ui/card";
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
import useProjects from "@/hooks/use-projects";

export default function Projects() {
  const { user } = useAuthContext();
  const { projectList, setDataProjectList } = useProjects();

  


  return (
    <section className="w-full animate-fadeIn  md:w-full p-2">
    <Card className="w-full rounded-xl border border-border/60 bg-accent/10 p-6">
  <div className="flex flex-col gap-8">

    {/* Área para informações adicionais (título, descrição, KPIs, textos, etc) */}
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Visão Geral dos Projetos</h2>
      <p className="text-sm text-muted-foreground">
        Aqui você pode acompanhar o resumo dos seus projetos, estatísticas e distribuição visual.
      </p>

      {/* Exemplo de blocos futuros (KPIs ou estatísticas) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 rounded-lg bg-background border border-border/50">
          <p className="text-xs text-muted-foreground">Total de Projetos</p>
          <p className="text-lg font-semibold">{projectList.length}</p>
        </div>

        <div className="p-3 rounded-lg bg-background border border-border/50">
          <p className="text-xs text-muted-foreground">Ativos</p>
          <p className="text-lg font-semibold">
            {projectList.filter(p => p.status === "ACTIVE").length}
          </p>
        </div>

        {/* Você pode adicionar mais cards aqui */}
      </div>
    </div>

    {/* Gráficos */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4 rounded-xl border">
        <ChartPieDonutText data={projectList} />
      </Card>

      <Card className="p-4 rounded-xl border">
        <ChartBarDefault data={projectList} />
      </Card>
    </div>

  </div>
</Card>

    

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
