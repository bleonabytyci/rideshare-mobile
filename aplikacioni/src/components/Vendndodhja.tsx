
"use client";

import { useState } from "react";

export default function Vendndodhja() {
  const [mesazhi, setMesazhi] = useState("");
  const [teksti, setTeksti] = useState("");
  const [vendtakimi, setVendtakimi] = useState("");
  const [poKerkohet, setPoKerkohet] = useState(false);

  function konfirmoVendtakimin() {
    const vendtakimiPastruar = teksti.trim();

    if (!vendtakimiPastruar) {
      setMesazhi("Vendtakimi nuk mund të jetë bosh.");
      return;
    }

    setVendtakimi(vendtakimiPastruar);
    setMesazhi(`Vendtakimi u konfirmua: ${vendtakimiPastruar}`);
  }

  function perdorVendndodhjen() {
    if (!navigator.geolocation) {
      setMesazhi("Pajisja ose shfletuesi nuk e mbështet vendndodhjen.");
      return;
    }

    setPoKerkohet(true);
    setMesazhi("Po kërkojmë vendndodhjen...");

    navigator.geolocation.getCurrentPosition(
      (pozita) => {
        setPoKerkohet(false);
        const { latitude, longitude, accuracy } = pozita.coords;

        setMesazhi(
          `Pozicioni u mor. Gjerësia: ${latitude.toFixed(
            4
          )}, Gjatësia: ${longitude.toFixed(4)}, Saktësia: ${Math.round(
            accuracy
          )} m.`
        );
      },
      (gabimi) => {
        setPoKerkohet(false);

        if (gabimi.code === 1) {
          setMesazhi("Leja u refuzua. Shkruaj vendtakimin vetë.");
        } else if (gabimi.code === 2) {
          setMesazhi("Vendndodhja nuk është e disponueshme. Shkruaj vendtakimin vetë.");
        } else if (gabimi.code === 3) {
          setMesazhi("Kërkesa për vendndodhje mbaroi. Provo përsëri ose shkruaj vendtakimin.");
        } else {
          setMesazhi("Kërkesa për vendndodhje dështoi. Shkruaj vendtakimin vetë.");
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
        disabled={poKerkohet}
        data-testid="location-button"
      >
        {poKerkohet ? "Po kërkojmë vendndodhjen..." : "Përdor vendndodhjen time"}
      </button>

      {mesazhi && (
        <p role="status" data-testid="location-status">
          {mesazhi}
        </p>
      )}

      <label htmlFor="vendtakimi">Ose shkruaj vendtakimin</label>

      <input
        id="vendtakimi"
        type="text"
        value={teksti}
        onChange={(e) => setTeksti(e.target.value)}
        placeholder="P.sh. Stacioni i autobuseve"
        data-testid="manual-location-input"
      />

      <button
        type="button"
        onClick={konfirmoVendtakimin}
        data-testid="confirm-location-button"
      >
        Konfirmo vendtakimin
      </button>

      {vendtakimi && <p>Vendtakimi i konfirmuar: {vendtakimi}</p>}
    </section>
  );
}
