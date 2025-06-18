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
import type { EquipmentData } from "@/interface/private/engineering/test";
import {
  EquipmentUpdateForm,
  type EquipmentUpdateType,
} from "@/schema/shared/equipments";
import { useEquipmentUpdate } from "@/api/shared/equipment";

interface EquipmentUpdateProps {
  initialData: EquipmentData;
}

export default function EquipmentUpdate({ initialData }: EquipmentUpdateProps) {
  const methods = useForm<EquipmentUpdateType>({
    resolver: zodResolver(EquipmentUpdateForm),
    defaultValues: {
      ...initialData,
    },
  });

  const { register, handleSubmit } = methods;
  const { mutateAsync, isPending } = useEquipmentUpdate();

  const handleUpdate = async (data: EquipmentUpdateType) => {
    await mutateAsync({ data });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
          Atualizar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[900px]">
        <AlertDialogHeader className="flex items-center justify-center">
          <AlertDialogTitle>Atualizar Equipamento</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center gap-1 rounded bg-stone-200 p-1 text-xs text-yellow-500">
            <Info size={14} />
            Mantenha os dados do equipamento sempre atualizados.
            <Info size={14} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormProvider {...methods}>
          <form className="grid w-full grid-cols-3 items-center gap-3">
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
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="description"
              >
                Descrição
              </Label>
              <Input {...register("description")} id="description" />
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
              <Label htmlFor="calibrationCertificate">
                Certificado de Calib.
              </Label>
              <Input
                {...register("calibrationCertificate")}
                id="calibrationCertificate"
              />
            </div>
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
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="nextCalibration">Proxima Calibração</Label>
              <Input {...register("nextCalibration")} id="nextCalibration" />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="status">Status</Label>
              <Input {...register("status")} id="status" />
            </div>
            <AlertDialogFooter className="col-span-2 flex h-full items-end justify-end">
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmit((data) => handleUpdate(data))}
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
