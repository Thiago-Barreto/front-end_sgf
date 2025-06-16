import { useCreateEquipment } from "@/api/private/engineering/test";
import FamilyComboBox from "@/components/select/family";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EquipmentCreate,
  type EquipmentType,
} from "@/schema/private/engineering/test/equipments";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

export default function CreateEquipment() {
  const methods = useForm<EquipmentType>({
    resolver: zodResolver(EquipmentCreate),
  });
  const { register, handleSubmit } = methods;
  const { mutateAsync, isPending } = useCreateEquipment();
  const handleSubmitForm = async (data: EquipmentType) => {
    mutateAsync(data);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Criar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[900px]">
        <AlertDialogHeader className="flex items-center justify-center">
          <AlertDialogTitle>Registrar novo Equipamento</AlertDialogTitle>
          <AlertDialogDescription>
            Antes de enviar os dados do fomulário, confirme para que não tenha
            que retrabalhar os dados mais tarde.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormProvider {...methods}>
          <form className="grid w-full grid-cols-3 gap-3">
            <div>
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="code_sap"
              >
                Código do SAP
              </Label>
              <Input {...register("code_sap")} id="code_sap" />
            </div>
            <div>
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="description"
              >
                Descrição
              </Label>
              <Input {...register("description")} id="description" />
            </div>
            <FamilyComboBox name="family" />
            <div>
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="brand"
              >
                Fornecedor
              </Label>
              <Input {...register("brand")} id="brand" />
            </div>
            <div>
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="shed"
              >
                Galpão
              </Label>
              <Input {...register("shed")} id="shed" />
            </div>
            <div>
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="location"
              >
                Localização
              </Label>
              <Input {...register("location")} id="location" />
            </div>
            <div>
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="amountEqp"
              >
                Qtd de Equipamentos
              </Label>
              <Input {...register("amountEqp")} id="amountEqp" />
            </div>
            <AlertDialogFooter className="col-span-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmit((data) => handleSubmitForm(data))}
                className="cursor-pointer"
                disabled={isPending}
              >
                {isPending ? (
                  <p className="flex items-center gap-2">
                    Enviando registros{" "}
                    <Loader2 size={15} className="animate-spin" />
                  </p>
                ) : (
                  <p>Enviar</p>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}
