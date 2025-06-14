"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Procedure } from "./api/procedures/route";
import { RoutineCard } from "@/components/RoutineCard";
import { useFilterStore } from "./stores/FilterStore";
import NewRoutineModal from "@/components/Modal/NewRoutineModal";

export default function Home() {
  const [procedures, setProcedures] = useState<Procedure[] | null>(null);
  const { searchTerm, setSearchTerm } = useFilterStore();
  const [hasSearched, setHasSearched] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchProcedures();
  }, []);

  const fetchProcedures = async () => {
    try {
      const response = await fetch("/api/procedures");
      const data = await response.json();
      setProcedures(data);
    } catch (error) {
      console.log("Erro ao buscar procedimentos:", error);
    }
  };

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleAddRoutine = async (data: Procedure) => {
    try {
      const response = await fetch("/api/procedures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newProcedure = await response.json();
        setProcedures((prev) =>
          prev ? [newProcedure, ...prev] : [newProcedure]
        );
        setModalOpen(false);
      } else {
        console.error("Erro ao registrar procedimento");
      }
    } catch (error) {
      console.error("Erro ao enviar procedimento:", error);
    }
  };

  const filteredProcedures = hasSearched
    ? procedures?.filter((proc) => {
        const term = searchTerm.toLowerCase();
        return (
          proc.title.toLowerCase().includes(term) ||
          proc.solution.toLowerCase().includes(term) ||
          proc.compounds.some((c) => c.toLowerCase().includes(term)) ||
          proc.observation?.toLowerCase().includes(term) ||
          proc.note?.toLowerCase().includes(term)
        );
      })
    : procedures;

  return (
    <main className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between bg-white mb-6">
          <h1 className="text-[28px] font-semibold text-[#414552]">
            Gestão de rotinas de laboratório
          </h1>
          <NewRoutineModal />
        </div>

        <div className="bg-white z-[10] flex items-center space-x-4 mb-6 border-b-[1px] border-[#E4E4E4] py-[10px] sticky top-[59px] px-[20px]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#414552] w-4 h-4" />
            <Input
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por título, solução, compostos..."
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-purple-600 hover:bg-purple-700 text-white text-[14px]"
          >
            Buscar
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 bg-[#0A2540] text-[#fff]"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtragem Avançada
          </Button>
        </div>

        <div className="w-full flex gap-[10px] flex-col z-[5] px-[2px]">
          {filteredProcedures?.length ? (
            filteredProcedures.map((item, index) => (
              <RoutineCard
                key={index}
                {...item}
                indice={index}
                searchTerm={searchTerm}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center mt-6">
              Nenhum procedimento encontrado.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
