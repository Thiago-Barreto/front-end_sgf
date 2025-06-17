import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import type { ModelsData } from "@/interface/private/engineering/product/models";
import { useModelsAll } from "@/api/private/engineering/product/models";

interface ModelsComboBoxProps {
  name: string;
}

export default function ModelsComboBox({
  name,
}: Readonly<ModelsComboBoxProps>) {
  const [open, setOpen] = useState(false);
  const { data: family = [] } = useModelsAll();
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-0.5">
      <Label className="text-xs" htmlFor={name}>
        Modelo(s) <span className="text-red-600">*</span>
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between font-normal"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  {value
                    ? family.find((data: ModelsData) => data.Cod_sap === value)
                        ?.Cod_sap
                    : "Selecionar modelo..."}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="h-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Buscar modelo..." />
                  <CommandList>
                    <CommandEmpty>Nenhum modelo encontrado.</CommandEmpty>
                    <CommandGroup>
                      {family.map((data: ModelsData) => (
                        <CommandItem
                          key={data.Cod_sap}
                          value={data.Cod_sap}
                          onSelect={(currentValue) => {
                            onChange(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === data.Cod_sap
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {data.Cod_sap}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </>
          )}
        />
      </Popover>
    </div>
  );
}
