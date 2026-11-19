import "server-only";
import { getSql } from "./db";

type Perdorues = {
  id: string;
  emri: string;
  roli: "udhetar" | "shofer";
};

type StatusKerkese = "ne pritje" | "e pranuar";

export type KerkesaUdhetimi = {
  id: string;
  udhetarId: string;
  udhetarEmri: string;
  status: StatusKerkese;
};

type KerkesaRresht = {
  id: string | number;
  udhetarId: string;
  udhetarEmri: string;
  status: StatusKerkese;
};

type UdhëtimRresht = {
  shoferId: string | null;
  vende: number;
};

function ktheKerkesen(rreshti: KerkesaRresht): KerkesaUdhetimi {
  return {
    id: String(rreshti.id),
    udhetarId: rreshti.udhetarId,
    udhetarEmri: rreshti.udhetarEmri,
    status: rreshti.status,
  };
}

async function gjejKerkesen(udhetimId: string, udhetarId: string) {
  const sql = getSql();
  const rows = await sql`
    SELECT
      k.id,
      k.udhetar_id AS "udhetarId",
      p.emri AS "udhetarEmri",
      k.status
    FROM kerkesat_udhetimit k
    JOIN profilet p ON p.github_id = k.udhetar_id
    WHERE k.udhetim_id = ${udhetimId}
      AND k.udhetar_id = ${udhetarId}
  `;

  return (rows as KerkesaRresht[])[0];
}

export async function lexoGjendjen(udhetimId: string, perdoruesi: Perdorues) {
  const sql = getSql();
  const trips = await sql`
    SELECT
      shofer_id AS "shoferId",
      vende_lira AS vende
    FROM udhetimet
    WHERE id = ${udhetimId}
  `;
  const udhetimi = (trips as UdhëtimRresht[])[0];
  if (!udhetimi) return null;

  if (udhetimi.shoferId === perdoruesi.id) {
    const rows = await sql`
      SELECT
        k.id,
        k.udhetar_id AS "udhetarId",
        p.emri AS "udhetarEmri",
        k.status
      FROM kerkesat_udhetimit k
      JOIN profilet p ON p.github_id = k.udhetar_id
      WHERE k.udhetim_id = ${udhetimId}
      ORDER BY k.krijuar_me, k.id
    `;

    return {
      udhetimId,
      vende: udhetimi.vende,
      roli: "shofer" as const,
      kerkesat: (rows as KerkesaRresht[]).map(ktheKerkesen),
    };
  }

  const kerkesa = await gjejKerkesen(udhetimId, perdoruesi.id);
  return {
    udhetimId,
    vende: udhetimi.vende,
    roli: "udhetar" as const,
    kerkesa: kerkesa ? ktheKerkesen(kerkesa) : null,
  };
}

type RezultatKerkese =
  | { kind: "ok"; kerkesa: KerkesaUdhetimi; eRe: boolean }
  | { kind: "ndaluar" }
  | { kind: "mungon" }
  | { kind: "paVende" };

export async function dergoKerkese(
  udhetimId: string,
  perdoruesi: Perdorues
): Promise<RezultatKerkese> {
  if (perdoruesi.roli !== "udhetar") return { kind: "ndaluar" };

  const sql = getSql();
  const trips = await sql`
    SELECT shofer_id AS "shoferId", vende_lira AS vende
    FROM udhetimet
    WHERE id = ${udhetimId}
  `;
  const udhetimi = (trips as UdhëtimRresht[])[0];
  if (!udhetimi) return { kind: "mungon" };
  if (udhetimi.shoferId === perdoruesi.id) return { kind: "ndaluar" };

  const ekzistuese = await gjejKerkesen(udhetimId, perdoruesi.id);
  if (ekzistuese) {
    return { kind: "ok", kerkesa: ktheKerkesen(ekzistuese), eRe: false };
  }
  if (udhetimi.vende < 1) return { kind: "paVende" };

  const rows = await sql`
    INSERT INTO kerkesat_udhetimit (udhetim_id, udhetar_id)
    SELECT u.id, ${perdoruesi.id}
    FROM udhetimet u
    WHERE u.id = ${udhetimId}
      AND u.vende_lira > 0
      AND (u.shofer_id IS NULL OR u.shofer_id <> ${perdoruesi.id})
    ON CONFLICT (udhetim_id, udhetar_id) DO NOTHING
    RETURNING
      id,
      udhetar_id AS "udhetarId",
      ${perdoruesi.emri} AS "udhetarEmri",
      status
  `;
  const eRe = (rows as KerkesaRresht[])[0];
  if (eRe) {
    return { kind: "ok", kerkesa: ktheKerkesen(eRe), eRe: true };
  }

  const pasPerpjekjes = await gjejKerkesen(udhetimId, perdoruesi.id);
  if (pasPerpjekjes) {
    return { kind: "ok", kerkesa: ktheKerkesen(pasPerpjekjes), eRe: false };
  }
  return { kind: "paVende" };
}

