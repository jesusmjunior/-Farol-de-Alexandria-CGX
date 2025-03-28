import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function FarolDeAlexandria() {
  const [numeroProcesso, setNumeroProcesso] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const consultar = async () => {
    setLoading(true);
    const response = await fetch("https://SEU_ENDPOINT/consulta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic Q0dYOkNHWA=="
      },
      body: JSON.stringify({ numeroProcesso })
    });

    const data = await response.json();
    setResultado(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center gap-2 mb-4"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="Robozinho"
          className="w-12 h-12"
        />
        <h1 className="text-3xl font-bold text-yellow-400">
          Farol de Alexandria <span className="text-red-700">CGX</span>
        </h1>
      </motion.div>
      <Card className="bg-yellow-400/10 border-red-700 text-white max-w-md w-full p-4">
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="Número do Processo"
            value={numeroProcesso}
            onChange={(e) => setNumeroProcesso(e.target.value)}
            className="bg-black/70 border-yellow-400 text-white"
          />
          <Button
            className="bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={consultar}
            disabled={loading}
          >
            {loading ? "Consultando..." : "Consultar CNJ"}
          </Button>
          {resultado && (
            <div className="bg-black/50 p-2 rounded-xl text-sm">
              <pre>{JSON.stringify(resultado, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
      <motion.div
        animate={{ x: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-8 flex items-center gap-2"
      >
        <ShieldCheck className="text-yellow-400" />
        <p className="text-xs text-yellow-400">JJ I.A - Protegido por CGX</p>
      </motion.div>
    </div>
  );
}
