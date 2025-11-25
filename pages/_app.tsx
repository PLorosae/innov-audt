import React, { useMemo, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

/**
 * PERGUNTAS DO AUDIT — Estrutura completa
 */
const questionsByLevel: Record<string, Record<string, string[]>> = {
  "Indivíduo": {
    "Cultura & Comportamentos": [
      "Os colaboradores demonstram iniciativa para explorar novas abordagens, ferramentas ou metodologias no seu trabalho diário?",
      "Há comportamentos regulares de partilha de ideias e aprendizagens entre colegas (reuniões, canais internos, momentos informais)?",
      "Os indivíduos assumem responsabilidade pelas suas próprias aprendizagens e desenvolvimento de competências em inovação?"
    ],
    "Sistemas & Ferramentas": [
      "Existem mecanismos acessíveis para registar e acompanhar ideias (formulário, plataforma, board digital)?",
      "Existe um processo claro e visível para propor, testar e implementar novas ideias no contexto do trabalho individual?",
      "Os colaboradores têm acesso a ferramentas e recursos (templates, plataformas digitais, IA) que facilitem a experimentação?"
    ],
    "Estratégia, Propósito & Impacto": [
      "Os colaboradores conhecem o propósito da organização e entendem como o seu trabalho pode contribuir para a inovação?",
      "Os indivíduos conseguem relacionar as suas iniciativas com objetivos estratégicos da organização?",
      "Os colaboradores têm perceção do impacto que as suas ideias ou contribuições inovadoras geram (reconhecimento, resultados, feedback)?"
    ]
  },
  "Equipa": {
    "Cultura & Comportamentos": [
      "As equipas têm momentos específicos para discutir melhorias, novas ideias ou oportunidades de inovação?",
      "Existe confiança e abertura na equipa para desafiar o status quo e questionar práticas estabelecidas?",
      "As equipas celebram aprendizagens resultantes de experiências, mesmo quando os resultados não são totalmente bem-sucedidos?"
    ],
    "Sistemas & Ferramentas": [
      "As equipas utilizam ferramentas colaborativas (digitais ou presenciais) para co-criar, prototipar ou testar novas soluções?",
      "Há mecanismos claros para priorizar e selecionar, em equipa, as ideias com maior potencial de impacto?",
      "As equipas têm acesso a dados, insights ou informação relevante que apoie decisões em processos de inovação?"
    ],
    "Estratégia, Propósito & Impacto": [
      "As equipas têm objetivos alinhados com a estratégia de inovação da organização?",
      "As equipas entendem como os projetos em que trabalham contribuem para o propósito da organização?",
      "Os resultados de iniciativas inovadoras das equipas são comunicados e reconhecidos internamente?"
    ]
  },
  "Organização": {
    "Cultura & Comportamentos": [
      "Existe uma cultura organizacional que valoriza a experimentação e aceita o erro como parte do processo de aprendizagem?",
      "As lideranças promovem e modelam comportamentos inovadores (questionar, explorar, arriscar com responsabilidade)?",
      "Existem práticas que promovem um mindset inovador em diferentes áreas da organização?"
    ],
    "Sistemas & Ferramentas": [
      "A organização dispõe de processos estruturados para gestão de ideias e inovação (funil de inovação, programas, comités)?",
      "Existem recursos dedicados (tempo, orçamento, pessoas) para apoiar iniciativas de inovação?",
      "São utilizadas ferramentas tecnológicas que facilitam a colaboração, experimentação e escala de soluções inovadoras?"
    ],
    "Estratégia, Propósito & Impacto": [
      "A inovação está claramente integrada na estratégia da organização (objetivos, prioridades, comunicação)?",
      "Existe uma visão partilhada sobre o papel da inovação no futuro da organização?",
      "A organização mede o impacto das iniciativas de inovação (indicadores, resultados, casos de sucesso)?"
    ]
  },
  "Ecossistema": {
    "Cultura & Comportamentos": [
      "A organização incentiva a colaboração com parceiros externos (clientes, fornecedores, startups, universidades) em inovação?",
      "Existe abertura para cocriar soluções com o ecossistema, acolhendo contributos externos de forma estruturada?",
      "As pessoas envolvidas em projetos com o ecossistema demonstram atitudes colaborativas, de confiança e partilha de valor?"
    ],
    "Sistemas & Ferramentas": [
      "A organização participa em redes, programas ou plataformas externas de inovação (hubs, clusters, comunidades)?",
      "Existem mecanismos que facilitam a integração de soluções externas (pilotos, parcerias, contratos flexíveis)?",
      "São utilizadas ferramentas ou processos que suportam a gestão de parcerias de inovação com o ecossistema?"
    ],
    "Estratégia, Propósito & Impacto": [
      "A organização tem uma estratégia clara para o envolvimento com o ecossistema de inovação?",
      "As parcerias externas são usadas de forma intencional para acelerar ou ampliar a inovação?",
      "A organização monitoriza o impacto das iniciativas com o ecossistema (novos negócios, impacto social, reputação)?"
    ]
  },
  "O Todo": {
    "Cultura & Comportamentos": [
      "Existe um entendimento partilhado de que a inovação é responsabilidade de todos e não apenas de uma área específica?",
      "As diferentes áreas da organização colaboram entre si em iniciativas de inovação (evitando silos)?",
      "A organização demonstra consistência entre o que comunica sobre inovação e o que realmente faz?"
    ],
    "Sistemas & Ferramentas": [
      "Existem mecanismos que permitem alinhar, integrar e monitorizar, de forma transversal, as iniciativas de inovação?",
      "A organização usa tecnologia de forma consciente, transparente e responsável para apoiar a inovação?",
      "Contribui para a criação de normas, standards ou referências no setor através de práticas inovadoras?"
    ],
    "Estratégia, Propósito & Impacto": [
      "O propósito da organização inclui um contributo claro para o futuro (societal, ambiental, tecnológico)?",
      "Existem metas de inovação alinhadas com agendas mais amplas (sustentabilidade, impacto social, transição digital)?",
      "A organização mede e comunica o impacto coletivo da inovação no sistema em que está inserida (setor, comunidade, sociedade)?"
    ]
  }
};

type AnswerMap = { [key: string]: number };
const LEVELS = Object.keys(questionsByLevel);

/**
 * Recomendações por faixa de score
 */
function getRecommendations(score: number): string[] {
  if (score <= 2) {
    return [
      "Clarificar o propósito e a ambição de inovação e comunicá-los de forma simples a toda a organização.",
      "Criar um canal único e acessível para recolha e acompanhamento de ideias.",
      "Identificar champions de inovação em áreas-chave e dar-lhes espaço e mandato.",
      "Lançar um primeiro desafio interno com prazo curto e decisão rápida.",
      "Introduzir um ritual de partilha de aprendizagens focado em experiências e não apenas em resultados."
    ];
  }
  if (score <= 4) {
    return [
      "Estruturar um funil básico de inovação com etapas e critérios claros.",
      "Garantir sprints de inovação regulares em equipas ou unidades prioritárias.",
      "Mapear ferramentas já existentes e consolidar as que melhor suportam a colaboração.",
      "Criar mecanismos simples de priorização de ideias com base em impacto e esforço.",
      "Iniciar pelo menos uma parceria externa focada num desafio concreto."
    ];
  }
  if (score <= 6) {
    return [
      "Criar um portefólio visível de projetos de inovação com estado e responsáveis.",
      "Definir KPIs simples de inovação e acompanhá-los com cadência regular.",
      "Integrar ferramentas de IA e automação em processos de ideação, análise ou teste.",
      "Envolver a liderança intermédia como facilitadora ativa das iniciativas.",
      "Formalizar um programa de desenvolvimento de competências em inovação."
    ];
  }
  if (score <= 8) {
    return [
      "Ligar o portefólio de inovação diretamente às prioridades estratégicas e métricas de negócio.",
      "Refinar a governança de inovação, com fóruns, decisões e ciclos de revisão bem definidos.",
      "Expandir iniciativas transversais que cruzem unidades, funções e geografias.",
      "Desenvolver um modelo de competências de Amplified Innovation com trilhos claros.",
      "Aprofundar a atuação no ecossistema através de programas e parcerias estruturadas."
    ];
  }
  return [
    "Investir em foresight e exploração sistemática de futuros para alimentar a inovação.",
    "Explorar modelos de corporate venturing e venture client com startups e scaleups.",
    "Experimentar novas formas de captura de valor (dados, plataformas, subscrição, impacto).",
    "Partilhar práticas e frameworks de inovação como referência no ecossistema.",
    "Rever regularmente o framework de Amplified Innovation para manter a vantagem competitiva."
  ];
}

/**
 * COMPONENTE PRINCIPAL
 */
export default function HomePage() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const flatQuestions = useMemo(() => {
    const list: {
      nivel: string;
      dim: string;
      pergunta: string;
      key: string;
    }[] = [];
    LEVELS.forEach((nivel) => {
      const dims = questionsByLevel[nivel];
      Object.keys(dims).forEach((dim) => {
        dims[dim].forEach((pergunta, idx) => {
          const key = `${nivel}|${dim}|${idx}`;
          list.push({ nivel, dim, pergunta, key });
        });
      });
    });
    return list;
  }, []);

  const totalSteps = flatQuestions.length;
  const current = flatQuestions[step];

  function handleAnswerChange(value: number) {
    setAnswers((prev) => ({ ...prev, [current.key]: value }));
  }

  function canGoNext() {
    return answers[current.key] != null;
  }

  function next() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setShowLeadForm(true);
    }
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  function computeScores() {
    const dimValues: { [key: string]: number[] } = {};

    flatQuestions.forEach((q) => {
      const val = answers[q.key];
      if (!val) return;
      const dimKey = `${q.nivel}|${q.dim}`;
      if (!dimValues[dimKey]) dimValues[dimKey] = [];
      dimValues[dimKey].push(val);
    });

    const dimScores: { [key: string]: number } = {};
    Object.keys(dimValues).forEach((k) => {
      const arr = dimValues[k];
      dimScores[k] = arr.reduce((a, b) => a + b, 0) / arr.length;
    });

    const levelScoresRaw: { [key: string]: number } = {};
    LEVELS.forEach((nivel) => {
      const dims = Object.keys(questionsByLevel[nivel]);
      const vals: number[] = [];
      dims.forEach((dim) => {
        const k = `${nivel}|${dim}`;
        if (dimScores[k] != null) vals.push(dimScores[k]);
      });
      levelScoresRaw[nivel] =
        vals.length > 0
          ? vals.reduce((a, b) => a + b, 0) / vals.length
          : 0;
    });

    const radarData = LEVELS.map((nivel) => ({
      nivel,
      score: (levelScoresRaw[nivel] / 5) * 100
    }));

    const vals = Object.values(levelScoresRaw);
    const globalRaw =
      vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
    const amplifiedScore = Math.round((globalRaw / 5) * 10);

    return { levelScoresRaw, radarData, amplifiedScore };
  }

  const allAnswered =
    Object.keys(answers).length === flatQuestions.length;

  async function handleSubmitLead(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const scoring = computeScores();
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          role,
          answers,
          scoring
        })
      });
      if (!res.ok) {
        throw new Error("Erro ao guardar os dados.");
      }
      setShowResults(true);
    } catch (err: any) {
      setSubmitError(err.message || "Ocorreu um erro.");
    } finally {
      setSubmitting(false);
    }
  }

  const scoring = showResults ? computeScores() : null;
  const radarData = scoring?.radarData || [];
  const amplifiedScore = scoring?.amplifiedScore || 0;
  const recs = showResults ? getRecommendations(amplifiedScore) : [];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        maxWidth: 900,
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont"
      }}
    >
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Amplified Innovation Audit
        </h1>
        <p style={{ maxWidth: 640, fontSize: 14, lineHeight: 1.5 }}>
          Em menos de 10 minutos, avalia o nível de inovação amplificada
          da tua organização em cinco níveis: Indivíduo, Equipa,
          Organização, Ecossistema e O Todo. No final, recebes um score de
          1 a 10 e recomendações práticas para amplificar o teu
          potencial.
        </p>
      </header>

      {/* PERGUNTAS */}
      {!showResults && !showLeadForm && (
        <main>
          <div
            style={{
              marginBottom: 16,
              fontSize: 12,
              color: "#555",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span>
              Pergunta {step + 1} de {totalSteps}
            </span>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 500,
                marginBottom: 4,
                color: "#222"
              }}
            >
              {current.pergunta}
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#666",
                marginBottom: 12
              }}
            >
              1 = Discordo totalmente · 5 = Concordo totalmente
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3, 4, 5].map((v) => {
                const selected = answers[current.key] === v;
                return (
                  <button
                    key={v}
                    onClick={() => handleAnswerChange(v)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 999,
                      border: "1px solid",
                      borderColor: selected ? "#111" : "#ccc",
                      fontSize: 14,
                      backgroundColor: selected ? "#111" : "#fff",
                      color: selected ? "#fff" : "#111",
                      cursor: "pointer"
                    }}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 24
            }}
          >
            <button
              onClick={prev}
              disabled={step === 0}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "1px solid #ccc",
                background: step === 0 ? "#f5f5f5" : "#fff",
                color: "#333",
                cursor: step === 0 ? "not-allowed" : "pointer",
                fontSize: 13
              }}
            >
              Anterior
            </button>
            <button
              onClick={next}
              disabled={!canGoNext()}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border: "1px solid #111",
                background: canGoNext() ? "#111" : "#f5f5f5",
                color: canGoNext() ? "#fff" : "#aaa",
                cursor: canGoNext() ? "pointer" : "not-allowed",
                fontSize: 13
              }}
            >
              {step === totalSteps - 1 ? "Continuar" : "Seguinte"}
            </button>
          </div>
        </main>
      )}

      {/* FORMULÁRIO DE LEAD */}
      {!showResults && showLeadForm && (
        <main>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 8
            }}
          >
            Quase lá.
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#555",
              marginBottom: 16,
              maxWidth: 520
            }}
          >
            Deixa-nos três dados para veres o teu nível de Amplified
            Innovation, o gráfico e as recomendações. Também os usamos
            para te enviar eventualmente benchmarks e insights
            agregados. Não partilhamos os dados com terceiros.
          </p>
          <form
            onSubmit={handleSubmitLead}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 14
              }}
            />
            <input
              type="text"
              placeholder="Empresa"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 14
              }}
            />
            <input
              type="text"
              placeholder="Função"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #ccc",
                fontSize: 14
              }}
            />
            {submitError && (
              <p style={{ color: "red", fontSize: 13 }}>{submitError}</p>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button
                type="button"
                onClick={() => setShowLeadForm(false)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: "1px solid #ccc",
                  background: "#fff",
                  fontSize: 13,
                  cursor: "pointer"
                }}
              >
                Voltar ao questionário
              </button>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: "1px solid #111",
                  background: submitting ? "#f5f5f5" : "#111",
                  color: submitting ? "#aaa" : "#fff",
                  fontSize: 13,
                  cursor: submitting ? "not-allowed" : "pointer"
                }}
              >
                {submitting ? "A guardar..." : "Ver resultados"}
              </button>
            </div>
          </form>
        </main>
      )}

      {/* RESULTADOS */}
      {showResults && scoring && (
        <main>
          <section style={{ marginBottom: 24 }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 4
              }}
            >
              Nível de Amplified Innovation: {amplifiedScore} / 10
            </h2>
            <p style={{ fontSize: 14, color: "#555" }}>
              Este score resulta da média dos cinco níveis avaliados:
              Indivíduo, Equipa, Organização, Ecossistema e O Todo.
            </p>
          </section>

          <section style={{ width: "100%", height: 320, marginBottom: 24 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="nivel" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Amplified Innovation"
                  dataKey="score"
                  stroke="#111111"
                  fill="#111111"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </section>

          <section>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 8
              }}
            >
              5 recomendações para amplificar a inovação:
            </h3>
            <ul
              style={{
                paddingLeft: 18,
                fontSize: 14,
                lineHeight: 1.6
              }}
            >
              {recs.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </section>
        </main>
      )}

      <footer
        style={{
          marginTop: 40,
          fontSize: 11,
          color: "#777",
          borderTop: "1px solid #eee",
          paddingTop: 12,
          textAlign: "center"
        }}
      >
        Powered by imatch · Amplified Innovation Audit
      </footer>
    </div>
  );
}