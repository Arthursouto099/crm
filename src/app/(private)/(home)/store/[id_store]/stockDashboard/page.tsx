"use client";
import { ChartTooltipDefault } from "@/components/charts/chart-bar-default";
import { ChartLineInteractive } from "@/components/charts/chart-pie-donut-text";
import { EmptyChart } from "@/components/empyts/store";
import useAuthContext from "@/hooks/use-auth";
import { movementStockServices } from "@/src/api/services/movementStock.services";
import { ArrowRight, Box } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useEffect, useState, useCallback } from "react";

export default function StockDashBoard() {
  const { id_store } = useParams<{ id_store: string }>();
  const entries = useEntries({ id_store });
  const departures = useDepartures({ id_store });
  const last30Days = useMetricsBy30LastDays({ id_store });
  const { user } = useAuthContext();

  const idStore = useMemo(() => {
    const raw = id_store;
    if (!raw) return null;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [id_store]);

  useEffect(() => {
    if (!idStore) return;
  }, [idStore]);

  return (
    <section className="w-full">
      <div className="w-full py-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
          Seja bem-vindo{" "}
          <span className="text-violet-500 font-semibold">{user?.name}!</span>
        </h1>
        <p className="mt-1 text-sm sm:text-base text-foreground/60">
          Visão geral do seu estoque.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        <div className="relative bg-card min-h-[280px] min-w-[280px] col-span-3 flex flex-col justify-center items-center border border-border/60 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
          <div className="absolute left-0 top-0 w-full p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="font-medium text-foreground/80 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                    <Box size={16} />
                  </span>
                  Saídas nos últimos 30 dias
                </h1>
                <p className="mt-1 text-sm text-foreground/55">
                  Todas as saídas registradas nos últimos 30 dias.
                </p>
              </div>

              <span className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground/60">
                Hoje
              </span>
            </div>
          </div>

          <div className="w-full mt-20">
            {Array.isArray(last30Days.metrics) &&
            last30Days.metrics.length > 1 ? (
              // <ChartTooltipDefault data={last30Days.metrics} />
              <ChartLineInteractive data={last30Days.metrics} />
            ) : (
              <EmptyChart />
            )}
          </div>
        </div>

        <div className="col-span-1 grid grid-rows-2 gap-4">
          <div>
            <div className="relative bg-card min-h-[280px] min-w-[280px] flex flex-col justify-center items-center border border-border/60 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <div className="absolute left-0 top-0 w-full p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="font-medium text-foreground/80 flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                        <Box size={16} />
                      </span>
                      Entradas no dia de hoje
                    </h1>
                    <p className="mt-1 text-sm text-foreground/55">
                      Todas as entradas registradas hoje.
                    </p>
                  </div>

                  <span className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground/60">
                    Hoje
                  </span>
                </div>
              </div>

              <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight text-violet-400">
                {entries.entries}
              </h1>
              <p className="mt-2 text-xs text-foreground/50">
                Total acumulado no dia
              </p>
            </div>
          </div>
          <div>
            <div className="relative bg-card min-h-[280px] min-w-[280px] col-end-1 flex flex-col justify-center items-center border border-border/60 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
              <div className="absolute left-0 top-0 w-full p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="font-medium text-foreground/80 flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                        <Box size={16} />
                      </span>
                      Saídas no dia de hoje
                    </h1>
                    <p className="mt-1 text-sm text-foreground/55">
                      Todas as saídas registradas hoje.
                    </p>
                  </div>

                  <span className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground/60">
                    Hoje
                  </span>
                </div>
              </div>

              <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight text-violet-400">
                {departures.departures}
              </h1>
              <p className="mt-2 text-xs text-foreground/50">
                Total acumulado no dia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const useEntries = ({ id_store }: { id_store: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [entries, setEntries] = useState<number>(0);

  const getEntries = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await movementStockServices.getEntries(id_store);
      setEntries(data.movements);
    } catch {
      setLoading(false);
      setEntries(0);
    } finally {
      setLoading(false);
    }
  }, [id_store]);

  useEffect(() => {
    getEntries();
  }, [getEntries]);

  return {
    getEntries,
    entries,
    loading,
  };
};

const useDepartures = ({ id_store }: { id_store: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [departures, setDepartures] = useState<number>(0);

  const getdepartures = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await movementStockServices.getDepartures(id_store);
      setDepartures(data.movements);
    } catch {
      setLoading(false);
      setDepartures(0);
    } finally {
      setLoading(false);
    }
  }, [id_store]);

  useEffect(() => {
    getdepartures();
  }, [getdepartures]);

  return {
    getdepartures,
    departures,
    loading,
  };
};

const useMetricsBy30LastDays = ({ id_store }: { id_store: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<
    { day: Date; departures: number; entries: number }[] | null
  >(null);

  const getMetrics = useCallback(async () => {
    try {
      setLoading(true);
      const { data } =
        await movementStockServices.getMetricsByLast30Days(id_store);
      setMetrics(data.metrics);
    } catch {
      setLoading(false);
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, [id_store]);

  useEffect(() => {
    getMetrics();
  }, [getMetrics]);

  return {
    getMetrics,
    metrics,
    loading,
  };
};
