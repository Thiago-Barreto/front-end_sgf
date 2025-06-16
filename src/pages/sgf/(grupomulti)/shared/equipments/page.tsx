import { useEquipmentsAll } from "@/api/private/engineering/test";
import type { EquipmentData } from "@/interface/private/engineering/test";
import LayoutGrupoMulti from "@/pages/sgf/(grupomulti)/layout";
import {
  EquipmentsWithoutId,
  type EquipmentsType,
} from "@/schema/private/engineering/test/equipments";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import CreateEquipment from "./actions/register/page";

export default function EquipmentsMain() {
  const { data: equipments = [], isLoading } = useEquipmentsAll();
  const methods = useForm<EquipmentsType>({
    resolver: zodResolver(EquipmentsWithoutId),
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
    return equipments.filter((data: EquipmentData) => {
      const name =
        !filters.serial ||
        data.serial?.toLowerCase().includes(filters.serial.toLowerCase());
      const codeSap =
        !filters.code_sap ||
        data.code_sap?.toLowerCase().includes(filters.code_sap.toLowerCase());
      const description =
        !filters.description ||
        data.description
          ?.toLowerCase()
          .includes(filters.description.toLowerCase());

      return codeSap && name && description;
    });
  }, [equipments, filters]);

  const currentData = useMemo(() => {
    return filteredModels.slice(offset, offset + itemsPerPage);
  }, [filteredModels, offset, itemsPerPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredModels.length / itemsPerPage);
  }, [filteredModels.length, itemsPerPage]);

  return (
    <LayoutGrupoMulti titlePage="Equipamentos">
      {isLoading ? (
        <p className="flex items-center gap-2">
          Carregando dados <LoaderIcon size={15} className="animate-spin" />
        </p>
      ) : (
        <section className="flex flex-1 flex-col gap-2 rounded-xl px-3 lg:w-96">
          <div>
            <CreateEquipment />
          </div>
          <div
            className={`flex flex-col ${equipments.length <= 15 ? "h-[460px] 2xl:h-[752px]" : ""}`}
          >
            <div className="flex flex-2/3 flex-col overflow-hidden rounded-md border">
              <Table>
                <TableHeader className="bg-background sticky top-0 z-10 shadow-sm">
                  <TableRow>
                    <TableHead>Serial</TableHead>
                    <TableHead>Código do SAP</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Família</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Requer Calib.</TableHead>
                    <TableHead>Certificado de Calib.</TableHead>
                    <TableHead>Nota fiscal</TableHead>
                    <TableHead>Galpão</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className="py-2">
                      <Input
                        placeholder="Pesquisar"
                        {...register("serial")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("code_sap")}
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
                        {...register("brand")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("requiresCalibration")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("invoice")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("shed")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("status")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead>
                      <Input
                        placeholder="Pesquisar"
                        {...register("location")}
                        className="w-34"
                      />
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData?.map((data: EquipmentData) => {
                    return (
                      <TableRow key={data.id}>
                        <TableCell className="border">{data.serial}</TableCell>
                        <TableCell className="border">
                          <p className="flex items-center gap-1 text-xs">
                            {data.code_sap}
                          </p>
                        </TableCell>
                        <TableCell className="border">
                          {data.description}
                        </TableCell>

                        <TableCell className="border text-center">
                          {data.family}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.brand}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.requiresCalibration}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.calibrationCertificate}
                        </TableCell>
                        <TableCell className="border text-center">
                          {data.invoice}
                        </TableCell>
                        <TableCell className="border">{data.shed}</TableCell>
                        <TableCell className="border">
                          {data.location}
                        </TableCell>
                        <TableCell className="border">{data.status}</TableCell>
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
              allItems={equipments?.length}
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
