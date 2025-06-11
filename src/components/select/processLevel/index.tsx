import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProcessLevel() {
  return (
    <div className="flex w-full flex-col gap-0.5">
      <Label className="text-xs">Nível de Processo</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Nível de Processo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TST">Teste</SelectItem>
          <SelectItem value="PA">PA</SelectItem>
          <SelectItem value="SMT">SMT</SelectItem>
          <SelectItem value="PTH">PTH</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
