import { Routine } from "@/app/api/routines/route";
import { Card, CardContent } from "./ui/card";

interface RoutineCardProps extends Routine {
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
  ...dataRoutine
}: RoutineCardProps) {
  const bgColor = indice % 2 === 0 ? "bg-white" : "bg-[#f5f6f8]";

  return (
    <Card className={`border border-gray-200 py-0 h-fit ${bgColor}`}>
      <CardContent className="p-6 py-[15px] h-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-col ">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {highlight(
                `${dataRoutine.time} - ${dataRoutine.title}`,
                searchTerm
              )}
            </h3>

            <div className="flex flex-col gap-2 text-sm text-[#414552] ml-4 font-medium">
              <p>{highlight(dataRoutine.solution, searchTerm)}</p>

              {dataRoutine.compounds.map((compound, idx) => (
                <p key={idx}>{highlight(compound, searchTerm)}</p>
              ))}

              {dataRoutine.observation && (
                <p>
                  {highlight(
                    `Observação: ${dataRoutine.observation}`,
                    searchTerm
                  )}
                </p>
              )}
              {dataRoutine.catalyst && (
                <p className="ml-4">{dataRoutine.catalyst}</p>
              )}
              {dataRoutine.stabilizer && (
                <p className="ml-4">{dataRoutine.stabilizer}</p>
              )}
              {dataRoutine.control && (
                <p className="ml-4">{dataRoutine.control}</p>
              )}
              {dataRoutine.note && (
                <p className="text-[#898383] text-[12px]">
                  {highlight(dataRoutine.note, searchTerm)}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[25px] text-sm">
            <div className="text-gray-600">
              CHO: {dataRoutine.measurements.CHO}
            </div>
            <div className="text-gray-600">
              PTN: {dataRoutine.measurements.PTN}
            </div>
            <div className="text-gray-600">
              LIP: {dataRoutine.measurements.LIP}
            </div>
            <div className="text-purple-600 font-medium">
              {dataRoutine.measurements.mAU}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
