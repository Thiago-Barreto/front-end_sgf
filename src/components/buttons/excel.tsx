import { FileSpreadsheet } from "lucide-react";
import React from "react";
import * as XLSX from "xlsx";
import { Button } from "../ui/button";

interface ExcelProps {
  data: any[];
  fileName: string;
}

export const ExcelExport: React.FC<ExcelProps> = ({ data, fileName }) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <Button
      onClick={exportToExcel}
      className="flex cursor-pointer gap-1 rounded-md bg-green-600 text-stone-100 transition-all duration-300 hover:bg-green-600"
    >
      <FileSpreadsheet size={16} />
      Exportar para Excel
    </Button>
  );
};
