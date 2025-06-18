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
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Loader2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import CalibrationRadio from "@/components/radio/calibration";
import ModelsComboBox from "@/components/select/models/page";
import {
  EquipmentCreate,
  type EquipmentCreateType,
} from "@/schema/shared/equipments";
import { useCreateEquipment } from "@/api/shared/equipment";

export default function CreateEquipment() {
  const methods = useForm<EquipmentCreateType>({
    resolver: zodResolver(EquipmentCreate),
  });
  const { register, handleSubmit, watch } = methods;

  const descricao = watch("description", "");
  const maxCaracteres = 80;

  const { mutateAsync, isPending } = useCreateEquipment();
  const handleSubmitForm = async (data: EquipmentCreateType) => {
    mutateAsync(data);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
          Novo Equipamento
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[900px]">
        <AlertDialogHeader className="flex items-center justify-center">
          <AlertDialogTitle>Registrar novo Equipamento</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center gap-1 rounded bg-stone-200 p-1 text-xs text-yellow-500">
            <Info size={14} />
            Antes de enviar os dados do fomulário, confirme para que não tenha
            que retrabalhar os dados após o envio.
            <Info size={14} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormProvider {...methods}>
          <form className="grid w-full grid-cols-3 gap-3">
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="code_sap"
              >
                Código do SAP
              </Label>
              <Input {...register("code_sap")} id="code_sap" />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="invoice"
              >
                NF
              </Label>
              <Input {...register("invoice")} id="invoice" />
            </div>
            <div className="relative flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="description"
              >
                Descrição
              </Label>
              <Input
                {...register("description")}
                id="description"
                className="pr-6"
              />
              <p className="absolute top-4.5 right-0 flex h-[35px] w-5 items-center justify-center rounded-r-sm bg-stone-200 text-xs">
                {maxCaracteres - descricao?.length}
              </p>
            </div>
            <FamilyComboBox name="family" />
            <ModelsComboBox name="product" />
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="amount"
              >
                Valor do Eqp
              </Label>
              <Input
                {...register("amount")}
                id="amount"
                placeholder="R$ 319.12"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="brand"
              >
                Fornecedor
              </Label>
              <Input {...register("brand")} id="brand" />
            </div>
            <CalibrationRadio name="requiresCalibration" />
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="shed"
              >
                Galpão
              </Label>
              <Input {...register("shed")} id="shed" />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="location"
              >
                Localização
              </Label>
              <Input {...register("location")} id="location" />
            </div>
            <div className="flex w-36 flex-col items-end justify-end gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="amountEqp"
              >
                Qtd de Equipamentos
              </Label>
              <Input {...register("amountEqp")} id="amountEqp" />
            </div>
            <AlertDialogFooter className="col-span-1 flex h-full items-end">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmit((data) => handleSubmitForm(data))}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700"
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
