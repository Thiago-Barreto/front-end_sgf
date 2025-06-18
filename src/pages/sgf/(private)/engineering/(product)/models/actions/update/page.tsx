import { useModelUpdate } from "@/api/private/engineering/product/models";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ModelsUpdateForm,
  type ModelsTypeUpdate,
} from "@/schema/private/engineering/product/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

interface ModelsUpdateProps {
  initialData: ModelsTypeUpdate;
}

export default function ModelsUpdate({ initialData }: ModelsUpdateProps) {
  const { mutateAsync, isPending } = useModelUpdate();
  const methods = useForm<ModelsTypeUpdate>({
    resolver: zodResolver(ModelsUpdateForm),
    defaultValues: initialData,
  });
  const { register, handleSubmit, control, setValue } = methods;
  const [open, setOpen] = useState(false);

  const handleWeightAndAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, "");
    setValue(field, numericValue, { shouldValidate: true });
  };

  const handleUpdate = async (data: ModelsTypeUpdate) => {
    await mutateAsync({ data });
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
          Atualizar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[900px]">
        <AlertDialogHeader className="flex flex-col items-center justify-center">
          <AlertDialogTitle>Atualizar "{initialData.Cod_sap}"</AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-yellow-500">
            Preencha todos os campos e mantenha os dados sempre atualizados
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
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs">
                Status <span className="text-red-600">*</span>
              </Label>
              <Controller
                control={control}
                name="Status"
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
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="ATIVO">ATIVO</SelectItem>
                        <SelectItem value="DESATIVADO">DESATIVADO</SelectItem>
                      </SelectContent>
                    </SelectGroup>
                  </Select>
                )}
              />
            </div>
            <AlertDialogFooter className="col-span-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit((data) => handleUpdate(data))}
                disabled={isPending}
              >
                {isPending ? (
                  <p className="flex items-center gap-1">
                    Atualizando{" "}
                    <LoaderCircle size={10} className="animate-spin" />
                  </p>
                ) : (
                  "Atualizar"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}
