import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useModelsAll } from "@/api/private/engineering/product/models";
import type { ModelsData } from "@/interface/private/engineering/product/models";

export function ExampleCombobox() {
  const { data: models = [] } = useModelsAll();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="justify-between border bg-transparent font-normal text-stone-500 hover:bg-transparent">
          {value
            ? models.find(
                (framework: ModelsData) => framework.Cod_sap === value,
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
              {models.map((framework: ModelsData) => (
                <CommandItem
                  key={framework.ID}
                  value={framework.Cod_sap}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.Cod_sap ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.Cod_sap}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
