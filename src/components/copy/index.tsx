import { Button } from "../ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface CopyTextProps {
  text: string;
}

export default function CopyText({ text }: CopyTextProps) {
  const handleCopy = () => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    toast.success(`Texto copiado: ${text}`);
  };
  return (
    <Button
      onClick={handleCopy}
      className="h-4 cursor-pointer bg-transparent shadow-none hover:bg-transparent"
    >
      <Copy className="text-stone-900 dark:text-stone-50" />
    </Button>
  );
}
