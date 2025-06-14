import { create } from "zustand";
import { Routine } from "../api/routines/route";

interface RoutineState {
  routines: Routine[];
  addRoutine: (routine: Routine) => void;
  clearRoutines: () => void;
}

export const useRoutineStore = create<RoutineState>((set) => ({
  routines: [],
  addRoutine: (routine) =>
    set((state) => ({ routines: [...state.routines, routine] })),
  clearRoutines: () => set({ routines: [] }),
}));
