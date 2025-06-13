import { useModelsAll } from "@/api/private/engineering/product/models";
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
import type { ModelsData } from "@/interface/private/engineering/product/models";
import { Input } from "@/components/ui/input";
import {
  ModelsWithoutId,
  type ModelsSearch,
} from "@/schema/private/engineering/product/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge } from "@/components/ui/badge";
import CopyText from "@/components/copy";
import { Pagination } from "@/components/pagination";
import { ExcelExport } from "@/components/buttons/excel";
import NewModel from "./actions/register/page";
import ModelsUpdate from "./actions/update/page";

export default function ModelsMain() {
  const { data: models = [], isLoading } = useModelsAll();
  const methods = useForm<ModelsSearch>({
    resolver: zodResolver(ModelsWithoutId),
  });
  const { watch, register } = methods;
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(8);

  const handlePageClick = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const offset = currentPage * itemsPerPage;

  const filters = watch();

  const filteredModels = useMemo(() => {
    return models.filter((data: ModelsData) => {
      const name =
        !filters.Nome ||
        data.Nome?.toLowerCase().includes(filters.Nome.toLowerCase());
      const codeSap =
        !filters.Cod_sap ||
        data.Cod_sap?.toLowerCase().includes(filters.Cod_sap.toLowerCase());
      const description =
        !filters.Descricao ||
        data.Descricao?.toLowerCase().includes(filters.Descricao.toLowerCase());
      const ean =
        !filters.Ean ||
        data.Ean?.toLowerCase().includes(filters.Ean.toLowerCase());
      const roteiro =
        !filters.Roteiro ||
        data.Roteiro?.toLowerCase().includes(filters.Roteiro.toLowerCase());
      const processLevel =
        !filters.ProcessLevel ||
        data.ProcessLevel?.toLowerCase().includes(
          filters.ProcessLevel.toLowerCase(),
        );
      const family =
        !filters.FamilyType ||
        data.FamilyType?.toLowerCase().includes(
          filters.FamilyType.toLowerCase(),
        );
      const typeAuxPcba =
        !filters.auxPcbaType ||
        data.auxPcbaType
          ?.toLowerCase()
          .includes(filters.auxPcbaType.toLowerCase());
      const prefixSerial =
        !filters.prefixSerial ||
        data.prefixSerial
          ?.toLowerCase()
          .includes(filters.prefixSerial.toLowerCase());
      const status =
        !filters.Status ||
        data.Status?.toLowerCase().includes(filters.Status.toLowerCase());

      return (
        codeSap &&
        name &&
        description &&
        ean &&
        roteiro &&
        processLevel &&
        family &&
        typeAuxPcba &&
        prefixSerial &&
        status
      );
    });
  }, [models, filters]);

  const currentData = useMemo(() => {
    return filteredModels.slice(offset, offset + itemsPerPage);
  }, [filteredModels, offset, itemsPerPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredModels.length / itemsPerPage);
  }, [filteredModels.length, itemsPerPage]);

  return (
    <LayoutGrupoMulti titlePage="Modelos">
      {isLoading ? (
        <p>Carregando dados</p>
      ) : (
        <section className="flex flex-1 flex-col gap-2 rounded-xl px-3 lg:w-96">
          <div className="flex w-full items-center gap-4">
            <NewModel />
            <ExcelExport data={filteredModels} fileName="Todos os Modelos" />
          </div>
          <div
            className={`flex flex-col ${models.length <= 15 ? "h-[460px] 2xl:h-[752px]" : ""}`}
          >
            <div className="flex flex-2/3 flex-col overflow-hidden rounded-md border">
              <Table>
                <TableHeader className="bg-background sticky top-0 z-10 shadow-sm">
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Código do SAP</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Qtd de Inner</TableHead>
                    <TableHead>Qtd na Caixa</TableHead>
                    <TableHead>Peso da Master</TableHead>
                    <TableHead>Peso da Inner</TableHead>
                    <TableHead>Ean</TableHead>
                    <TableHead>Roteiro</TableHead>
                    <TableHead>Process Level</TableHead>
                    <TableHead>Família</TableHead>
                    <TableHead>Tipo de Aux. PCBA</TableHead>
                    <TableHead>Prefixo de Serial</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="py-2">
                      <Input
                        placeholder="Pesquisar"
                        {...register("Nome")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("Cod_sap")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("Descricao")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("Ean")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("Roteiro")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("ProcessLevel")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("FamilyType")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("auxPcbaType")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("prefixSerial")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("Status")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData?.map((data: ModelsData) => {
                    return (
                      <TableRow key={data.ID}>
                        <TableCell className="border">
                          {data.Nome.length > 12
                            ? data.Nome.slice(0, 12) + "..."
                            : data.Nome}
                        </TableCell>
                        <TableCell className="border">
                          <p className="flex items-center gap-1 text-xs">
                            {data.Cod_sap}
                            <CopyText text={data.Cod_sap} />
                          </p>
                        </TableCell>
                        <TableCell className="border">
                          {data.Descricao.length > 10
                            ? data.Descricao.slice(0, 21) + "..."
                            : data.Descricao}
                        </TableCell>

                        <TableCell className="border text-center">
                          {data.Qtd_inner}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.Qtd_caixa}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.Peso_master}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.Peso_inner}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.Ean === "" || data.Ean === null ? (
                            <p>N/A</p>
                          ) : (
                            data.Ean
                          )}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.Roteiro === "" || data.Roteiro === null ? (
                            <p>N/A</p>
                          ) : (
                            data.Roteiro
                          )}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.ProcessLevel}
                        </TableCell>
                        <TableCell className="border">
                          {data.FamilyType}
                        </TableCell>
                        <TableCell className="border">
                          {data.auxPcbaType}
                        </TableCell>
                        <TableCell className="border">
                          {data.prefixSerial === "" ||
                          data.prefixSerial === null ? (
                            <p>N/A</p>
                          ) : (
                            data.prefixSerial
                          )}
                        </TableCell>
                        <TableCell className="border">
                          <Badge className="border border-stone-200 bg-transparent text-stone-700 dark:text-stone-400">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${data.Status === "ATIVO" ? "bg-green-500" : data.Status === "DESATIVADO" && "bg-red-500"}`}
                            ></span>
                            <p className="text-[10px]">{data.Status}</p>
                          </Badge>
                        </TableCell>
                        <TableCell className="border">
                          <ModelsUpdate initialData={data} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <Pagination
              allItems={models?.length}
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
