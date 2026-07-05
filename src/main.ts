import "./styles.css";

type Feature = {
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    title: "TypeScript ready",
    description: "Struktur awal sudah strict dan siap dikembangkan."
  },
  {
    title: "Vite dev server",
    description: "Reload cepat saat kamu edit file."
  },
  {
    title: "Clean starter",
    description: "Belum terikat framework, bebas lanjut ke vanilla, React, atau lainnya."
  }
];

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Root element #app tidak ditemukan.");
}

app.innerHTML = `
  <section class="hero">
    <div class="hero__content">
      <p class="eyebrow">Base TypeScript Web</p>
      <h1>Hackathon Tim Love Story</h1>
      <p class="lead">
        Starter web TypeScript sudah siap. Edit <code>src/main.ts</code>
        dan <code>src/styles.css</code> untuk mulai bangun UI.
      </p>
      <div class="actions">
        <a class="button" href="https://vite.dev/guide/" target="_blank" rel="noreferrer">
          Vite Docs
        </a>
      </div>
    </div>
  </section>
  <section class="features" aria-label="Fitur starter">
    ${features
      .map(
        (feature) => `
          <article class="feature">
            <h2>${feature.title}</h2>
            <p>${feature.description}</p>
          </article>
        `
      )
      .join("")}
  </section>
`;
