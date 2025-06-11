import { useUsersAll } from "@/api/user/profile";
import LayoutGrupoMulti from "../../layout";
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
import type { UsersData } from "@/interface/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CopyText from "@/components/copy";
import { getUserLogin } from "@/utils/user";
import { Pagination } from "@/components/pagination";

export default function UserMain() {
  const { data: users = [], isLoading } = useUsersAll();
  const user = getUserLogin();
  const { sector } = user;

  const methods = useForm();

  const { watch } = methods;

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(8);

  const handlePageClick = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const offset = currentPage * itemsPerPage;

  const filters = watch();

  const filteredUsers = useMemo(() => {
    return users.filter((user: UsersData) => {
      const userCompleteName =
        !filters.completeName ||
        user.CompleteName?.toLowerCase().includes(
          filters.completeName.toLowerCase(),
        );

      return userCompleteName;
    });
  }, [users, filters]);

  const currentData = useMemo(() => {
    return filteredUsers.slice(offset, offset + itemsPerPage);
  }, [filteredUsers, offset, itemsPerPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredUsers.length / itemsPerPage);
  }, [filteredUsers.length, itemsPerPage]);

  return (
    <LayoutGrupoMulti titlePage="Usuários">
      {isLoading ? (
        <p>Carregando dados</p>
      ) : (
        <section className="flex flex-1 flex-col gap-2 rounded-xl px-3 lg:w-96">
          {sector === "System Developer" && (
            <div className="flex w-full items-center gap-4">
              <Button>Criar usuário</Button>
              <Button>Baixar excel</Button>
            </div>
          )}
          <div
            className={`flex flex-col ${user.length <= 15 ? "h-[460px] 2xl:h-[732px]" : ""}`}
          >
            <div className="flex flex-2/3 flex-col overflow-hidden rounded-md border">
              <Table>
                <TableHeader className="bg-background sticky top-0 z-10 shadow-md">
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Fábrica</TableHead>
                    <TableHead>Localidade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData?.map((data: UsersData) => {
                    return (
                      <TableRow key={data.ID}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={data.profile} />
                              <AvatarFallback className="bg-blue-700">
                                M
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <p>{data.CompleteName}</p>
                              {data.email === null || data.email === "" ? (
                                <p className="text-muted-foreground flex items-center gap-1 text-xs">
                                  E-mail não informado
                                </p>
                              ) : (
                                <p className="text-muted-foreground flex items-center gap-1 text-xs hover:text-blue-300">
                                  {data.email}
                                  <CopyText text={data.email} />
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{data.sector}</TableCell>
                        <TableCell>{data.hierarchy}</TableCell>
                        <TableCell>{data.factory}</TableCell>
                        <TableCell>{data.locality}</TableCell>
                        <TableCell>{data.Status}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <Pagination
              allItems={user?.length}
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
