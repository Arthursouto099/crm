
import { ArrowUpRightIcon, ChartArea, Inbox, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyStore() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia  className="bg-violet-500" variant="icon">
          <Inbox />
        </EmptyMedia>
        <EmptyTitle>Nenhuma loja encontrada</EmptyTitle>
        <EmptyDescription>
          Suas lojas iram ficar nessa parte.
        </EmptyDescription>
      </EmptyHeader>
      {/* <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent> */}
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  )
}



export function EmptyChart() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia  className="bg-violet-500" variant="icon">
          <ChartArea />
        </EmptyMedia>
        <EmptyTitle>Você não possui dados suficientes!</EmptyTitle>
        <EmptyDescription>
          Fique tranquilo! assim que você fazer suas primeirar entradas/saidas o gráfico ficara disponível.
        </EmptyDescription>
      </EmptyHeader>
      {/* <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent> */}
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  )
}


export function EmptyAddress() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia  className="bg-violet-500" variant="icon">
          <LoaderCircle />
        </EmptyMedia>
        <EmptyTitle>Você não possui dados suficientes!</EmptyTitle>
        <EmptyDescription>
          Fique tranquilo! assim que você fazer suas primeirar entradas/saidas o gráfico ficara disponível.
        </EmptyDescription>
      </EmptyHeader>
      {/* <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent> */}
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  )
}


