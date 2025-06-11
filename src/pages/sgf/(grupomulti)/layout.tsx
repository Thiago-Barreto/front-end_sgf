import React from "react";
import LayoutMain from "../layout";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface LayoutGrupoMultiProps {
  children: React.ReactNode;
  titlePage: string;
}

export default function LayoutGrupoMulti({
  children,
  titlePage,
}: Readonly<LayoutGrupoMultiProps>) {
  return (
    <LayoutMain>
      <header className="bg-stone-00 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 dark:bg-stone-900">
        <div className="flex items-center gap-1 px-4">
          <SidebarTrigger className="-ml-1" />
          <span className="ml-2 h-10 w-0.5 rounded bg-stone-700"></span>
        </div>
        <h3>{titlePage}</h3>
      </header>
      <section className="flex h-full w-full items-center justify-center p-5">
        {children}
      </section>
    </LayoutMain>
  );
}