type RezultatPranimi =
  | { kind: "ok"; kerkesa: KerkesaUdhetimi }
  | { kind: "ndaluar" }
  | { kind: "mungon" }
  | { kind: "paVende" }
  | { kind: "konflikt" };

export async function pranoKerkese(
  udhetimId: string,
  kerkesaId: string,
  perdoruesi: Perdorues
): Promise<RezultatPranimi> {
  if (perdoruesi.roli !== "shofer") return { kind: "ndaluar" };

  const sql = getSql();
  const trips = await sql`
    SELECT shofer_id AS "shoferId", vende_lira AS vende
    FROM udhetimet
    WHERE id = ${udhetimId}
  `;
  const udhetimi = (trips as UdhëtimRresht[])[0];
  if (!udhetimi) return { kind: "mungon" };
  if (udhetimi.shoferId !== perdoruesi.id) return { kind: "ndaluar" };

  const kerkesaQuery = await sql`
    SELECT
      k.id,
      k.udhetar_id AS "udhetarId",
      p.emri AS "udhetarEmri",
      k.status
    FROM kerkesat_udhetimit k
    JOIN profilet p ON p.github_id = k.udhetar_id
    WHERE k.id = ${kerkesaId}
      AND k.udhetim_id = ${udhetimId}
  `;
  const ekzistuese = (kerkesaQuery as KerkesaRresht[])[0];
  if (!ekzistuese) return { kind: "mungon" };
  if (ekzistuese.status === "e pranuar") {
    return { kind: "ok", kerkesa: ktheKerkesen(ekzistuese) };
  }
  if (udhetimi.vende < 1) return { kind: "paVende" };

  const rows = await sql`
    WITH kandidat AS MATERIALIZED (
      SELECT k.id, k.udhetim_id
      FROM kerkesat_udhetimit k
      JOIN udhetimet u ON u.id = k.udhetim_id
      WHERE k.id = ${kerkesaId}
        AND k.udhetim_id = ${udhetimId}
        AND k.status = 'ne pritje'
        AND u.shofer_id = ${perdoruesi.id}
      FOR UPDATE OF k, u
    ),
    zbritja AS (
      UPDATE udhetimet u
      SET vende_lira = u.vende_lira - 1
      FROM kandidat k
      WHERE u.id = k.udhetim_id
        AND u.vende_lira > 0
      RETURNING u.id
    ),
    pranimi AS (
      UPDATE kerkesat_udhetimit k
      SET status = 'e pranuar', pranuar_me = NOW()
      FROM kandidat c
      JOIN zbritja z ON z.id = c.udhetim_id
      WHERE k.id = c.id
        AND k.status = 'ne pritje'
      RETURNING
        k.id,
        k.udhetar_id AS "udhetarId",
        k.status
    )
    SELECT
      p.id,
      p."udhetarId",
      prof.emri AS "udhetarEmri",
      p.status
    FROM pranimi p
    JOIN profilet prof ON prof.github_id = p."udhetarId"
  `;
  const pranuar = (rows as KerkesaRresht[])[0];
  if (pranuar) return { kind: "ok", kerkesa: ktheKerkesen(pranuar) };

  const gjendja = await sql`
    SELECT
      k.id,
      k.udhetar_id AS "udhetarId",
      p.emri AS "udhetarEmri",
      k.status,
      u.vende_lira AS vende,
      u.shofer_id AS "shoferId"
    FROM kerkesat_udhetimit k
    JOIN profilet p ON p.github_id = k.udhetar_id
    JOIN udhetimet u ON u.id = k.udhetim_id
    WHERE k.id = ${kerkesaId}
      AND k.udhetim_id = ${udhetimId}
  `;
  const aktuale = (gjendja as (KerkesaRresht & UdhëtimRresht)[])[0];
  if (!aktuale) return { kind: "mungon" };
  if (aktuale.shoferId !== perdoruesi.id) return { kind: "ndaluar" };
  if (aktuale.status === "e pranuar") {
    return { kind: "ok", kerkesa: ktheKerkesen(aktuale) };
  }
  if (aktuale.vende < 1) return { kind: "paVende" };
  return { kind: "konflikt" };
}
