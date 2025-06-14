"use client";

import type React from "react";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Procedure } from "@/app/api/procedures/route";

export default function NewRoutineModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Procedure>({
    time: "",
    title: "",
    solution: "",
    compounds: [""],
    observation: "",
    catalyst: "",
    note: "",
    measurements: {
      CHO: "",
      PTN: "",
      LIP: "",
      mAU: "",
    },
  });

  const handleInputChange = (field: keyof Procedure, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMeasurementChange = (
    field: keyof Procedure["measurements"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [field]: value,
      },
    }));
  };

  const handleCompoundChange = (index: number, value: string) => {
    const newCompounds = [...formData.compounds];
    newCompounds[index] = value;
    setFormData((prev) => ({
      ...prev,
      compounds: newCompounds,
    }));
  };

  const addCompound = () => {
    setFormData((prev) => ({
      ...prev,
      compounds: [...prev.compounds, ""],
    }));
  };

  const removeCompound = (index: number) => {
    if (formData.compounds.length > 1) {
      const newCompounds = formData.compounds.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        compounds: newCompounds,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Procedure Data:", formData);
    setOpen(false);

    setFormData({
      time: "",
      title: "",
      solution: "",
      compounds: [""],
      observation: "",
      catalyst: "",
      note: "",
      measurements: {
        CHO: "",
        PTN: "",
        LIP: "",
        mAU: "",
      },
    });
  };

  return (
    <div className="flex items-center justify-center  bg-gray-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#675DFF] hover:bg-purple-700 text-white text-[14px] flex items-center gap-2 font-medium">
            <Plus className="w-4 h-4" color="#fff" />
            Adicionar Rotina{" "}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registro de Procedimento</DialogTitle>
            <DialogDescription>
              Preencha os dados do procedimento médico/farmacêutico
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título do Procedimento</Label>
                <Input
                  id="title"
                  placeholder="Ex: Procedimento Matinal"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution">Solução</Label>
              <Input
                id="solution"
                placeholder="Ex: Solução A – 5 mL"
                value={formData.solution}
                onChange={(e) => handleInputChange("solution", e.target.value)}
                required
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Compostos
                  <Button
                    type="button"
                    onClick={addCompound}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.compounds.map((compound, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Ex: Composto D ou C – 250 mg"
                      value={compound}
                      onChange={(e) =>
                        handleCompoundChange(index, e.target.value)
                      }
                      required
                    />
                    {formData.compounds.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeCompound(index)}
                        size="sm"
                        variant="outline"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="observation">Observação</Label>
              <Textarea
                id="observation"
                placeholder="Ex: Misturar em recipiente estéril"
                value={formData.observation}
                onChange={(e) =>
                  handleInputChange("observation", e.target.value)
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="catalyst">Catalisador</Label>
              <Input
                id="catalyst"
                placeholder="Ex: Catalisador (CAPTURE) – 5 mg"
                value={formData.catalyst}
                onChange={(e) => handleInputChange("catalyst", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Nota</Label>
              <Textarea
                id="note"
                placeholder="Ex: Observação: Executar em fluxo laminar"
                value={formData.note}
                onChange={(e) => handleInputChange("note", e.target.value)}
                rows={2}
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Medições</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cho">CHO</Label>
                    <Input
                      id="cho"
                      placeholder="Ex: 26g"
                      value={formData.measurements.CHO}
                      onChange={(e) =>
                        handleMeasurementChange("CHO", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ptn">PTN</Label>
                    <Input
                      id="ptn"
                      placeholder="Ex: 25g"
                      value={formData.measurements.PTN}
                      onChange={(e) =>
                        handleMeasurementChange("PTN", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lip">LIP</Label>
                    <Input
                      id="lip"
                      placeholder="Ex: 1.3g"
                      value={formData.measurements.LIP}
                      onChange={(e) =>
                        handleMeasurementChange("LIP", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mau">mAU</Label>
                    <Input
                      id="mau"
                      placeholder="Ex: 215 mAU"
                      value={formData.measurements.mAU}
                      onChange={(e) =>
                        handleMeasurementChange("mAU", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Registrar Procedimento</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
