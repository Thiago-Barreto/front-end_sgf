import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  handlePageClick: (newPage: number) => void;
  allItems: number;
}

export function Pagination({
  currentPage,
  pageCount,
  handlePageClick,
  allItems,
}: Readonly<PaginationProps>) {
  const classArrowsPrevior = `p-2 transition-all duration-300 rounded ${
    currentPage === 0 || pageCount === 0
      ? "text-zinc-400 hover:bg-transparent"
      : "hover:scale-95"
  }`;

  const classArrowsNext = `p-2 transition-all duration-300 rounded ${
    currentPage === pageCount - 1 || pageCount === 0
      ? "text-zinc-400 hover:bg-transparent"
      : "hover:scale-95"
  }`;

  return (
    <div className="mt-2 flex w-full flex-col items-center justify-between gap-5 rounded bg-stone-200 p-1.5 sm:flex-row dark:bg-blue-950">
      <p className="text-stone-900 dark:text-stone-100">Total {allItems}</p>
      <div className="flex items-center gap-3">
        <p className="text-stone-950 dark:text-stone-100">
          Página {currentPage + 1} de {pageCount}
        </p>
        <div className="flex gap-1">
          <Button
            onClick={() => handlePageClick(0)}
            disabled={currentPage === 0 || pageCount === 0}
            className={classArrowsPrevior}
          >
            <ChevronsLeft />
          </Button>
          <Button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 0 || pageCount === 0}
            className={classArrowsPrevior}
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === pageCount - 1 || pageCount === 0}
            className={classArrowsNext}
          >
            <ChevronRight />
          </Button>
          <Button
            onClick={() => handlePageClick(pageCount - 1)}
            disabled={currentPage === pageCount - 1 || pageCount === 0}
            className={classArrowsNext}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
