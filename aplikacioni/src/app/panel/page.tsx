
import Link from "next/link";
import Hyrja from "@/components/Hyrja";
import { profiliIm } from "@/lib/lejet";
import { ruajOren } from "./actions";

export const dynamic = "force-dynamic";

const mesazhet: Record<string, string> = {
  hyr: "Hyr në llogari para se të ndryshosh udhëtimin.",
  ndaluar: "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.",
  fushe: "Shkruaj një orë të vlefshme, p.sh. 10:10. ID duhet të jetë numerike.",
  ruajtur: "Ora u ruajt me sukses. Kontrollo listën dhe detajet.",
  databaza: "Nuk u lidhëm me databazën. Kontrollo Neon dhe provo përsëri.",
};

export default async function Panel({
  searchParams,
}: {
  searchParams: Promise<{ m?: string }>;
}) {
  const { m } = await searchParams;

  let p;

  try {
    p = await profiliIm();
  } catch {
    return (
      <main className="app-shell">
        <h1>Paneli im</h1>
        <p role="alert">{mesazhet.databaza}</p>
        <Link href="/panel">Provo përsëri</Link>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <h1>Paneli im</h1>

      {m && mesazhet[m] && (
        <p role="status">{mesazhet[m]}</p>
      )}

      {!p ? (
        <p>
          Lista është publike. Për panelin hyr me llogarinë tënde GitHub.
        </p>
      ) : (
        <>
          <p>
            Përshëndetje, {p.emri}. Roli: <strong>{p.roli}</strong>.
          </p>
          <p>
            ID ime GitHub: <code>{p.id}</code>
          </p>
        </>
      )}

      <Hyrja brenda={Boolean(p)} />

      {p?.roli === "shofer" ? (
        <form action={ruajOren}>
          <h2>Ndrysho orën e udhëtimit tim</h2>

          <input type="hidden" name="id" value="4" />

          <label htmlFor="ora">Ora e re</label>{" "}
          <input
            id="ora"
            name="ora"
            type="time"
            defaultValue="10:05"
            required
          />{" "}

          <button type="submit">Ruaj orën</button>

          <p>
            Formulari provon udhëtimin Ferizaj – AAB (ID 4).
            Serveri verifikon pronarin para se ta ndryshojë orën.
          </p>
        </form>
      ) : (
        p && (
          <p>
            Si udhëtar mund të shohësh udhëtimet; nuk mund të ndryshosh
            orën e shoferit.
          </p>
        )
      )}

      <p>
        <Link href="/">Kthehu te udhëtimet</Link>
      </p>

      <p>Kërkesa për vend mbetet simulim këtë javë.</p>
    </main>
  );
}
