"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type StatusKerkese = "ne pritje" | "e pranuar";

type Kerkesa = {
  id: string;
  udhetarId: string;
  udhetarEmri: string;
  status: StatusKerkese;
};

type Gjendja =
  | {
      udhetimId: string;
      vende: number;
      roli: "shofer";
      kerkesat: Kerkesa[];
    }
  | {
      udhetimId: string;
      vende: number;
      roli: "udhetar";
      kerkesa: Kerkesa | null;
    };

function eshteObjekt(vlera: unknown): vlera is Record<string, unknown> {
  return typeof vlera === "object" && vlera !== null;
}

function eshteKerkese(vlera: unknown): vlera is Kerkesa {
  return (
    eshteObjekt(vlera) &&
    typeof vlera.id === "string" &&
    typeof vlera.udhetarId === "string" &&
    typeof vlera.udhetarEmri === "string" &&
    (vlera.status === "ne pritje" || vlera.status === "e pranuar")
  );
}

function eshteGjendje(vlera: unknown): vlera is Gjendja {
  if (
    !eshteObjekt(vlera) ||
    typeof vlera.udhetimId !== "string" ||
    typeof vlera.vende !== "number" ||
    !Number.isInteger(vlera.vende) ||
    vlera.vende < 0
  ) {
    return false;
  }

  if (vlera.roli === "shofer") {
    return Array.isArray(vlera.kerkesat) && vlera.kerkesat.every(eshteKerkese);
  }
  return vlera.roli === "udhetar" &&
    (vlera.kerkesa === null || eshteKerkese(vlera.kerkesa));
}

function mesazhi(body: unknown, fallback: string) {
  return eshteObjekt(body) && typeof body.error === "string"
    ? body.error
    : fallback;
}

function statusi(status: StatusKerkese) {
  return status === "ne pritje" ? "Në pritje" : "U pranua";
}

