import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";
import Vendndodhja from "@/components/Vendndodhja";
import PreferimiServer from "@/components/PreferimiServer";
import KerkesaUdhetimiLive from "@/components/KerkesaUdhetimiLive";

export const dynamic = "force-dynamic";

export default async function Detajet({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let udhetim;

  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link href="/">← Kthehu te lista</Link>
      </main>
    );
  }

  if (!udhetim) notFound();

  return (
    <main>
      <Link href="/">← Kthehu te lista</Link>

      <h1>{udhetim.nisja} – {udhetim.destinacioni}</h1>

      <p>Ora: {udhetim.ora}</p>
      <p>Vendtakimi: {udhetim.vendtakimi}</p>
      <KerkesaUdhetimiLive udhetimiId={id} vendeFillestare={udhetim.vende} />

      <PreferimiServer udhetimiId={id} />

      <Vendndodhja />
    </main>
  );
}
