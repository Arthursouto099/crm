"use client";

import { Project } from "@/api/types/project.types";
import { useEffect, useState } from "react";
import useAuthContext from "./use-auth";
import projectServices from "@/api/services/project.services";

export default function useProjects() {
  const { token } = useAuthContext();
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function  setDataProjectList() {
    if (!token) return;

    try {
      setLoading(true);
      const { data } = await projectServices.findAll(token!);
      setProjectList(data.projects);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Usuario não logado");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!token) return
    setDataProjectList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
    setDataProjectList,
    projectList,
    loading,
    error
  };
}
