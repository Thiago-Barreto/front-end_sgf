import type { ModelsData } from "@/interface/private/engineering/product/models";
import { Controller, FormProvider, useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNewModel } from "@/api/private/engineering/product/models";
import {
  ModelFormCreate,
  type ModelsCreate,
} from "@/schema/private/engineering/product/models";
import { zodResolver } from "@hookform/resolvers/zod";

interface FastCreateProps {
  initialData: ModelsData;
}

export default function FastCreate({ initialData }: FastCreateProps) {
  const methods = useForm<ModelsCreate>({
    resolver: zodResolver(ModelFormCreate),
    defaultValues: {
      ...initialData,
      Cod_sap: "",
      Nome: "",
      Descricao: "",
    },
  });
  const { register, handleSubmit, control, setValue, reset } = methods;

  const [open, setOpen] = useState(false);

  const handleWeightAndAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "Qtd_inner" | "Qtd_caixa" | "Peso_master" | "Peso_inner",
  ) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");
    setValue(field, numericValue === "" ? 0 : Number(numericValue), {
      shouldValidate: true,
    });
  };

  const { mutateAsync } = useNewModel();

  const handleNewModel = async (data: ModelsCreate) => {
    await mutateAsync(data);
    setOpen(false);
    reset((data) => ({
      ...data,
      Cod_sap: "",
      Nome: "",
      Descricao: "",
    }));
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">Criar Rápido</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[900px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Criar novo modelo</AlertDialogTitle>
          <AlertDialogDescription>
            Formulário para criar um novo modelo com base no ultimo registro,
            facilitando o preenchimento e envio rápido para a plataforma.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormProvider {...methods}>
          <form className="grid max-w-[900px] grid-cols-3 items-end justify-end gap-4">
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="name">
                Nome <span className="text-red-600">*</span>
              </Label>
              <Input id="name" {...register("Nome")} />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="code_sap">
                Código do SAP <span className="text-red-600">*</span>
              </Label>
              <Input id="code_sap" {...register("Cod_sap")} />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="description">
                Descrição <span className="text-red-600">*</span>
              </Label>
              <Input id="description" {...register("Descricao")} />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="qtd_inner">
                Qtd de Inner <span className="text-red-600">*</span>
              </Label>
              <Input
                id="qtd_inner"
                {...register("Qtd_inner")}
                onChange={(event) => handleWeightAndAmount(event, "Qtd_inner")}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="qtd_box">
                Qtd na Caixa <span className="text-red-600">*</span>
              </Label>
              <Input
                id="qtd_box"
                {...register("Qtd_caixa")}
                onChange={(event) => handleWeightAndAmount(event, "Qtd_caixa")}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="peso_master">
                Peso da Master <span className="text-red-600">*</span>
              </Label>
              <Input
                id="peso_master"
                {...register("Peso_master")}
                onChange={(event) =>
                  handleWeightAndAmount(event, "Peso_master")
                }
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="peso_inner">
                Peso da Inner <span className="text-red-600">*</span>
              </Label>
              <Input
                id="peso_inner"
                {...register("Peso_inner")}
                onChange={(event) => handleWeightAndAmount(event, "Peso_inner")}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="ean">
                Ean <span className="text-red-600">*</span>
              </Label>
              <Input id="ean" {...register("Ean")} />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">
                Nível de Processo <span className="text-red-600">*</span>
              </Label>
              <Controller
                control={control}
                name="ProcessLevel"
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um processo" />
                    </SelectTrigger>
                    <SelectGroup>
                      <SelectContent>
                        <SelectLabel>Nível de Processo</SelectLabel>
                        <SelectItem value="SMT">SMT</SelectItem>
                        <SelectItem value="PTH">PTH</SelectItem>
                        <SelectItem value="TST">Teste</SelectItem>
                        <SelectItem value="PA">PA</SelectItem>
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs" htmlFor="family">
                Família <span className="text-red-600">*</span>
              </Label>
              <Input id="family" {...register("FamilyType")} />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">
                Tipo de Aux. da PCBA <span className="text-red-600">*</span>
              </Label>
              <Controller
                control={control}
                name="auxPcbaType"
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
                        <SelectLabel>Tipo da PCBA</SelectLabel>
                        <SelectItem value="EXTERNAL">EXTERNAL</SelectItem>
                        <SelectItem value="INTEGRATED">INTEGRATED</SelectItem>
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                )}
              />
            </div>
            <AlertDialogFooter className="">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit((data) => handleNewModel(data))}
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
