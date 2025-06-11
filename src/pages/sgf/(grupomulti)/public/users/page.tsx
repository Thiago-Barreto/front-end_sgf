import { useUsersAll } from "@/api/user/profile";
import LayoutGrupoMulti from "../../layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import type { UsersData } from "@/interface/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function UserMain() {
  const { data: users = [], isLoading } = useUsersAll();
  console.log("User data:", users);

  const methods = useForm();
  const { watch } = methods;
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

  // const currentData = useMemo(() => {
  //   return filteredUsers.slice(offset, offset + itemsPerPage);
  // }, [filteredData, offset, itemsPerPage]);

  // const pageCount = useMemo(() => {
  //   return Math.ceil(filteredData.length / itemsPerPage);
  // }, [filteredData.length, itemsPerPage]);

  return (
    <LayoutGrupoMulti titlePage="Usuários">
      {isLoading ? (
        <p>Carregando dados</p>
      ) : (
        <section className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center gap-4">
            <Button>Novo</Button>
            <Button>Excel</Button>
          </div>
          <div className="flex h-[442px] w-full flex-col gap-4">
            <div className="flex flex-2/3 flex-col overflow-hidden rounded-md border">
              <Table>
                <TableHeader className="bg-background sticky top-0 z-10 shadow-md">
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers?.map((data: UsersData) => {
                    return (
                      <TableRow key={data.ID}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-1">
                            <Avatar>
                              <AvatarImage src={data.profile} />
                              <AvatarFallback className="bg-blue-700">
                                M
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <p>{data.CompleteName}</p>
                              <p className="text-xs">{data.email}</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      )}
    </LayoutGrupoMulti>
  );
}
