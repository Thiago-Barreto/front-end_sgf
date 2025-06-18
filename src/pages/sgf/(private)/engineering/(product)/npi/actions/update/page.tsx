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
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import type { NpiData } from "@/interface/dashboard/npi";
import {
  NpiWithoutStatus,
  type UpdateProgrammingNpi,
} from "@/schema/private/engineering/product/npi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import { useModelsAll } from "@/api/private/engineering/product/models";
import type { ModelsData } from "@/interface/private/engineering/product/models";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon, CheckIcon, Loader } from "lucide-react";
import { toast } from "sonner";
import { useUpdateProgrammingNpi } from "@/api/private/engineering/product/npi";

interface ProgrammingNpiUpdateProps {
  initialData: NpiData;
}

export default function ProgrammingNpiUpdate({
  initialData,
}: ProgrammingNpiUpdateProps) {
  const methods = useForm<UpdateProgrammingNpi>({
    resolver: zodResolver(NpiWithoutStatus),
    defaultValues: {
      ...initialData,
      estimated_engineering_pilot_date:
        initialData.estimated_engineering_pilot_date
          ? new Date(initialData.estimated_engineering_pilot_date)
              .toISOString()
              .split("T")[0]
          : "",
      estimated_pilot_production_date:
        initialData.estimated_pilot_production_date
          ? new Date(initialData.estimated_pilot_production_date)
              .toISOString()
              .split("T")[0]
          : "",
    },
  });
  const { register, handleSubmit, setValue, control, watch } = methods;

  const [open, setOpen] = useState(false);

  const { data: models = [] } = useModelsAll();

  const selectModel = watch("code");

  const selectStatusEng = watch("engineering_pilot_status");
  const selectStatusProd = watch("production_pilot_status");

  const filterModels = useMemo(() => {
    return models.filter((data: ModelsData) => {
      return selectModel === data.Cod_sap;
    });
  }, [selectModel, models]);

  setValue("family", filterModels[0]?.FamilyType);
  setValue("description", filterModels[0]?.Descricao);

  const { mutateAsync, isPending } = useUpdateProgrammingNpi();
  const handleUpdate = async (data: UpdateProgrammingNpi) => {
    if (
      (selectStatusEng === "Atrasado" && !data.justification_engineering) ||
      (selectStatusProd === "Atrasado" && !data.justification_production)
    ) {
      toast.info("Piloto Atrasado", {
        description: "Por favor, justique o atraso.",
      });
    } else {
      console.log(data);
      await mutateAsync({ data });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Atualizar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[900px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Atualizar programação de NPI</AlertDialogTitle>
          <AlertDialogDescription>
            Mantenha os dados do NPI atualizados diariamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormProvider {...methods}>
          <form className="grid grid-cols-3 items-end justify-end gap-x-4 gap-y-8">
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="sku"
              >
                SKb
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button className="justify-between border bg-transparent font-normal text-stone-500 hover:bg-transparent">
                    {selectModel
                      ? models.find(
                          (model: ModelsData) => model.Cod_sap === selectModel,
                        )?.Cod_sap
                      : "Selecione um Modelo"}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Procurar Modelo" />
                    <CommandList>
                      <CommandGroup>
                        {models.map((model: ModelsData) => (
                          <CommandItem
                            key={model.ID}
                            value={model.Cod_sap}
                            onSelect={(currentValue) => {
                              setValue(
                                "code",
                                currentValue === selectModel
                                  ? ""
                                  : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectModel === model.Cod_sap
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {model.Cod_sap}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="family"
              >
                Famílib
              </Label>
              <Input
                {...register("family")}
                placeholder="Família"
                id="family"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="description"
              >
                Descriçãb
              </Label>
              <Input
                {...register("description")}
                placeholder="Descrição"
                id="description"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs after:text-red-600 after:content-['*']">
                Tipo de Embalageb
              </Label>
              <Controller
                control={control}
                name="type_of_shipment"
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectGroup>
                      <SelectContent>
                        <SelectLabel>Tipo de Embalagem</SelectLabel>
                        <SelectItem value="CKD">CKD</SelectItem>
                        <SelectItem value="DKD">DKD</SelectItem>
                        <SelectItem value="SKD">SKD</SelectItem>
                        <SelectItem value="TRANSFORMAÇÃO">
                          TRANSFORMAÇÃO
                        </SelectItem>
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs after:text-red-600 after:content-['*']">
                Tipo de Produçãb
              </Label>
              <Controller
                control={control}
                name="type_of_production"
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectGroup>
                      <SelectContent>
                        <SelectLabel>Tipo de Produção</SelectLabel>
                        <SelectItem value="PRODUTO CORRENTE">
                          PRODUTO CORRENTE
                        </SelectItem>
                        <SelectItem value="PRODUTO NOVO">
                          PRODUTO NOVO
                        </SelectItem>
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs after:text-red-600 after:content-['*']">
                Classe de Produtb
              </Label>
              <Controller
                control={control}
                name="product_class"
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um nível" />
                    </SelectTrigger>
                    <SelectGroup>
                      <SelectContent>
                        <SelectLabel>Classe de Produto</SelectLabel>
                        <SelectItem value="NÍVEL 1">NÍVEL 1</SelectItem>
                        <SelectItem value="NÍVEL 2">NÍVEL 2</SelectItem>
                        <SelectItem value="NÍVEL 3">NÍVEL 3</SelectItem>
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="halb"
              >
                Halb
              </Label>
              <Input {...register("halb")} placeholder="Halb" id="halb" />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="lote"
              >
                Lote MP
              </Label>
              <Input
                {...register("lote_and_fixture")}
                placeholder="Lote MP"
                id="lote"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="mp"
              >
                Previsão de chegada MP e Fixture b
              </Label>
              <Input
                {...register("arrival_of_mp_and_fixture")}
                placeholder="Lote MP"
                id="mp"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="pilot_eng"
              >
                Piloto de Eng.
              </Label>
              <Input
                type="date"
                {...register("estimated_engineering_pilot_date")}
                id="pilot_eng"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className="text-xs after:text-red-600 after:content-['*']"
                htmlFor="pilot_eng"
              >
                Piloto de Prod.
              </Label>
              <Input
                type="date"
                {...register("estimated_pilot_production_date")}
                id="pilot_eng"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">Status Piloto Eng.</Label>
              <Controller
                control={control}
                name="engineering_pilot_status"
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectGroup>
                      <SelectContent>
                        <SelectLabel>Status de Piloto</SelectLabel>
                        <SelectItem value="Em Processo">Em Processo</SelectItem>
                        <SelectItem value="Atrasado">Atrasado</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                className={cn(
                  "text-xs",
                  selectStatusEng === "Atrasado"
                    ? "after:text-red-600 after:content-['*']"
                    : "",
                )}
                htmlFor="justification_engineering"
              >
                Justificativa de Eng.
              </Label>
              <Input
                type="text"
                {...register("justification_engineering")}
                id="justification_engineering"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">Status Piloto Prod.</Label>
              <Controller
                control={control}
                name="production_pilot_status"
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectGroup>
                      <SelectContent>
                        <SelectLabel>Status de Piloto</SelectLabel>
                        <SelectItem value="Em Processo">Em Processo</SelectItem>
                        <SelectItem value="Atrasado">Atrasado</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label
                htmlFor="justification_production"
                className={cn(
                  "text-xs",
                  selectStatusProd === "Atrasado"
                    ? "after:text-red-600 after:content-['*']"
                    : "",
                )}
              >
                Justificativa de Prod.
              </Label>
              <Input
                type="text"
                {...register("justification_production")}
                id="justification_production"
              />
            </div>
            <AlertDialogFooter className="col-span-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="w-36 cursor-pointer bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit((data) => handleUpdate(data))}
                disabled={isPending}
              >
                {isPending ? (
                  <p className="flex items-center gap-1">
                    Atualizando Programação{" "}
                    <Loader size={12} className="animate-spin" />
                  </p>
                ) : (
                  <p>Atualizar</p>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}
