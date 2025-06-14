import { Procedure } from "@/app/api/procedures/route";
import { Card, CardContent } from "./ui/card";

interface RoutineCardProps extends Procedure {
  indice: number;
  searchTerm: string;
}

function highlight(text: string, term: string) {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-yellow-200">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function RoutineCard({
  indice,
  searchTerm,
  ...dataProcedure
}: RoutineCardProps) {
  const bgColor = indice % 2 === 0 ? "bg-white" : "bg-[#f5f6f8]";

  return (
    <Card className={`border border-gray-200 py-0 h-fit ${bgColor}`}>
      <CardContent className="p-6 py-[15px] h-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-col ">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {highlight(
                `${dataProcedure.time} - ${dataProcedure.title}`,
                searchTerm
              )}
            </h3>

            <div className="flex flex-col gap-2 text-sm text-[#414552] ml-4 font-medium">
              <p>{highlight(dataProcedure.solution, searchTerm)}</p>

              {dataProcedure.compounds.map((compound, idx) => (
                <p key={idx}>{highlight(compound, searchTerm)}</p>
              ))}

              {dataProcedure.observation && (
                <p>
                  {highlight(
                    `Observação: ${dataProcedure.observation}`,
                    searchTerm
                  )}
                </p>
              )}
              {dataProcedure.catalyst && (
                <p className="ml-4">{dataProcedure.catalyst}</p>
              )}
              {dataProcedure.stabilizer && (
                <p className="ml-4">{dataProcedure.stabilizer}</p>
              )}
              {dataProcedure.control && (
                <p className="ml-4">{dataProcedure.control}</p>
              )}
              {dataProcedure.note && (
                <p className="text-[#898383] text-[12px]">
                  {highlight(dataProcedure.note, searchTerm)}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[25px] text-sm">
            <div className="text-gray-600">
              CHO: {dataProcedure.measurements.CHO}
            </div>
            <div className="text-gray-600">
              PTN: {dataProcedure.measurements.PTN}
            </div>
            <div className="text-gray-600">
              LIP: {dataProcedure.measurements.LIP}
            </div>
            <div className="text-purple-600 font-medium">
              {dataProcedure.measurements.mAU}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
