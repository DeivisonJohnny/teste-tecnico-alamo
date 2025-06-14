import { NextResponse } from "next/server";

export type Measurement = {
  CHO: string;
  PTN: string;
  LIP: string;
  mAU: string;
};

export type Procedure = {
  time: string;
  title: string;
  solution: string;
  compounds: string[];
  observation?: string;
  catalyst?: string;
  stabilizer?: string;
  control?: string;
  note?: string;
  measurements: Measurement;
};

export async function GET() {
  const procedures = [
    {
      time: "10:00",
      title: "Procedimento Matinal",
      solution: "Solução A – 5 mL",
      compounds: ["Composto D ou C – 250 mg", "Reagente Medicinal – 2 gotas"],
      observation: "Misturar em recipiente estéril",
      catalyst: "Catalisador (CAPTURE) – 5 mg",
      note: "Observação: Executar em fluxo laminar",
      measurements: {
        CHO: "26g",
        PTN: "25g",
        LIP: "1.3g",
        mAU: "215 mAU",
      },
    },
    {
      time: "13:00",
      title: "Procedimento de Meio-dia",
      solution: "Solução B – 10 mL",
      compounds: ["Composto D ou E – 150 mg", "Reagente ChemMix – 3 gotas"],
      stabilizer: "Estabilizante (STABILAB) – 2 mg",
      note: "Observação: Agitar por 3 minutos antes de aplicar",
      measurements: {
        CHO: "26g",
        PTN: "25g",
        LIP: "1.3g",
        mAU: "189 mAU",
      },
    },
    {
      time: "16:30",
      title: "Teste Térmico",
      solution: "Solução Térmica – 7 mL",
      compounds: ["Agente B ou C – 300 mg", "Gotas de Neutralizante – 2 gotas"],
      control: "Controle de Temperatura – 1 unidade",
      measurements: {
        CHO: "26g",
        PTN: "25g",
        LIP: "1.3g",
        mAU: "202 mAU",
      },
    },
  ];

  return NextResponse.json(procedures);
}
