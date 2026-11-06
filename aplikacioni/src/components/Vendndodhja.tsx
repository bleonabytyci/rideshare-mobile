
"use client";

import { useState } from "react";

type Gjendja = "idle" | "loading" | "success" | "denied" | "timeout" | "unavailable";

export default function Vendndodhja() {
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [gjendja, setGjendja] = useState<Gjendja>("idle");
  const [mesazhi, setMesazhi] = useState("");
  const [gabimi, setGabimi] = useState("");
  const [saktesia, setSaktesia] = useState<number | null>(null);

  function konfirmoVendtakimin() {
    const iPastruar = teksti.trim();

    if (!iPastruar) {
      setGabimi("Vendtakimi nuk mund të jetë bosh.");
      return;
    }

    setGabimi("");
    setVendtakimi(iPastruar);
    setMesazhi(`Vendtakimi u konfirmua: ${iPastruar}`);
  }

  function perdorVendndodhjen() {
    if (!navigator.geolocation) {
      setGjendja("unavailable");
      setMesazhi(
        "Pajisja ose shfletuesi nuk e mbështet vendndodhjen. Shkruaj vendtakimin manualisht."
      );
      return;
    }

    setGjendja("loading");
    setMesazhi("Po kërkojmë vendndodhjen...");
    setSaktesia(null);

    navigator.geolocation.getCurrentPosition(
      (pozita) => {
        setGjendja("success");
        setMesazhi("Vendndodhja u mor me sukses.");
        setSaktesia(Math.round(pozita.coords.accuracy));
      },
      (gabimi) => {
        if (gabimi.code === 1) {
          setGjendja("denied");
          setMesazhi("Leja u refuzua. Shkruaj vendtakimin manualisht.");
        } else if (gabimi.code === 3) {
          setGjendja("timeout");
          setMesazhi("Kërkesa për vendndodhje mori shumë kohë. Shkruaj vendtakimin manualisht.");
        } else {
          setGjendja("unavailable");
          setMesazhi("Vendndodhja nuk është e disponueshme. Shkruaj vendtakimin manualisht.");
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
      }
    );
  }

  return (
    <section>
      <h2>Pika e nisjes</h2>

      <button
        type="button"
        onClick={perdorVendndodhjen}
        disabled={gjendja === "loading"}
        data-testid="locate-me"
      >
        {gjendja === "loading"
          ? "Po kërkojmë vendndodhjen..."
          : "Përdor vendndodhjen time"}
      </button>

      <p
        role="status"
        data-testid="location-status"
        data-state={gjendja}
      >
        {mesazhi}
      </p>

      <p data-testid="location-accuracy">
        {saktesia !== null ? `Saktësia: ${saktesia} m` : ""}
      </p>

      <label htmlFor="meeting-input">
        Ose shkruaj vendtakimin
      </label>

      <input
        id="meeting-input"
        type="text"
        value={teksti}
        onChange={(e) => setTeksti(e.target.value)}
        placeholder="P.sh. Stacioni i autobusëve"
        data-testid="meeting-input"
      />

      <p role="alert" data-testid="meeting-error">
        {gabimi}
      </p>

      <button
        type="button"
        onClick={konfirmoVendtakimin}
        data-testid="confirm-meeting"
      >
        Konfirmo vendtakimin
      </button>

      <p data-testid="confirmed-meeting">
        {vendtakimi ? `Vendtakimi i konfirmuar: ${vendtakimi}` : ""}
      </p>
    </section>
  );
}
