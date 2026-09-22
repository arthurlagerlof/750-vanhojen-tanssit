export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4efe5] text-[#241c18]">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#76584a]">
          Katedralskolan i Åbo
        </p>

        <h1 className="max-w-4xl font-serif text-6xl font-medium tracking-tight sm:text-7xl">
          Historiaa, perinteitä ja hyvää tekemistä.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#65564f]">
          Tervetuloa Katedralskolan kakkutukkuun.
          Tutustu koulumme historiaan ja tilaa herkkuja tukemaan
          yhteistä tekemistämme.
        </p>

        <button
          type="button"
          className="mt-10 rounded-full bg-[#3b2520] px-8 py-4 text-sm font-medium tracking-wide text-[#f9f4ea] transition hover:-translate-y-0.5 hover:bg-[#51342c]"
        >
          Tutustu valikoimaan
        </button>
      </section>
    </main>
  );
}