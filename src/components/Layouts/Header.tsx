"use client";

import { Badge } from "@/components/ui/badge";
import { Inbox, Info, Settings, Menu } from "lucide-react";
import Image from "next/image";

export default function Header({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  return (
    <header className="sticky top-0 bg-white px-6 py-3 z-20 shadow-sm max-[900px]:py-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600 font-semibold tracking-[0.4px]">
          <button
            onClick={onToggleSidebar}
            className="md:hidden focus:outline-none"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <span className="hidden md:block">Cadastros</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-[#675DFF] font-semibold">Álamo</span>
          <Badge
            variant="secondary"
            className="hidden sm:flex font-bold text-purple-100 bg-[#675DFF] py-1 px-2"
          >
            <Image src={"/icones/list.png"} width={15} height={15} alt="icon" />
            Tarefas
          </Badge>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full">
              <Inbox color="#3A52EE" />
            </div>
            <div className="w-6 h-6 rounded-full">
              <Info color="#675DFF" />
            </div>
            <div className="w-6 h-6 rounded-full">
              <Settings color="#675DFF" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
