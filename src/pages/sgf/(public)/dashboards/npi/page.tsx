import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { FormProvider, useForm } from "react-hook-form";
import { useDashboardNpi } from "@/api/dashboard/npi";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LayoutMain from "@/pages/sgf/(public)/dashboards/layout";
import { ChartBarLabel } from "./graphics/monthStatus";
import { ChartLineLabel } from "./graphics/annualPerformancePerFamily";
import { NpiPerformanceAnalysis } from "./graphics/npiPerformanceAnalysis";

export default function DashboardNpi() {
  const methods = useForm({
    defaultValues: { month: "" },
  });
  const { register, watch, setValue } = methods;

  const month = watch("month");

  const year = new Date().getFullYear();

  const currentMonth = new Date().getMonth() + 1;
  useEffect(() => {
    setValue("month", currentMonth.toString());
  }, [currentMonth, setValue]);

  const {
    npi = [],
    monthlyCount = [],
    distinctFamilies = [],
    data = [],
    performance = [],
  } = useDashboardNpi(month);

  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentFamily = distinctFamilies[index]?.family;
  const familyItems = data.filter((item) => item.family === currentFamily);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % distinctFamilies.length);
    }, 15000);
  }, [distinctFamilies.length]);

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [distinctFamilies.length, startAutoPlay]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % distinctFamilies.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? distinctFamilies.length - 1 : prev - 1));
  };

  return (
    <LayoutMain>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b-2 bg-blue-600 text-stone-50 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 dark:bg-blue-600">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <FormProvider {...methods}>
            <form>
              <Input
                type="month"
                {...register("month")}
                className="bg-stone-100 text-stone-950"
              />
            </form>
          </FormProvider>
        </div>
        <h3>Cronograma de NPI - {year}</h3>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl">
              <ChartBarLabel npi={npi} />
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl">
              <ChartLineLabel
                monthlyCount={monthlyCount}
                distinctFamilies={distinctFamilies}
              />
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl">
              <NpiPerformanceAnalysis performance={performance} />
            </div>
          </div>
          <div
            className="bg-muted/50 flex min-h-[100vh] w-full flex-1 items-center justify-between rounded-xl px-3 md:min-h-min"
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
          >
            <Button onClick={prevSlide} variant="outline">
              ← Anterior
            </Button>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFamily}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl p-4"
              >
                <div className="text-muted-foreground mb-4 text-center text-lg font-semibold">
                  {currentFamily}
                </div>
                {familyItems.length > 0 ? (
                  <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                    {familyItems.map((item) => {
                      let statusColor;
                      if (item.status === "Concluído") {
                        statusColor =
                          "bg-green-500 absolute top-1 right-1 h-3 w-3 rounded-full";
                      } else if (item.status === "Em Processo") {
                        statusColor =
                          "animate-pulse bg-yellow-500 absolute top-1 right-1 h-3 w-3 rounded-full";
                      }

                      return (
                        <motion.div
                          layout
                          key={item.id}
                          className={`relative flex h-full w-full flex-col items-center justify-center rounded-lg border border-blue-600 p-2 ${item.status === "Atrasado" && "animate-pulse border-stone-100 bg-red-500 text-stone-100"}`}
                        >
                          <span className={`${statusColor}`}></span>
                          <h2 className="text-lg">
                            {currentFamily === "SSD" ||
                            currentFamily === "DDR" ? (
                              <p>
                                {item.code} - {item.halb}
                              </p>
                            ) : (
                              <p>{item.code}</p>
                            )}
                          </h2>
                          <div className="flex w-full flex-col items-start justify-start text-sm">
                            <p>{item.lote_and_fixture}</p>
                            <p>{item.product_class}</p>
                            <p>
                              Piloto Eng:{" "}
                              {item.estimated_engineering_pilot_date}
                            </p>
                            <p>
                              Piloto Prod:{" "}
                              {item.estimated_pilot_production_date}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-center">
                    Sem programação de NPI para este mês.
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex gap-4">
              <Button onClick={nextSlide} variant="outline">
                Próxima →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}