export default function KerkesaUdhetimiLive({
  udhetimiId,
  vendeFillestare,
}: {
  udhetimiId: string;
  vendeFillestare: number;
}) {
  const [gjendja, setGjendja] = useState<Gjendja | null>(null);
  const [vende, setVende] = useState(vendeFillestare);
  const [offline, setOffline] = useState(false);
  const [gabim, setGabim] = useState<string | null>(null);
  const [hyrKerkohet, setHyrKerkohet] = useState(false);
  const [dukeVepruar, setDukeVepruar] = useState(false);
  const [njoftim, setNjoftim] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let aktiv = true;
    let dukeLexuar = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let kontrollues: AbortController | undefined;
    const url = `/api/udhetimet/${encodeURIComponent(udhetimiId)}/kerkesat`;

    const lexo = async () => {
      if (!aktiv || dukeLexuar) return;
      if (!navigator.onLine) {
        setOffline(true);
        timer = setTimeout(() => void lexo(), 5000);
        return;
      }

      dukeLexuar = true;
      kontrollues = new AbortController();
      try {
        const response = await fetch(url, {
          cache: "no-store",
          signal: kontrollues.signal,
        });
        const body: unknown = await response.json();
        if (!aktiv) return;
        if (!response.ok) {
          if (response.status === 401) setHyrKerkohet(true);
          if (response.status >= 500) setOffline(true);
          else setGabim(mesazhi(body, "Gjendja nuk mund të lexohet."));
          return;
        }
        if (!eshteGjendje(body)) {
          setGabim("Përgjigjja e serverit nuk ka format të vlefshëm.");
          return;
        }

        setGjendja(body);
        setVende(body.vende);
        setOffline(false);
        setGabim(null);
        setHyrKerkohet(false);
      } catch {
        if (aktiv && !kontrollues.signal.aborted) {
          setOffline(true);
          setGabim(null);
        }
      } finally {
        dukeLexuar = false;
        if (aktiv) timer = setTimeout(() => void lexo(), 5000);
      }
    };

    const kurOffline = () => {
      setOffline(true);
      if (timer) clearTimeout(timer);
    };
    const kurOnline = () => {
      if (timer) clearTimeout(timer);
      void lexo();
    };

    window.addEventListener("offline", kurOffline);
    window.addEventListener("online", kurOnline);
    void lexo();

    return () => {
      aktiv = false;
      if (timer) clearTimeout(timer);
      kontrollues?.abort();
      window.removeEventListener("offline", kurOffline);
      window.removeEventListener("online", kurOnline);
    };
  }, [udhetimiId, refreshKey]);

  async function vepro(metoda: "POST" | "PATCH", kerkesaId?: string) {
    setDukeVepruar(true);
    setGabim(null);
    setNjoftim(null);
    try {
      const response = await fetch(
        `/api/udhetimet/${encodeURIComponent(udhetimiId)}/kerkesat`,
        {
          method: metoda,
          headers: metoda === "PATCH" ? { "Content-Type": "application/json" } : undefined,
          body: metoda === "PATCH" ? JSON.stringify({ kerkesaId }) : undefined,
          cache: "no-store",
        }
      );
      const body: unknown = await response.json();
      if (!response.ok) {
        setGabim(mesazhi(body, "Veprimi nuk u krye."));
        if (response.status >= 500) setOffline(true);
        return;
      }

      setNjoftim(metoda === "POST" ? "Kërkesa u dërgua." : "Pranimi u ruajt.");
      setRefreshKey((vlera) => vlera + 1);
    } catch {
      setOffline(true);
      setGabim("Nuk u lidhëm me serverin. Provo përsëri kur të rilidhesh.");
    } finally {
      setDukeVepruar(false);
    }
  }

  const bllokuar = offline || dukeVepruar;

  return (
    <section className="kerkesat" aria-labelledby="titulli-kerkesat">
      <h2 id="titulli-kerkesat">Kërkesat për udhëtim</h2>
      <p className="kerkesat-vendet">Vende të lira: <strong>{vende}</strong></p>

      {offline && (
        <p role="alert">
          Po rilidhemi · të dhënat mund të jenë të vjetra. Veprimet janë të bllokuara.
        </p>
      )}
      {gabim && <p role="alert">{gabim}</p>}
      {njoftim && <p role="status">{njoftim}</p>}
      {hyrKerkohet && (
        <p>
          <Link href="/panel">Hyr në llogari</Link> për të dërguar ose pranuar kërkesa.
        </p>
      )}
      {!gjendja && !gabim && !offline && <p>Po lexohet gjendja nga serveri…</p>}

      {gjendja?.roli === "udhetar" && (
        <div>
          {gjendja.kerkesa ? (
            <p>
              Kërkesa jote: <strong>{statusi(gjendja.kerkesa.status)}</strong>
            </p>
          ) : vende > 0 ? (
            <button
              className="action"
              disabled={bllokuar}
              onClick={() => void vepro("POST")}
            >
              {dukeVepruar ? "Duke dërguar…" : "Kërko një vend"}
            </button>
          ) : (
            <p>Nuk ka vende të lira.</p>
          )}
        </div>
      )}

      {gjendja?.roli === "shofer" && (
        <div>
          {gjendja.kerkesat.length === 0 ? (
            <p>Ende pa kërkesa.</p>
          ) : (
            <ul className="kerkesat-lista">
              {gjendja.kerkesat.map((kerkesa) => (
                <li key={kerkesa.id}>
                  <span>
                    {kerkesa.udhetarEmri} · {statusi(kerkesa.status)}
                  </span>
                  {kerkesa.status === "ne pritje" && (
                    <button
                      className="action"
                      disabled={bllokuar || vende < 1}
                      onClick={() => void vepro("PATCH", kerkesa.id)}
                    >
                      {dukeVepruar ? "Duke ruajtur…" : "Prano kërkesën"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {gjendja && (
        <p className="kerkesat-shenim">
          Gjendja u lexua nga serveri · përditësim automatik çdo 5 sekonda.
        </p>
      )}
    </section>
  );
}
