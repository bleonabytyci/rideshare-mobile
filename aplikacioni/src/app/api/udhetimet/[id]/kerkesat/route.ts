import { profiliIm } from "@/lib/lejet";
import {
  dergoKerkese,
  lexoGjendjen,
  pranoKerkese,
} from "@/lib/kerkesat";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };
const paCache = { "Cache-Control": "no-store" };

function gabim(status: number, error: string) {
  return Response.json({ error }, { status, headers: paCache });
}

async function identifiko() {
  const perdoruesi = await profiliIm();
  return perdoruesi;
}

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return gabim(400, "ID-ja e udhëtimit nuk është e vlefshme.");

  const perdoruesi = await identifiko();
  if (!perdoruesi) return gabim(401, "Hyr në llogari.");

  const gjendja = await lexoGjendjen(id, perdoruesi);
  if (!gjendja) return gabim(404, "Udhëtimi nuk ekziston.");
  return Response.json(gjendja, { headers: paCache });
}

export async function POST(_req: Request, { params }: Ctx) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return gabim(400, "ID-ja e udhëtimit nuk është e vlefshme.");

  const perdoruesi = await identifiko();
  if (!perdoruesi) return gabim(401, "Hyr në llogari.");

  const rezultati = await dergoKerkese(id, perdoruesi);
  if (rezultati.kind === "ndaluar") {
    return gabim(403, "Vetëm udhëtari mund të kërkojë një vend.");
  }
  if (rezultati.kind === "mungon") {
    return gabim(404, "Udhëtimi nuk ekziston.");
  }
  if (rezultati.kind === "paVende") {
    return gabim(409, "Nuk ka vende të lira.");
  }

  return Response.json(
    { kerkesa: rezultati.kerkesa },
    { status: rezultati.eRe ? 201 : 200, headers: paCache }
  );
}

export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return gabim(400, "ID-ja e udhëtimit nuk është e vlefshme.");

  const perdoruesi = await identifiko();
  if (!perdoruesi) return gabim(401, "Hyr në llogari.");

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return gabim(400, "Trupi i kërkesës nuk është JSON i vlefshëm.");
  }
  const kerkesaId =
    typeof body === "object" && body !== null && "kerkesaId" in body
      ? body.kerkesaId
      : undefined;
  if (typeof kerkesaId !== "string" || !/^[1-9]\d*$/.test(kerkesaId)) {
    return gabim(400, "ID-ja e kërkesës nuk është e vlefshme.");
  }

  const rezultati = await pranoKerkese(id, kerkesaId, perdoruesi);
  if (rezultati.kind === "ndaluar") {
    return gabim(403, "Vetëm shoferi pronar mund ta pranojë kërkesën.");
  }
  if (rezultati.kind === "mungon") {
    return gabim(404, "Kërkesa ose udhëtimi nuk ekziston.");
  }
  if (rezultati.kind === "paVende") {
    return gabim(409, "Nuk ka vende të lira për ta pranuar kërkesën.");
  }
  if (rezultati.kind === "konflikt") {
    return gabim(409, "Kërkesa nuk mund të pranohet tani. Rifresko gjendjen.");
  }

  return Response.json(
    { kerkesa: rezultati.kerkesa },
    { headers: paCache }
  );
}
