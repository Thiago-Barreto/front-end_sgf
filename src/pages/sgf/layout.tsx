import React from "react";
import LayoutMain from "./(public)/dashboards/layout";
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
      <header className="relative z-50 flex h-16 w-full shrink-0 items-center gap-2">
        <nav className="fixed top-0 flex h-16 w-full items-center gap-1 border-b-2 bg-blue-600 px-4 text-stone-50 shadow-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14 dark:bg-blue-600">
          <SidebarTrigger className="-ml-1 hover:bg-blue-500 hover:text-stone-200" />
          <span className="mx-4 h-10 w-0.5 rounded bg-stone-100"></span>
          <h3 className="text-xl">{titlePage}</h3>
        </nav>
      </header>
      <section className="flex h-full w-full items-center justify-center p-5">
        {children}
      </section>
    </LayoutMain>
  );
}
