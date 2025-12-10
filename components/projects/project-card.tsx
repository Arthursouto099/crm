'use client'
import { Project } from "@/api/types/project.types";
import {
  AlertCircle,
  Archive,
  BadgeCheck,
  ClipboardList,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "../ui/progress";

export function ProjectCard({ data }: { data: Project }) {
  return (
    <Link href={`/dashboard/projects/${data.id_project}`} className="block">
      <div
        className="
        
         relative
          
          transition-all hover:scale-[1.01] hover:shadow-lg hover:brightness-110

          h-[350px]      /* <— altura fixa */
          * <— altura maior no desktop, opcional */
         rounded-xl
           overflow-hidden
           w-full
          border border-accent/90
          shadow-sm
          min-h-[400px]           /* altura menor no mobile */
          md:min-h-[400px]        /* altura maior no desktop */
          
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom, 
              rgba(0,0,0,0.25) 0%, 
              rgba(0,0,0,0.55) 40%, 
              rgba(0,0,0,0.85) 100%
            ),
            url(${
              data.background_url ??
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fm=jpg&q=80&w=2000"
            })
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.9px]" />

        {/* Área de conteúdo */}
        <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
          {/* Topo: título + status */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
            <div className="max-w-full md:max-w-[70%]">
              <h1
                className="
                  text-lg md:text-md
                  font-semibold 
                  text-white 
                  line-clamp-2 
                  wrap-break-word
                "
              >
                {data.title}
              </h1>

              <p
                className="
                  mt-1
                  text-xs md:text-sxs
                  text-white/80 
                  line-clamp-3 md:line-clamp-2 
                  wrap-break-word
                "
              >
                {data.description}
              </p>
            </div>

            <div className="flex items-center gap-1 self-start md:self-auto shrink-0 bg-black/40 px-2 py-1 rounded-full">
              {data.status === "ACTIVE" ? (
                <BadgeCheck size={16} className="text-green-400" />
              ) : data.status === "ARCHIVED" ? (
                <Archive size={16} className="text-orange-400" />
              ) : (
                <AlertCircle size={16} className="text-red-400" />
              )}
              <span className="text-xs md:text-xs font-medium text-white">
                {data.status}
              </span>
            </div>
          </div>

          {/* Rodapé: métricas */}
          <div className="mt-4 flex flex-col gap-4 text-white/90 text-xs md:text-sm">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Users size={16} /> <span>1</span>
              </div>
              <div className="flex items-center gap-2">
                <ClipboardList size={16} /> <span>10</span>
              </div>
            </div>
            
            <div className="h-[0.1px] w-full bg-accent-foreground/20"></div>

            <div className="w-full flex gap-2 items-center">
              <h1>60%</h1>
              <Progress value={60} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
