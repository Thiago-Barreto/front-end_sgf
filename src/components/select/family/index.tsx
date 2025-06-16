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
import { useFamilyAll } from "@/api/public/family";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import type { FamilyData } from "@/interface/public/family";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

interface FamilyComboBoxProps {
  name: string;
}

export default function FamilyComboBox({
  name,
}: Readonly<FamilyComboBoxProps>) {
  const [open, setOpen] = useState(false);
  const { data: family = [] } = useFamilyAll();
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-0.5">
      <Label className="text-xs" htmlFor={name}>
        Família <span className="text-red-600">*</span>
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
                    ? family.find(
                        (data: FamilyData) => data.FamilyType === value,
                      )?.FamilyType
                    : "Selecionar família..."}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="h-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Buscar família..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma família encontrada.</CommandEmpty>
                    <CommandGroup>
                      {family.map((data: FamilyData) => (
                        <CommandItem
                          key={data.FamilyType}
                          value={data.FamilyType}
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
                              value === data.FamilyType
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {data.FamilyType}
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
