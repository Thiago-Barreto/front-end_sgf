import { useNewProgrammingNpi } from "@/api/private/engineering/product/npi";
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
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NpiWithoutId,
  type NewProgrammingNpiType,
} from "@/schema/private/engineering/product/npi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModelsAll } from "@/api/private/engineering/product/models";
import { useMemo, useState } from "react";
import type { ModelsData } from "@/interface/private/engineering/product/models";

export default function NewNpi() {
  const methods = useForm<NewProgrammingNpiType>({
    resolver: zodResolver(NpiWithoutId),
  });
  const { mutateAsync, isPending } = useNewProgrammingNpi();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, watch, setValue } = methods;
  const { data: models = [] } = useModelsAll();
  const selectModel = watch("code");
  const filterModels = useMemo(() => {
    return models.filter((data) => {
      return selectModel === data.Cod_sap;
    });
  }, [selectModel, models]);
  setValue("family", filterModels[0]?.FamilyType);
  setValue("description", filterModels[0]?.Descricao);
  const handleCreate = async (data: NewProgrammingNpiType) => {
    console.log(data);
    await mutateAsync(data);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
          Programar NPI
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[900px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Programar NPI</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha o formulário com os dados da nova programação
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormProvider {...methods}>
          <form className="grid grid-cols-3 items-end justify-end gap-x-4 gap-y-8">
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="sku">
                SKU <span className="text-red-600">*</span>
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
              <Label className="text-xs" htmlFor="family">
                Família <span className="text-red-600">*</span>
              </Label>
              <Input
                {...register("family")}
                placeholder="Família"
                id="family"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="description">
                Descrição <span className="text-red-600">*</span>
              </Label>
              <Input
                {...register("description")}
                placeholder="Descrição"
                id="description"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">
                Tipo de Embalagem <span className="text-red-600">*</span>
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
              <Label className="text-xs">
                Tipo de Produção <span className="text-red-600">*</span>
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
              <Label className="text-xs">
                Classe de Produto <span className="text-red-600">*</span>
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
              <Label className="text-xs" htmlFor="halb">
                Halb <span className="text-red-600">*</span>
              </Label>
              <Input {...register("halb")} placeholder="Halb" id="halb" />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="lote">
                Lote MP <span className="text-red-600">*</span>
              </Label>
              <Input
                {...register("lote_and_fixture")}
                placeholder="Lote MP"
                id="lote"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="mp">
                Previsão de chegada MP e Fixture{" "}
                <span className="text-red-600">*</span>
              </Label>
              <Input
                {...register("arrival_of_mp_and_fixture")}
                placeholder="Lote MP"
                id="mp"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="pilot_eng">
                Piloto de Eng.
              </Label>
              <Input
                type="date"
                {...register("estimated_engineering_pilot_date")}
                id="pilot_eng"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="pilot_eng">
                Piloto de Prod.
              </Label>
              <Input
                type="date"
                {...register("estimated_pilot_production_date")}
                id="pilot_eng"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="w-36 cursor-pointer bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit((data) => handleCreate(data))}
              >
                Programar
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}
