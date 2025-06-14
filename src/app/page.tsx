"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { RoutineCard } from "@/components/RoutineCard";
import { useFilterStore } from "./stores/FilterStore";
import NewRoutineModal from "@/components/Modal/NewRoutineModal";
import { Routine } from "./api/routines/route";

export default function Home() {
  const [routines, setRoutines] = useState<Routine[] | null>(null);
  const { searchTerm, setSearchTerm } = useFilterStore();
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchRoutines();
  }, []);

  const fetchRoutines = async () => {
    try {
      const response = await fetch("/api/routines");
      const data = await response.json();
      setRoutines(data);
    } catch (error) {
      console.log("Erro ao buscar procedimentos:", error);
    }
  };

  const handleSearch = () => {
    setHasSearched(true);
  };

  const filteredRoutines = hasSearched
    ? routines?.filter((proc) => {
        const term = searchTerm.toLowerCase();
        return (
          proc.title.toLowerCase().includes(term) ||
          proc.solution.toLowerCase().includes(term) ||
          proc.compounds.some((c) => c.toLowerCase().includes(term)) ||
          proc.observation?.toLowerCase().includes(term) ||
          proc.note?.toLowerCase().includes(term)
        );
      })
    : routines;

  return (
    <main className="flex-1 p-6 w-full max-[900px]:py-6 max-[900px]:px-0 ">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between bg-white mb-6 flex-wrap">
          <h1 className="text-[28px] font-semibold text-[#414552]">
            Gestão de rotinas de laboratório
          </h1>
          <NewRoutineModal />
        </div>

        <div className="bg-[#fff] z-[10] flex items-center space-x-4 mb-6 border-b-[1px] border-[#E4E4E4] py-[15px] sticky top-[-17px] px-[20px] flex-wrap max-[900px]:justify-center   ">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#414552] w-4 h-4" />
            <Input
              className="pl-10 max-[900px]:w-full "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center max-[900px]:mt-1.5 max-[900px]:gap-1  max-[900px]:w-full">
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
        </div>

        <div className="w-full flex gap-[10px] flex-col z-[5] px-[2px]">
          {filteredRoutines?.length ? (
            filteredRoutines.map((item, index) => (
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
