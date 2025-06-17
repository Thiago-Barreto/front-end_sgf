import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, useFormContext } from "react-hook-form";

interface CalibrationRadioProps {
  name: string;
}

export default function CalibrationRadio({
  name,
}: Readonly<CalibrationRadioProps>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-0.5">
          <Label className="text-xs">Requer Calibração ?</Label>
          <RadioGroup
            defaultValue="NÃO"
            className="flex items-center rounded-md border px-2 py-2.5 shadow"
            {...field}
            onValueChange={field.onChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="SIM" id="sim" />
              <Label htmlFor="sim" className="text-xs">
                Sim
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="NÃO" id="nao" />
              <Label htmlFor="nao" className="text-xs">
                Não
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}
    />
  );
}
