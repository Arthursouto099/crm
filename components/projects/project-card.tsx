"use client";
import { Project } from "@/api/types/project.types";
import {
  AlertCircle,
  Archive,
  BadgeCheck,
  ClipboardList,
  Users,
  ArchiveIcon,
  CheckCheckIcon,
  Pen
} from "lucide-react";
import Link from "next/link";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";


export function ProjectCard({ data }: { data: Project }) {
  return (
    <Link href={`/dashboard/projects/${data.id_project}`}>
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
          <div className="flex flex-col items-end  md:gap-4">
           
            <Badge className={`
            border-none 
              ${data.status === "ACTIVE" ? "bg-green-600/50 " : data.status === "ARCHIVED" ? "bg-orange-600/50" : "bg-red-600/50"}
              `} variant={"outline"}>{  
              data.status === "ACTIVE" ? <CheckCheckIcon className="m-1"/> : data.status === "ARCHIVED" ? <Archive className="m-1"/> : <Pen className="m-1"/>
              }</Badge>
          </div>

          <div className=" flex flex-col  w-full    gap-4 text-white/90 text-xs md:text-sm">
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
          </div>
        </div>
      </div>
    </Link>
  );
}
