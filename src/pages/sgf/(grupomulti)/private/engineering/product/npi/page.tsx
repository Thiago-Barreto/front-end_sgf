import LayoutGrupoMulti from "@/pages/sgf/(grupomulti)/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import { useNpiAll } from "@/api/private/engineering/product/npi";
import type { NpiData } from "@/interface/dashboard/npi";
import { Pagination } from "@/components/pagination";
import {
  NpiWithoutId,
  type NpiSearch,
} from "@/schema/private/engineering/product/npi";
import { ExcelExport } from "@/components/buttons/excel";
import NewNpi from "./actions/register/page";
import { data } from "react-router-dom";

export default function NpiMain() {
  const { data: npi = [] } = useNpiAll();
  console.log(npi);
  const methods = useForm<NpiSearch>({
    resolver: zodResolver(NpiWithoutId),
  });
  const { watch, register } = methods;
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  const handlePageClick = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const offset = currentPage * itemsPerPage;

  const filters = watch();

  const filteredModels = useMemo(() => {
    return npi.filter((data: NpiData) => {
      const name =
        !filters.code ||
        data.code?.toLowerCase().includes(filters.code.toLowerCase());
      const codeSap =
        !filters.family ||
        data.family?.toLowerCase().includes(filters.family.toLowerCase());
      const description =
        !filters.description ||
        data.description
          ?.toLowerCase()
          .includes(filters.description.toLowerCase());

      return codeSap && name && description;
    });
  }, [npi, filters]);

  const currentData = useMemo(() => {
    return filteredModels.slice(offset, offset + itemsPerPage);
  }, [filteredModels, offset, itemsPerPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredModels.length / itemsPerPage);
  }, [filteredModels.length, itemsPerPage]);

  return (
    <LayoutGrupoMulti titlePage="Programação de NPI">
      <section className="flex flex-1 flex-col gap-2 rounded-xl px-3 lg:w-96">
        <div className="flex w-full items-center gap-4">
          <NewNpi />
          <ExcelExport data={filteredModels} fileName="Todos os NPI" />
        </div>
        <div
          className={`flex flex-col ${npi.length <= 15 ? "h-[460px] 2xl:h-[752px]" : ""}`}
        >
          <div className="flex flex-2/3 flex-col overflow-hidden rounded-md border">
            <Table>
              <TableHeader className="bg-background sticky top-0 z-10 shadow-sm">
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Família</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo de Embalagem</TableHead>
                  <TableHead>Tipo de Produção</TableHead>
                  <TableHead>Classe de Produto</TableHead>
                  <TableHead>Lote e Fixture</TableHead>
                  <TableHead>Previsão da chegada de MP</TableHead>
                  <TableHead>Halb</TableHead>
                  <TableHead>Data Piloto de Eng.</TableHead>
                  <TableHead>Data Piloto de Prod.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="py-2">
                    <Input
                      placeholder="Pesquisar"
                      {...register("code")}
                      className="w-34"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      placeholder="Pesquisar"
                      {...register("family")}
                      className="w-34"
                    />
                  </TableHead>
                  <TableHead>
                    <Input
                      placeholder="Pesquisar"
                      {...register("description")}
                      className="w-34"
                    />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData?.map((data: NpiData) => {
                  return (
                    <TableRow key={data.id}>
                      <TableCell className="border">{data.code}</TableCell>
                      <TableCell className="border">{data.family}</TableCell>
                      <TableCell className="border">
                        {data.description.length > 21
                          ? data.description.slice(0, 21) + "..."
                          : data.description}
                      </TableCell>
                      <TableCell className="border text-center">
                        {data.type_of_shipment}
                      </TableCell>
                      <TableCell className="border text-center">
                        {data.type_of_production}
                      </TableCell>
                      <TableCell className="border text-center">
                        {data.product_class}
                      </TableCell>
                      <TableCell className="border text-center">
                        {data.lote_and_fixture}
                      </TableCell>
                      <TableCell className="border text-center">
                        {data.arrival_of_mp_and_fixture}
                      </TableCell>
                      <TableCell className="border text-center">
                        {data.halb}
                      </TableCell>
                      <TableCell className="border text-center">
                        {data.estimated_engineering_pilot_date}
                      </TableCell>
                      <TableCell className="border text-center">
                        {data.estimated_pilot_production_date}
                      </TableCell>
                      <TableCell className="border">
                        <Badge className="border border-stone-200 bg-transparent text-stone-700 dark:text-stone-400">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${data.status === "Concluído" ? "bg-green-500" : data.status === "Atrasado" ? "bg-red-500" : data.status === "Em Processo" && "bg-yellow-500"}`}
                          ></span>
                          <p className="text-[10px]">
                            {data.status === null || data.status === "" ? (
                              <p>Aguardando</p>
                            ) : (
                              data.status
                            )}
                          </p>
                        </Badge>
                      </TableCell>
                      <TableCell className="border">
                        {/* <ModelsUpdate initialData={data} /> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <Pagination
            allItems={npi?.length}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            pageCount={pageCount}
          />
        </div>
      </section>
    </LayoutGrupoMulti>
  );
}
