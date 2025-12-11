"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthContext from "@/hooks/use-auth";
import { LayoutDashboard, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter()

  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-7xl  flex flex-col gap-4 md:gap-6">

        {/* Boas-vindas */}
        <Card className="bg-accent/20 border border-border/60">
          <CardHeader>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10">
                <Star className="w-6 h-6 text-violet-400 fill-violet-400" />
              </div>

              <div className="flex flex-col gap-1">
                <CardTitle className="text-2xl md:text-3xl font-bold leading-tight">
                  Bem-vindo,{" "}
                  <span className="text-violet-400">{user?.name}</span>
                </CardTitle>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                  Organize o trabalho, priorize ações, avance com segurança.
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Cards explicativos em grid */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          {/* Sobre o ambiente */}
          <Card className="bg-accent/10 border border-border/60">
            <CardHeader className="space-y-3">
              <span className="inline-flex items-center w-fit px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-[11px] font-medium uppercase tracking-wide text-violet-400">
                Ambiente
              </span>

              <CardTitle className="text-xl md:text-2xl font-semibold leading-tight">
                Sobre este ambiente
              </CardTitle>

              <CardDescription className="max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
                Este ambiente foi desenvolvido para trazer clareza ao seu fluxo de
                trabalho. Aqui você encontrará recursos que apoiam o planejamento,
                o acompanhamento e a execução dos seus projetos, com uma estrutura
                simples, organizada e pensada para facilitar sua rotina diária.
              </CardDescription>
            </CardHeader>

            <CardContent>
                <Button className="bg-violet-600 hover:bg-violet-500 text-white">
                        Saber Mais
                </Button>
            </CardContent>
          </Card>

          {/* O que você pode fazer aqui */}
          <Card className="bg-accent/20 border border-border/60">
            <CardHeader className="space-y-3">
              <span className="inline-flex items-center w-fit rounded-full border border-violet-500/30 bg-violet-500/5 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-violet-500">
                Visão geral
              </span>

              <CardTitle className="text-lg md:text-xl font-semibold leading-tight">
                O que você pode fazer aqui
              </CardTitle>

              <CardDescription className="text-sm text-muted-foreground">
                Este painel concentra tudo que você precisa para gerir seus
                projetos no dia a dia.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Criar e acompanhar projetos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Registrar ações, responsáveis e prazos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Acompanhar evidências e status de execução.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <span>Visualizar tudo organizado em um único lugar.</span>
                </li>
              </ul>

              <p className="text-sm text-muted-foreground">
                Este painel foi projetado para dar clareza, ritmo e segurança ao
                seu trabalho.
              </p>
            </CardContent>
          </Card>


          
        </div>

        {/* Próximo passo / chamada suave para ação */}
        <Card className="p-6 rounded-xl border border-border/60 bg-accent/20 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Ícone */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-400/20">
              <LayoutDashboard className="h-6 w-6 text-violet-500 group-hover:scale-110 transition-transform" />
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col gap-2 flex-1">
              <h3 className="text-lg md:text-xl font-semibold leading-tight">
                Acessar o Dashboard do Projeto
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Explore uma visão clara e organizada do seu projeto. Aqui você
                acompanha o que já avançou, identifica o que precisa de atenção e
                mantém o trabalho fluindo com segurança e propósito.
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                O dashboard reúne progresso, tarefas, responsáveis e indicadores
                em um espaço único, pensado para dar tranquilidade e ritmo ao seu
                dia.
              </p>

              <Button
                onClick={() => {router.push("/dashboard/projects")}}
                variant="default"
                className="mt-2 w-fit bg-violet-600 hover:bg-violet-700 text-white"
              >
                Ir para o Dashboard
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </section>
  );
}
