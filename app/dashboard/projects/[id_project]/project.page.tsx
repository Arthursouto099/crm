"use client";

import projectServices from "@/api/services/project.services";
import { Project } from "@/api/types/project.types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthContext from "@/hooks/use-auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const setInfoInProjectPage = async (
  token: string,
  setAction: Dispatch<SetStateAction<Project | null>>,
  id_project: string
) => {
  const { data } = await projectServices.find(token, id_project);
  setAction(data.project);
};

interface ProjectClientProps {
  id_project: string;
}

export default function ProjectClient({ id_project }: ProjectClientProps) {
  const [project, setProject] = useState<Project | null>(null);
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) return;
    setInfoInProjectPage(token, setProject, id_project);
  }, [id_project, token]);

  return (
    <section className="w-full h-full">
        
    </section>
  );
}
