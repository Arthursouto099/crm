"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FormEvent, ReactNode } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import projectServices from "@/api/services/project.services";
import { toast } from "sonner";
import useAuthContext from "@/hooks/use-auth";
import { PlusCircle } from "lucide-react";
import { Project } from "@/api/types/project.types";

interface ProjectsSettingsProps {
  onCreated: (data: Project) => void
}

export default function ProjectSettings({onCreated}: ProjectsSettingsProps) {
  const { token, isAuthenticated } = useAuthContext();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const isPublicStr = formData.get("isPublic");

    const isPublic =
      isPublicStr === "true" ? true : isPublicStr === "false" ? false : null;

    try {
      const { data } = await projectServices.create(
        formData.get("title") as string,
        formData.get("description") as string,
        isPublic as boolean,
        token as string
      );


      onCreated(data.user)

      toast.success("Projeto criado com sucesso");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error(e.response?.data?.error || e.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="flex items-center gap-1">
          <PlusCircle /> Iniciar Projeto
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Projeto</SheetTitle>
          <SheetDescription>
            Gerencie seu projeto, adicione colaboradors, ou gerencie de maneira
            solo.
          </SheetDescription>

          <form
            onSubmit={(e) => onSubmit(e)}
            className="flex mt-10 flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <Label>Titulo do Projeto</Label>
              <Input name="title" placeholder="P1" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Descrição do Projeto</Label>
              <Textarea
                name="description"
                placeholder="Informe do que o seu projeto se trata..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Projeto Publico</Label>
              <Select name="isPublic">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sim</SelectItem>
                  <SelectItem value="false">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button>Proseguir</Button>
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
