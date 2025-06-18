import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UpdateProfileSchema,
  type UpdateProfileSchemaType,
} from "@/schema/user/update/profile";
import { getUserLogin } from "@/utils/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import LogoWhite from "@/assets/logoWhite.svg";
import { BadgeCheck } from "lucide-react";
import { useUpdateProfile } from "@/api/user/profile";

export default function ProfileUser() {
  const user = getUserLogin();
  const { UserID, AccessPassword, email, CompleteName, profile } = user;
  const methods = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      UserID: UserID,
      CompleteName: CompleteName,
      AccessPassword: AccessPassword,
      email: email,
      profile: profile,
    },
  });
  const { register, handleSubmit } = methods;
  const { mutateAsync } = useUpdateProfile();
  const handleUpdateProfile = async (data: UpdateProfileSchemaType) => {
    await mutateAsync({ data });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex w-full cursor-pointer items-center justify-start bg-transparent text-stone-950 shadow-none transition-all duration-300 hover:bg-stone-100 dark:text-stone-50 dark:hover:bg-stone-800">
          <BadgeCheck size={15} />
          Perfil
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[500px]">
        <AlertDialogHeader className="relative">
          <div className="flex h-28 w-full items-center justify-center rounded-t bg-blue-700">
            <img src={LogoWhite} alt="" />
          </div>
          <img
            src={user.profile}
            alt=""
            className="absolute -bottom-5 left-5 h-20 w-20 rounded-lg border-2 border-stone-100 bg-violet-900 p-0.5"
          />
        </AlertDialogHeader>
        <FormProvider {...methods}>
          <form className="mt-2 flex flex-col gap-4 rounded-b bg-stone-50 p-5 dark:bg-stone-900">
            <div className="flex flex-col gap-1">
              <Label>Número de Matrícula</Label>
              <Input {...register("UserID")} readOnly />
            </div>
            <div className="flex flex-col gap-1">
              <Label>E-mail</Label>
              <Input {...register("email")} />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Nome Completo</Label>
              <Input {...register("CompleteName")} />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Senha</Label>
              <Input
                type="password"
                {...register("AccessPassword")}
                placeholder="****"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Url para imagem de perfil</Label>
              <Input type="url" {...register("profile")} />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer bg-blue-700 transition-all duration-300 hover:bg-blue-800 dark:text-stone-50"
                onClick={handleSubmit((data) => handleUpdateProfile(data))}
              >
                Atualizar
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}
