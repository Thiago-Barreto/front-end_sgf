import LayoutGrupoMulti from "@/pages/sgf/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/pagination";
import { ExcelExport } from "@/components/buttons/excel";
import { useActiveEquipments } from "@/api/shared/equipment";
import { useMemo, useState } from "react";
import { LoaderIcon } from "lucide-react";
import type { MvEquipmentData } from "@/interface/shared/equipments/movements";

export default function ReturnEquipments() {
  const { data: actives = [], isLoading } = useActiveEquipments();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(8);

  const handlePageClick = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const offset = currentPage * itemsPerPage;

  const filteredModels = useMemo(() => {
    const equipmentsArray = Array.isArray(actives) ? actives : [];
    return equipmentsArray.filter(() => {
      return true;
    });
  }, [actives]);

  const currentData = useMemo(() => {
    return filteredModels.slice(offset, offset + itemsPerPage);
  }, [filteredModels, offset, itemsPerPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredModels.length / itemsPerPage);
  }, [filteredModels.length, itemsPerPage]);

  return (
    <LayoutGrupoMulti titlePage="Equipamentos ativos">
      {isLoading ? (
        <p className="flex items-center gap-2">
          Carregando dados <LoaderIcon size={15} className="animate-spin" />
        </p>
      ) : (
        <section className="flex flex-1 flex-col gap-2 rounded-xl px-3 lg:w-96">
          <div className="flex items-center gap-2">
            {/* <CreateEquipment /> */}
            <ExcelExport data={filteredModels} fileName="Equipamentos" />
          </div>
          <div
            className={`flex flex-col ${itemsPerPage >= 8 ? "" : "h-[462px] 2xl:h-[752px]"}`}
          >
            <div className="flex flex-2/3 flex-col overflow-hidden rounded-md border">
              <Table>
                <TableHeader className="bg-background sticky top-0 z-10 shadow-sm">
                  <TableRow>
                    <TableHead>Serial</TableHead>
                    <TableHead>Usuário de Saída</TableHead>
                    <TableHead>Data de Saída</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Linha</TableHead>
                    <TableHead>Galpão</TableHead>
                    <TableHead>Usuário de Retorno</TableHead>
                    <TableHead>Data de Retorno</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData?.map((data: MvEquipmentData) => {
                    return (
                      <TableRow key={data.id}>
                        <TableCell className="border">{data.id_code}</TableCell>
                        <TableCell className="border">
                          {data.user_exit}
                        </TableCell>
                        <TableCell className="border">
                          {data.date_exit}
                        </TableCell>
                        <TableCell className="border">{data.status}</TableCell>
                        <TableCell className="border text-center">
                          {data.line}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.shed}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.user_return}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.date_return}
                        </TableCell>

                        <TableCell className="flex">
                          <div className="flex gap-4">
                            {/* <EquipmentUpdate initialData={data} />
                            {data.status !== "Em linha" && (
                              <ExitMovements initialData={data} />
                            )} */}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <Pagination
              allItems={actives?.length}
              currentPage={currentPage}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </section>
      )}
    </LayoutGrupoMulti>
  );
}
