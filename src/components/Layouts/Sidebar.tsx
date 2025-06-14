"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            <div className="flex items-center justify-between mb-6 md:hidden">
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <Image
                src="https://i.pravatar.cc/40"
                alt="Avatar"
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="font-medium text-sm text-[#414552]">
                Marcelo Cavalcante
              </span>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href="/"
                className="flex items-center gap-3 text-[#414552] hover:text-black px-2 py-2 rounded-md font-[500]"
              >
                <Image
                  src="/icones/home.svg"
                  width={15}
                  height={15}
                  alt="icon"
                />
                Página Inicial
              </Link>
              <Link
                href="/clientes"
                className="flex items-center gap-3 text-[#414552] hover:text-black px-2 py-2 rounded-md font-[500]"
              >
                <Image
                  src="/icones/client.png"
                  width={15}
                  height={15}
                  alt="icon"
                />
                Clientes
              </Link>
              <Link
                href="/agenda"
                className="flex items-center gap-3 text-[#414552] hover:text-black px-2 py-2 rounded-md font-[500]"
              >
                <Image
                  src="/icones/calendar.png"
                  width={16}
                  height={16}
                  alt="icon"
                />
                Agenda
              </Link>
              <Link
                href="/financeiro"
                className="flex items-center gap-3 text-gray-700 hover:text-black px-2 py-2 rounded-md font-[500]"
              >
                <Image
                  src="/icones/finance.svg"
                  width={16}
                  height={16}
                  alt="icon"
                />
                Financeiro
              </Link>

              <div className="mt-6 mb-1 ml-2 text-gray-600 flex items-center text-sm gap-2 font-[500]">
                <Image
                  src="/icones/edit.png"
                  width={16}
                  height={16}
                  alt="icon"
                />
                Cadastros
              </div>
              <Link
                href="/cadastros/rotinas"
                className="pl-8 text-purple-600 hover:text-purple-700 text-sm font-[500]"
              >
                Rotinas
              </Link>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
