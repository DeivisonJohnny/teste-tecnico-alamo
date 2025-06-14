import { create } from "zustand";

interface FilterStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
