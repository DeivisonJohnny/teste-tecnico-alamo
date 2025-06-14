import { Badge } from "@/components/ui/badge";
import { Inbox, Info, Settings } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0  bg-white border-b border-gray-200 px-6 py-4 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600  font-semibold tracking-[0.4px] ">
          <span>Cadastros</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-[#675DFF]  font-semibold  ">Álamo</span>
          <Badge
            variant="secondary"
            className=" font-bold text-purple-100 bg-[#675DFF] py-1 px-2"
          >
            <Image src={"/icones/list.png"} width={15} height={15} alt="icon" />
            Tarefas
          </Badge>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full">
              <Inbox color="#3A52EE" />
            </div>

            <div className="w-6 h-6  rounded-full">
              <Info color="#675DFF" />
            </div>
            <div className="w-6 h-6  rounded-full">
              <Settings color="#675DFF" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
