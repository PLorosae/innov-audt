import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Amplified Innovation Audit</title>
        <meta name="description" content="Amplified Innovation Audit by imatch" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <main className={styles.main}>
          <h1>Amplified Innovation Audit</h1>

          <p>
            Este audit baseia-se no Amplified Innovation Canvas e explora a inovação a partir de diferentes
            níveis da organização.
          </p>

          <p>
            Em cada nível analisamos três dimensões: <strong>Cultura &amp; Comportamentos</strong>,{" "}
            <strong>Sistemas &amp; Ferramentas</strong>, e <strong>Estratégia, Propósito &amp; Impacto</strong>.
          </p>

          <p>
            As respostas refletem a perceção de quem responde. Para um diagnóstico mais profundo e acionável,
            é fundamental cruzar diferentes pontos de vista e envolver vários níveis da organização.
          </p>

          <button type="button">Começar o audit</button>
        </main>
      </div>
    </>
  );
}
