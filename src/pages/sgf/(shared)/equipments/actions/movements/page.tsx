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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MovementSchema, type MovementsType } from "@/schema/shared/equipments";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMovementExitEquipment } from "@/api/shared/equipment";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { TypeToNumber } from "@/utils/formatted/type/number";
import { useState } from "react";
import type { EquipmentData } from "@/interface/shared/equipments";

interface ExitMovementsProps {
  initialData: EquipmentData;
}

export default function ExitMovements({
  initialData,
}: Readonly<ExitMovementsProps>) {
  const methods = useForm<MovementsType>({
    resolver: zodResolver(MovementSchema),
    defaultValues: {
      ...initialData,
      line: "",
      user_return: "",
      details: "",
    },
  });
  const { register, handleSubmit, control, watch, setValue } = methods;
  const [open, setOpen] = useState(false);

  const shedOrLine = watch("shedOrLine");

  const { mutateAsync, isPending } = useMovementExitEquipment();

  const handleMovement = async (data: MovementsType) => {
    const isFormIncomplete =
      (shedOrLine === "shed" &&
        (!data.user_return || !data.details || data.shed === "")) ||
      (shedOrLine === "line" && !data.line);
    if (isFormIncomplete) {
      toast.info("Formulário incompleto", {
        description:
          "Por favor, verifique se todos os campos foram preenchidos antes de enviar novamente.",
      });
      return;
    }

    let cleanedData = { ...data };
    if (shedOrLine === "line") {
      cleanedData = {
        ...cleanedData,
        user_return: "",
        details: "",
      };
    } else if (shedOrLine === "shed") {
      cleanedData = {
        ...cleanedData,
        line: "",
      };
    }

    await mutateAsync(cleanedData);

    setValue("shed", "");
    setValue("line", "");
    setValue("shedOrLine", "");
    setValue("user_return", "");
    setValue("details", "");
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer bg-violet-800 hover:bg-violet-900">
          Saída
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Fazer movimentação de equipamento</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormProvider {...methods}>
          <form className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs after:text-red-600 after:content-['*']">
                Galpão ou linha ?
              </Label>
              <Controller
                control={control}
                name="shedOrLine"
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione uma ação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Para onde vai ?</SelectLabel>
                        <SelectItem value="shed">Galpão</SelectItem>
                        <SelectItem value="line">Linha</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <Label className="text-xs" htmlFor="serial">
                  Serial
                </Label>
                <Input
                  {...register("serial")}
                  className="w-40"
                  id="serial"
                  readOnly
                />
              </div>
              <div className="flex w-full flex-col gap-0.5">
                <Label className="text-xs" htmlFor="description">
                  Descrição
                </Label>
                <Input
                  {...register("description")}
                  className="w-full"
                  id="description"
                  readOnly
                />
              </div>
            </div>
            <Separator />
            {shedOrLine === "shed" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs after:text-red-600 after:content-['*']">
                    Quem está recebendo
                  </Label>
                  <Input
                    placeholder="Número de Matrícula"
                    {...register("user_return")}
                    onChange={(event) =>
                      TypeToNumber(event, setValue, "user_return")
                    }
                  />
                </div>
                <div>
                  <Label className="text-xs after:text-red-600 after:content-['*']">
                    Galpão
                  </Label>
                  <Input
                    placeholder="Número de Matrícula"
                    {...register("shed")}
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs after:text-red-600 after:content-['*']">
                    Detalhes da movimentação
                  </Label>
                  <Textarea className="resize-none" {...register("details")} />
                </div>
              </div>
            )}
            {shedOrLine === "line" && (
              <div>
                <div className="flex flex-col gap-0.5">
                  <Label className="text-xs after:text-red-600 after:content-['*']">
                    Linha
                  </Label>
                  <Input {...register("line")} />
                </div>
              </div>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleSubmit((data) => handleMovement(data))}
                disabled={isPending}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}
