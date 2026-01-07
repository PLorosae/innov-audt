import React, { useMemo, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import auditStyles from "@/styles/audit.module.css";


/**
 * PERGUNTAS DO AUDIT — Estrutura completa
 */
const questionsByLevel: Record<string, Record<string, string[]>> = {
  "Indivíduo": {
    "Cultura & Comportamentos": [
      "Os colaboradores demonstram iniciativa para explorar novas abordagens e trazer referências externas para o seu trabalho?",
      "Há evidência de comportamentos regulares de partilha de ideias, feedback entre pares e aprendizagem informal (ex: grupos internos, newsletters, partilhas em reuniões)?",
    ],
    "Sistemas & Ferramentas": [
      "Existem mecanismos acessíveis para os colaboradores proporem e testarem ideias (ex: ferramentas digitais, prompts de IA, NoCode), formação em design thinking e pensamento lateral?",
      "Está disponível um processo claro e visível para que qualquer colaborador possa submeter ideias, obter resposta e acompanhar feedback (ex: inbox de inovação, canal Slack, formulário interno)?",
    ],
    "Estratégia, Propósito & Impacto": [
      "Os colaboradores conhecem o propósito da organização e compreendem como a inovação contribui para atingi-lo?",
      "Existem oportunidades claras para os colaboradores contribuírem para desafios estratégicos da empresa (ex: desafios mensais, hackathons, calls internas)?",
    ],
  },
  "Equipa": {
    "Cultura & Comportamentos": [
      "A equipa promove uma cultura de abertura, aprendizagem contínua e escuta ativa entre os seus membros?",
      "Existem rituais ou práticas regulares que incentivam a partilha, reflexão e colaboração (ex: retrospetivas, learning moments, showcases)?",
    ],
    "Sistemas & Ferramentas": [
      "A equipa utiliza ferramentas colaborativas para cocriar, prototipar e testar ideias (ex: canvas, design sprints, workflows digitais)?",
      "Existem processos internos na equipa que facilitam a avaliação e priorização de ideias com base em critérios partilhados?",
    ],
    "Estratégia, Propósito & Impacto": [
      "A equipa está alinhada em torno de prioridades claras e como contribui para a estratégia de inovação da organização?",
      "O propósito da equipa é claro, inspirador e refletido nas decisões do dia a dia?",
    ],
  },
  "Organização": {
    "Cultura & Comportamentos": [
      "A cultura organizacional valoriza a experimentação, a colaboração e a aprendizagem contínua?",
      "As lideranças modelam comportamentos alinhados com inovação (ex: abertura ao erro, escuta ativa, curiosidade)?",
    ],
    "Sistemas & Ferramentas": [
      "A organização dispõe de um processo estruturado de inovação (ex: funil de ideias, portefólio de inovação, critérios de priorização)?",
      "Existem plataformas e ferramentas acessíveis a todas as equipas para partilhar, testar e evoluir ideias?",
    ],
    "Estratégia, Propósito & Impacto": [
      "A estratégia de inovação está alinhada com o propósito organizacional e é conhecida pelas equipas?",
      "A organização define ambições claras para a inovação (ex: metas, indicadores de sucesso, impacto esperado)?",
    ],
  },
  "Ecossistema": {
    "Cultura & Comportamentos": [
      "A organização estabelece relações de confiança e aprendizagem com parceiros externos (ex: startups, universidades, clientes)?",
      "Participa ativamente em comunidades de prática, eventos ou fóruns de cocriação interorganizacional?",
    ],
    "Sistemas & Ferramentas": [
      "Há plataformas ou interfaces que permitem colaboração com atores do ecossistema (ex: APIs, hubs, portais de inovação)?",
      "Existem processos para captar sinais externos, mapear tendências e incorporar inputs externos nos projetos?",
    ],
    "Estratégia, Propósito & Impacto": [
      "A organização tem uma estratégia clara de envolvimento com o ecossistema (ex: inovação aberta, venture client, parcerias estratégicas)?",
      "Os objetivos de inovação refletem o contributo mútuo entre a organização e os seus stakeholders externos?",
    ],
  },
  "Societal": {
    "Cultura & Comportamentos": [
      "A organização contribui ativamente para uma cultura de inovação responsável e ampla (ex: políticas públicas, redes colaborativas, educação)?",
      "É reconhecida como uma referência ou influenciadora em práticas de inovação sustentáveis e humanas?",
    ],
    "Sistemas & Ferramentas": [
      "Participa ou lidera iniciativas de infraestrutura aberta para inovação (ex: dados abertos, plataformas de experimentação, espaços partilhados)?",
      "Contribui para a criação de normas, standards ou regulamentos que facilitam a inovação responsável a nível setorial ou global?",
    ],
    "Estratégia, Propósito & Impacto": [
      "O propósito da organização inclui um contributo sistémico e de longo prazo para a sociedade ou planeta?",
      "Existem metas de inovação alinhadas com agendas globais (ex: ODS, ESG, transição digital verde)?",
    ],
  },
};
const questionsByLevelEN: Record<string, Record<string, string[]>> = {
  "Indivíduo": {
    "Cultura & Comportamentos": [
      "Do employees show initiative to explore new approaches and bring external references into their work?",
      "Is there evidence of regular behaviours such as idea sharing, peer feedback and informal learning (e.g., internal groups, newsletters, meeting share-outs)?"
    ],
    "Sistemas & Ferramentas": [
      "Are there accessible mechanisms for employees to propose and test ideas (e.g., digital tools, AI prompts, NoCode), including training in design thinking and lateral thinking?",
      "Is there a clear and visible process so any employee can submit ideas, receive a response and track feedback (e.g., innovation inbox, Slack channel, internal form)?"
    ],
    "Estratégia, Propósito & Impacto": [
      "Do employees know the organization’s purpose and understand how innovation helps achieve it?",
      "Are there clear opportunities for employees to contribute to the company’s strategic challenges (e.g., monthly challenges, hackathons, internal calls)?"
    ]
  },

  "Equipa": {
    "Cultura & Comportamentos": [
      "Does the team foster a culture of openness, continuous learning and active listening among its members?",
      "Are there regular rituals or practices that encourage sharing, reflection and collaboration (e.g., retrospectives, learning moments, showcases)?"
    ],
    "Sistemas & Ferramentas": [
      "Does the team use collaborative tools to co-create, prototype and test ideas (e.g., canvases, design sprints, digital workflows)?",
      "Are there internal team processes that help evaluate and prioritize ideas based on shared criteria?"
    ],
    "Estratégia, Propósito & Impacto": [
      "Is the team aligned around clear priorities and how it contributes to the organization’s innovation strategy?",
      "Is the team’s purpose clear, inspiring and reflected in day-to-day decisions?"
    ]
  },

  "Organização": {
    "Cultura & Comportamentos": [
      "Does the organizational culture value experimentation, collaboration and continuous learning?",
      "Do leaders model behaviours aligned with innovation (e.g., openness to failure, active listening, curiosity)?"
    ],
    "Sistemas & Ferramentas": [
      "Does the organization have a structured innovation process (e.g., idea funnel, innovation portfolio, prioritization criteria)?",
      "Are there platforms and tools accessible to all teams to share, test and evolve ideas?"
    ],
    "Estratégia, Propósito & Impacto": [
      "Is the innovation strategy aligned with the organizational purpose and known by teams?",
      "Does the organization define clear innovation ambitions (e.g., targets, success indicators, expected impact)?"
    ]
  },

  "Ecossistema": {
    "Cultura & Comportamentos": [
      "Does the organization build relationships of trust and learning with external partners (e.g., startups, universities, customers)?",
      "Does it actively participate in communities of practice, events or inter-organizational co-creation forums?"
    ],
    "Sistemas & Ferramentas": [
      "Are there platforms or interfaces that enable collaboration with ecosystem actors (e.g., APIs, hubs, innovation portals)?",
      "Are there processes to capture external signals, map trends and incorporate external inputs into projects?"
    ],
    "Estratégia, Propósito & Impacto": [
      "Does the organization have a clear ecosystem engagement strategy (e.g., open innovation, venture client, strategic partnerships)?",
      "Do innovation objectives reflect mutual contribution between the organization and its external stakeholders?"
    ]
  },

  "Societal": {
    "Cultura & Comportamentos": [
      "Does the organization actively contribute to a broader culture of responsible innovation (e.g., public policy, collaborative networks, education)?",
      "Is it recognized as a reference or influencer in sustainable and human-centered innovation practices?"
    ],
    "Sistemas & Ferramentas": [
      "Does it participate in or lead open infrastructure initiatives for innovation (e.g., open data, experimentation platforms, shared spaces)?",
      "Does it contribute to the creation of norms, standards or regulations that enable responsible innovation at sector or global level?"
    ],
    "Estratégia, Propósito & Impacto": [
      "Does the organization’s purpose include a long-term, systemic contribution to society or the planet?",
      "Are there innovation goals aligned with global agendas (e.g., SDGs, ESG, green/digital transition)?"
    ]
  }
};

type AnswerMap = { [key: string]: number };
const LEVELS = ["Indivíduo", "Equipa", "Organização", "Ecossistema", "Societal"];

const DIMENSIONS = [
  "Cultura & Comportamentos",
  "Sistemas & Ferramentas",
  "Estratégia, Propósito & Impacto"
];

type Lang = "en" | "pt";

const I18N: Record<Lang, any> = {
  pt: {
    auditTitle: "Amplifying Innovation Audit",
    auditSubtitle:
      "Ferramenta de diagnóstico baseada no Amplifying Innovation Canvas",
    intro1:
      "Este audit baseia-se no Amplifying Innovation Canvas e explora a inovação a partir de 5 níveis de amplificação interdependentes: Indivíduo, Equipa, Organização, Ecossistema e Societal. A duração estimada é de ~10 minutos. No final, recebes um score de 1 a 10, um gráfico e algumas recomendações práticas.",
    intro2:
      "Em cada nível analisamos três dimensões: Cultura & Comportamentos, Sistemas & Ferramentas, e Estratégia, Propósito & Impacto.",
    intro3:
      "As respostas refletem a perceção de quem responde. Para um diagnóstico mais profundo e acionável, é fundamental cruzar diferentes pontos de vista e envolver vários níveis da organização e do ecossistema.",
    startAudit: "Começar o audit",
    sectionLabel: "Secção",
    startLevel: "Começar este nível",
    scale: "1 = Discordo totalmente · 5 = Concordo totalmente",
    questionOf: "Pergunta {x} de {y}",
    prev: "Anterior",
    next: "Seguinte",
    cont: "Continuar",
    almostThere: "Quase lá.",
    leadP:
      "Deixa-nos três dados para veres o teu nível de Amplifying Innovation, o gráfico e as recomendações. Também os usamos para te enviar eventualmente benchmarks e insights agregados. Não partilhamos os dados com terceiros.",
    backToQuiz: "Voltar ao questionário",
    saving: "A guardar...",
    seeResults: "Ver resultados",
    resultsTitle: "Nível de Amplifying Innovation",
    resultsIntro:
      "Este resultado oferece uma primeira perspetiva sobre o potencial de inovação amplificada da organização, à luz do Amplifying Innovation Canvas. Deve ser interpretado como um ponto de partida para reflexão e conversa — não como um diagnóstico fechado. Para um entendimento mais profundo e acionável, é fundamental cruzar diferentes pontos de vista e aprofundar cada nível com dados qualitativos.",
    resultsP:
      "Este score resulta da média dos cinco níveis avaliados: Indivíduo, Equipa, Organização, Ecossistema e Societal.",
    insightsTitle: "Leituras‑chave do diagnóstico",
    leverageDimsLabel: "Principais alavancas (dimensões)",
    topLevelLabel: "Nível com maior potencial imediato",
    riskLabel: "Principais riscos a endereçar",
    recsTitle: "5 recomendações para amplificar a inovação:",
    dimBarTitle: "Leitura por dimensão",
    dimBarIntro:
      "Este gráfico mostra a média das 3 dimensões do Canvas, agregada em todos os níveis. Ajuda a identificar onde existe maior alavancagem para reforçar a inovação.",

    footer: "Amplifying Innovation Audit · powered by imatch",
    levelIntro: {
      "Indivíduo": {
        title: "Nível Individual",
        body: [
          "Aqui estamos a avaliar o que acontece ao nível de cada colaborador.",
          "Pensa em atitudes, comportamentos, autonomia e capacidade de experimentar no dia a dia.",
          "Considera comportamentos, sistemas de suporte e alinhamento estratégico neste nível."
        ]
      },
      "Equipa": {
        title: "Nível de Equipa",
        body: [
          "Aqui o foco está nas dinâmicas coletivas dentro das equipas.",
          "Como colaboram, aprendem, decidem e transformam experiências em melhorias e inovação.",
          "Considera comportamentos, sistemas de suporte e alinhamento estratégico neste nível."
        ]
      },
      "Organização": {
        title: "Nível Organizacional",
        body: [
          "Aqui avaliamos a organização como um sistema.",
          "Estruturas, processos, liderança e recursos que sustentam (ou limitam) a inovação de forma consistente.",
          "Considera comportamentos, sistemas de suporte e alinhamento estratégico neste nível."
        ]
      },
      "Ecossistema": {
        title: "Nível de Ecossistema",
        body: [
          "Aqui olhamos para a forma como a organização aprende e inova com o exterior.",
          "Parcerias, clientes, startups, universidades e a capacidade de cocriar e integrar soluções.",
          "Considera comportamentos, sistemas de suporte e alinhamento estratégico neste nível."
        ]
      },
      "Societal": {
        title: "Nível Societal",
        body: [
          "Aqui ampliamos a perspetiva para o impacto mais alargado da inovação.",
          "Como propósito, escolhas e inovação contribuem para a sociedade, além dos resultados de negócio.",
          "Considera comportamentos, sistemas de suporte e alinhamento estratégico neste nível."
        ]
      }
    },
    levelLabel: {
      "Indivíduo": "Indivíduo",
      "Equipa": "Equipa",
      "Organização": "Organização",
      "Ecossistema": "Ecossistema",
      "Societal": "Societal"
    },
    dimLabel: {
      "Cultura & Comportamentos": "Cultura & Comportamentos",
      "Sistemas & Ferramentas": "Sistemas & Ferramentas",
      "Estratégia, Propósito & Impacto": "Estratégia, Propósito & Impacto"
    }
  },
  en: {
    auditTitle: "Amplifying Innovation Audit",
    auditSubtitle: "A diagnostic tool based on the Amplifying Innovation Canvas",
    intro1:
      "This audit is based on the Amplifying Innovation Canvas and explores innovation across five interdependent amplification levels: Individual, Team, Organization, Ecosystem and Societal. Estimated time: ~10 minutes. At the end, you’ll receive a 1–10 score, a chart, and practical recommendations.",
    intro2:
      "At each level, we assess three dimensions: Culture & Behaviours, Systems & Tools, and Strategy, Purpose & Impact.",
    intro3:
      "Your answers reflect your perception. For a deeper, more actionable diagnosis, it’s important to combine different perspectives and validate insights across multiple levels of the organization and ecosystem.",
    startAudit: "Start audit",
    sectionLabel: "Section",
    startLevel: "Start this level",
    scale: "1 = Strongly disagree · 5 = Strongly agree",
    questionOf: "Question {x} of {y}",
    prev: "Back",
    next: "Next",
    cont: "Continue",
    almostThere: "Almost there.",
    leadP:
      "Share three details to see your Amplifying Innovation level, the chart and recommendations. We may also use this to share future benchmarks and aggregated insights. We never share your data with third parties.",
    backToQuiz: "Back to questionnaire",
    saving: "Saving...",
    seeResults: "See results",
    resultsTitle: "Amplifying Innovation Level",
    resultsIntro:
      "This result provides a first perspective on the organization’s amplified innovation potential, based on the Amplifying Innovation Canvas. It should be seen as a starting point for reflection and conversation — not as a final diagnosis. For a deeper and more actionable understanding, it is essential to combine multiple perspectives and further explore each level with qualitative insights.",
    resultsP:
      "This score is the average across the five assessed levels: Individual, Team, Organization, Ecosystem and Societal.",
    insightsTitle: "Key diagnostic insights",
    leverageDimsLabel: "Main leverage dimensions",
    topLevelLabel: "Level with strongest immediate potential",
    riskLabel: "Primary risks to address",
    recsTitle: "5 recommendations to amplify innovation:",
    dimBarTitle: "Dimension reading",
    dimBarIntro:
      "This chart shows the average of the 3 dimensions of the Canvas, aggregated across all levels. It helps identify where there is the greatest leverage to strengthen innovation.",
    footer: "Amplifying Innovation Audit · powered by imatch",
    levelIntro: {
      "Indivíduo": {
        title: "Individual level",
        body: [
          "Here we assess what happens at the individual contributor level.",
          "Think about behaviours, autonomy, learning, and the ability to experiment day to day.",
          "Consider behaviours, enabling systems, and strategic alignment at this level."
        ]
      },
      "Equipa": {
        title: "Team level",
        body: [
          "Here the focus is on collective dynamics within teams.",
          "How teams collaborate, learn, decide, and turn experience into improvement and innovation.",
          "Consider behaviours, enabling systems, and strategic alignment at this level."
        ]
      },
      "Organização": {
        title: "Organizational level",
        body: [
          "Here we assess the organization as a system.",
          "Structures, processes, leadership and resources that sustain (or limit) consistent innovation.",
          "Consider behaviours, enabling systems, and strategic alignment at this level."
        ]
      },
      "Ecossistema": {
        title: "Ecosystem level",
        body: [
          "Here we look at how the organization learns and innovates with the outside world.",
          "Partners, customers, startups, universities, and the ability to co-create and integrate solutions.",
          "Consider behaviours, enabling systems, and strategic alignment at this level."
        ]
      },
      "Societal": {
        title: "Societal level",
        body: [
          "Here we broaden the perspective to innovation’s wider impact.",
          "How purpose, choices and innovation contribute to society beyond business results.",
          "Consider behaviours, enabling systems, and strategic alignment at this level."
        ]
      }
    },
    levelLabel: {
      "Indivíduo": "Individual",
      "Equipa": "Team",
      "Organização": "Organization",
      "Ecossistema": "Ecosystem",
      "Societal": "Societal"
    },
    dimLabel: {
      "Cultura & Comportamentos": "Culture & Behaviours",
      "Sistemas & Ferramentas": "Systems & Tools",
      "Estratégia, Propósito & Impacto": "Strategy, Purpose & Impact"
    }
  }
};

function levelLabel(nivel: string, lang: Lang) {
  return I18N[lang].levelLabel[nivel] || nivel;
}

function dimLabel(dim: string, lang: Lang) {
  return I18N[lang].dimLabel[dim] || dim;
}

/**
 * Recomendações por faixa de score (PT & EN)
 */
function getRecommendations(score: number, lang: Lang): string[] {
  const pt = {
    low: [
      "Clarificar o propósito e a ambição de inovação e comunicá-los de forma simples a toda a organização.",
      "Criar um canal único e acessível para recolha e acompanhamento de ideias.",
      "Identificar champions de inovação em áreas-chave e dar-lhes espaço e mandato.",
      "Lançar um primeiro desafio interno com prazo curto e decisão rápida.",
      "Introduzir um ritual de partilha de aprendizagens focado em experiências e não apenas em resultados."
    ],
    midlow: [
      "Estruturar um funil básico de inovação com etapas e critérios claros.",
      "Garantir sprints de inovação regulares em equipas ou unidades prioritárias.",
      "Mapear ferramentas já existentes e consolidar as que melhor suportam a colaboração.",
      "Criar mecanismos simples de priorização de ideias com base em impacto e esforço.",
      "Iniciar pelo menos uma parceria externa focada num desafio concreto."
    ],
    mid: [
      "Criar um portefólio visível de projetos de inovação com estado e responsáveis.",
      "Definir KPIs simples de inovação e acompanhá-los com cadência regular.",
      "Integrar ferramentas de IA e automação em processos de ideação, análise ou teste.",
      "Envolver a liderança intermédia como facilitadora ativa das iniciativas.",
      "Formalizar um programa de desenvolvimento de competências em inovação."
    ],
    high: [
      "Ligar o portefólio de inovação diretamente às prioridades estratégicas e métricas de negócio.",
      "Refinar a governança de inovação, com fóruns, decisões e ciclos de revisão bem definidos.",
      "Expandir iniciativas transversais que cruzem unidades, funções e geografias.",
      "Desenvolver um modelo de competências de Amplified Innovation com trilhos claros.",
      "Aprofundar a atuação no ecossistema através de programas e parcerias estruturadas."
    ],
    top: [
      "Investir em foresight e exploração sistemática de futuros para alimentar a inovação.",
      "Explorar modelos de corporate venturing e venture client com startups e scaleups.",
      "Experimentar novas formas de captura de valor (dados, plataformas, subscrição, impacto).",
      "Partilhar práticas e frameworks de inovação como referência no ecossistema.",
      "Rever regularmente o framework de Amplified Innovation para manter a vantagem competitiva."
    ]
  };

  const en = {
    low: [
      "Clarify the organization’s purpose and innovation ambition and communicate it simply across the company.",
      "Create a single, accessible channel to capture ideas and provide feedback/visibility.",
      "Identify innovation champions in key areas and give them time and mandate.",
      "Run a first internal challenge with a short deadline and fast decision-making.",
      "Introduce a learning ritual focused on experiments and insights—not only outcomes."
    ],
    midlow: [
      "Set up a basic innovation funnel with clear steps and criteria.",
      "Ensure regular innovation sprints in priority teams or business units.",
      "Map existing tools and consolidate the ones that best support collaboration.",
      "Create simple prioritization rules based on impact vs. effort.",
      "Start at least one external partnership focused on a concrete challenge."
    ],
    mid: [
      "Create a visible innovation portfolio with status and clear owners.",
      "Define simple innovation KPIs and review them with a regular cadence.",
      "Integrate AI and automation into ideation, analysis, or testing workflows.",
      "Engage middle management as active enablers of innovation initiatives.",
      "Formalize an innovation capability-building program."
    ],
    high: [
      "Connect the innovation portfolio directly to strategic priorities and business metrics.",
      "Refine innovation governance with clear forums, decisions, and review cycles.",
      "Scale cross-functional initiatives that connect units, functions, and geographies.",
      "Develop an Amplified Innovation capability model with clear learning paths.",
      "Deepen ecosystem engagement through structured programs and partnerships."
    ],
    top: [
      "Invest in foresight and systematic exploration of futures to fuel innovation.",
      "Explore corporate venturing and venture-client models with startups and scaleups.",
      "Experiment with new value-capture models (data, platforms, subscriptions, impact).",
      "Share practices and frameworks as a reference in the ecosystem.",
      "Regularly revisit the Amplified Innovation framework to sustain competitive advantage."
    ]
  };

  const bank = lang === "pt" ? pt : en;

  if (score <= 2) return bank.low;
  if (score <= 4) return bank.midlow;
  if (score <= 6) return bank.mid;
  if (score <= 8) return bank.high;
  return bank.top;
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
  const [lang, setLang] = useState<"en" | "pt">("en");
  const t = I18N[lang];
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

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
        dims[dim].forEach((perguntaPT, idx) => {
          const pergunta =
            lang === "en"
              ? (questionsByLevelEN?.[nivel]?.[dim]?.[idx] ?? perguntaPT)
              : perguntaPT;
          const key = `${nivel}|${dim}|${idx}`;
          list.push({ nivel, dim, pergunta, key });
        });
      });
    });
    return list;
  }, [lang]);

  type StepItem =
    | { type: "intro-general" }
    | { type: "intro-level"; nivel: string }
    | { type: "question"; qIndex: number };

  const steps: StepItem[] = useMemo(() => {
    const s: StepItem[] = [{ type: "intro-general" }];
    LEVELS.forEach((nivel) => {
      s.push({ type: "intro-level", nivel });
      flatQuestions
        .map((q, idx) => ({ q, idx }))
        .filter(({ q }) => q.nivel === nivel)
        .forEach(({ idx }) => s.push({ type: "question", qIndex: idx }));
    });
    return s;
  }, [flatQuestions]);

  const totalQuestions = flatQuestions.length;
  const totalSteps = steps.length;
  const currentStep = steps[step];
  const currentQuestion =
    currentStep?.type === "question" ? flatQuestions[currentStep.qIndex] : null;

  function handleAnswerChange(value: number) {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.key]: value }));
  }

  function canGoNext() {
    if (!currentStep) return false;
    if (currentStep.type === "intro-general" || currentStep.type === "intro-level") return true;
    return currentQuestion ? answers[currentQuestion.key] != null : false;
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
    // Média por dimensão (agregado em todos os níveis)
    const dimensionRaw: { [dim: string]: number[] } = {};
    DIMENSIONS.forEach((d) => (dimensionRaw[d] = []));

    LEVELS.forEach((nivel) => {
      DIMENSIONS.forEach((dim) => {
        const k = `${nivel}|${dim}`;
        if (dimScores[k] != null) dimensionRaw[dim].push(dimScores[k]);
      });
    });

    const dimensionBarData = DIMENSIONS.map((dim) => {
      const arr = dimensionRaw[dim] || [];
      const avg = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
      return {
        dim,          // chave interna
        score: (avg / 5) * 100 // 0–100 para ser consistente com o radar
      };
    });
    const radarData = LEVELS.map((nivel) => ({
      nivel: levelLabel(nivel, lang),
      score: (levelScoresRaw[nivel] / 5) * 100
    }));

    const vals = Object.values(levelScoresRaw);
    const globalRaw =
      vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
    const amplifiedScore = Math.round((globalRaw / 5) * 10);

    return {
      levelScoresRaw,
      radarData,
      dimensionBarData,
      amplifiedScore
    };
  }

  const allAnswered =
    Object.keys(answers).length === totalQuestions;

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
          scoring,
          privacyAccepted,
          privacyAcceptedAt: new Date().toISOString(),
          marketingOptIn,
          marketingOptInAt: marketingOptIn ? new Date().toISOString() : null
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
  <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "#444" }}>
    <input
      type="checkbox"
      checked={privacyAccepted}
      onChange={(e) => setPrivacyAccepted(e.target.checked)}
      required
      style={{ marginTop: 3 }}
    />
    <span>
      Li e aceito a{" "}
      <a
        href="https://imatchcc-my.sharepoint.com/personal/pr_imatch_pt/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fpr%5Fimatch%5Fpt%2FDocuments%2FPrivacy%20Policy%2Epdf&parent=%2Fpersonal%2Fpr%5Fimatch%5Fpt%2FDocuments&ga=1"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "underline" }}
      >
        Política de Privacidade
      </a>
      .
    </span>
  </label>




  const scoring = showResults ? computeScores() : null;
  const radarData = scoring?.radarData || [];
  const dimensionBarData = scoring?.dimensionBarData || [];
  const amplifiedScore = scoring?.amplifiedScore || 0;

  // Insights calculations
  const topDims = [...dimensionBarData]
    .sort((a: any, b: any) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 2);

  const topLevel = [...radarData]
    .sort((a: any, b: any) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 1)[0];

  const riskDim = [...dimensionBarData]
    .sort((a: any, b: any) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, 1)[0];

  const riskLevel = [...radarData]
    .sort((a: any, b: any) => (a.score ?? 0) - (b.score ?? 0))
    .slice(0, 1)[0];
  const recs = showResults ? getRecommendations(amplifiedScore, lang) : [];
  const questionNumber = currentStep?.type === "question" ? currentStep.qIndex + 1 : 0;
  const progressPct =
    currentStep?.type === "question"
      ? Math.round((questionNumber / totalQuestions) * 100)
      : 0;
  return (
    <div className={`${auditStyles.page} ${auditStyles.pageIntro}`}>
      <div className={auditStyles.container}>
        <div className={auditStyles.langBar}>
          <div className={auditStyles.langToggle}>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`${auditStyles.langBtn} ${lang === "en" ? auditStyles.langBtnActive : ""}`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("pt")}
              className={`${auditStyles.langBtn} ${lang === "pt" ? auditStyles.langBtnActive : ""}`}
              aria-label="Mudar para Português"
            >
              PT
            </button>
          </div>
        </div>
        {(currentStep?.type === "intro-general" || showLeadForm || showResults) && (
          <header style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
              {t.auditTitle}
            </h1>
            <p className={auditStyles.muted} style={{ marginTop: 0, marginBottom: 12, fontSize: 13 }}>
              {t.auditSubtitle}
            </p>

            {!showResults && (
              <>
                <p style={{ maxWidth: 760, fontSize: 14, lineHeight: 1.6 }}>
                  {t.intro1}
                </p>
                <p style={{ maxWidth: 760, fontSize: 14, lineHeight: 1.6 }}>
                  {t.intro2}
                </p>
                <p style={{ maxWidth: 760, fontSize: 14, lineHeight: 1.6, color: "#666" }}>
                  {t.intro3}
                </p>
              </>
            )}

            {currentStep?.type === "intro-general" && !showResults && (
              <button
                onClick={next}
                className={`${auditStyles.btnPrimary} ${auditStyles.btnPrimaryAccent}`}
              >
                {t.startAudit}
              </button>
            )}
          </header>
        )}

        {/* PERgUNTAS + INTROS */}
        {!showResults && !showLeadForm && (
          <main>
            {/* INTRO POR NÍVEL */}
            {currentStep?.type === "intro-level" && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                  {t.sectionLabel}: {levelLabel(currentStep.nivel, lang)}
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                  {t.levelIntro[currentStep.nivel]?.title || levelLabel(currentStep.nivel, lang)}
                </h2>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: "#333", maxWidth: 760 }}>
                  {(t.levelIntro[currentStep.nivel]?.body || []).map((bodyTxt: string, i: number) => (
                    <p key={i} style={{ marginBottom: 10 }}>
                      {bodyTxt}
                    </p>
                  ))}
                </div>
                <button
                  onClick={next}
                  className={`${auditStyles.btnPrimary} ${auditStyles.btnPrimaryAccent}`}
                >
                  {t.startLevel}
                </button>
              </div>
            )}

            {/* PERGUNTA */}
            {currentStep?.type === "question" && currentQuestion && (
              <>
                <div className={auditStyles.progressWrap}>
                  <div className={auditStyles.progressTop}>
                    <span>
                      {t.questionOf
                        .replace("{x}", String(questionNumber))
                        .replace("{y}", String(totalQuestions))}· {progressPct}%
                    </span>
                    <span>
                      {levelLabel(currentQuestion.nivel, lang)} · {dimLabel(currentQuestion.dim, lang)}
                    </span>
                  </div>
                  <div className={auditStyles.progressTrack}>
                    <div
                      className={auditStyles.progressFill}
                      style={{ width: `${progressPct}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 4, color: "#222" }}>{currentQuestion.pergunta}</p>
                  <p style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>
                    {t.scale}
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[1, 2, 3, 4, 5].map((v) => {
                      const selected = answers[currentQuestion.key] === v;
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

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
                  <button
                    onClick={prev}
                    disabled={step === 0}
                    className={auditStyles.btnGhost}
                  >
                    {t.prev}
                  </button>
                  <button
                    onClick={next}
                    disabled={!canGoNext()}
                    className={`${auditStyles.btnPrimary} ${auditStyles.btnPrimaryAccent}`}
                  >
                    {step === totalSteps - 1 ? t.cont : t.next}
                  </button>
                </div>
              </>
            )}
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
              {t.almostThere}
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#555",
                marginBottom: 16,
                maxWidth: 520
              }}
            >
              {t.leadP}
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
              {/* PRIVACY – obrigatório */}
              <label className={auditStyles.privacy}>
                <input
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  required
                />
                <span>
                  {lang === "pt" ? (
                    <>
                      Li e aceito a{" "}
                      <a
                        href="https://imatchcc-my.sharepoint.com/personal/pr_imatch_pt/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fpr%5Fimatch%5Fpt%2FDocuments%2FPrivacy%20Policy%2Epdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Política de Privacidade
                      </a>{" "}
                      da imatch.
                    </>
                  ) : (
                    <>
                      I have read and accept imatch’s{" "}
                      <a
                        href="https://imatchcc-my.sharepoint.com/personal/pr_imatch_pt/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fpr%5Fimatch%5Fpt%2FDocuments%2FPrivacy%20Policy%2Epdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Privacy Policy
                      </a>.
                    </>
                  )}
                </span>
              </label>

              {/* MARKETING – opcional */}
              <label className={auditStyles.privacySecondary}>
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                />
                <span>
                  {lang === "pt"
                    ? "Quero receber informações sobre atividades e iniciativas desenvolvidas pela imatch."
                    : "I would like to receive information about activities and initiatives developed by imatch."}
                </span>
              </label>
              {submitError && (
                <p style={{ color: "red", fontSize: 13 }}>{submitError}</p>
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowLeadForm(false)}
                  className={auditStyles.btnGhost}
                >
                  {t.backToQuiz}
                </button>
                <button
                  type="submit"
                  disabled={submitting || !privacyAccepted}
                  className={`${auditStyles.btnPrimary} ${auditStyles.btnPrimaryAccent}`}
                >
                  {submitting ? t.saving : t.seeResults}
                </button>
              </div>
            </form>
          </main>
        )}

 {/* RESULTADOS */}
{showResults && scoring && (
  <main>
    <div className={auditStyles.printHeader}>
      <div className={auditStyles.printBrand}>
        <strong>Amplifying Innovation Audit powered by imatch</strong>
      </div>
      <div className={auditStyles.printMeta}>
        {company ? `Empresa: ${company}` : ""}
        {company && role ? " · " : ""}
        {role ? `Função: ${role}` : ""}
      </div>
    </div>

    <section style={{ marginBottom: 24 }}>
      <p
        className={auditStyles.muted}
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          maxWidth: 760,
          marginBottom: 16
        }}
      >
        {t.resultsIntro}
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
        {t.resultsTitle}: {amplifiedScore} / 10
      </h2>

      <p style={{ fontSize: 14, color: "#555" }}>{t.resultsP}</p>
    </section>

    <section style={{ marginBottom: 18 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
        {t.insightsTitle}
      </h3>
      <ul
        style={{
          paddingLeft: 18,
          margin: 0,
          lineHeight: 1.7,
          fontSize: 13,
          color: "#555"
        }}
      >
        <li>
          <strong>{t.leverageDimsLabel}:</strong>{" "}
          {topDims.map((d: any) => dimLabel(String(d.dim), lang)).join(", ")}
        </li>
        <li>
          <strong>{t.topLevelLabel}:</strong> {topLevel?.nivel ?? "—"}
        </li>
        <li>
          <strong>{t.riskLabel}:</strong>{" "}
          {riskDim ? dimLabel(String(riskDim.dim), lang) : "—"} ·{" "}
          {riskLevel?.nivel ?? "—"}
        </li>
      </ul>
    </section>

    <section style={{ width: "100%", height: 320, marginBottom: 24 }}>
      <ResponsiveContainer>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="nivel" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name={t.resultsTitle}
            dataKey="score"
            stroke="#111111"
            fill="#111111"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </section>

    <section style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
        {t.dimBarTitle}
      </h3>
      <p
        className={auditStyles.muted}
        style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 760, marginBottom: 12 }}
      >
        {t.dimBarIntro}
      </p>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={dimensionBarData} barCategoryGap={"55%"}>
            <CartesianGrid stroke="#e8e8e8" strokeDasharray="3 3" />
            <XAxis
              dataKey="dim"
              tickFormatter={(d) => dimLabel(d, lang)}
              tick={{ fontSize: 12, fill: "#666" }}
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#666" }} />
            <Tooltip
              formatter={(v: any) => [`${Math.round(v)}%`, "Score"]}
              labelFormatter={(l: any) => dimLabel(String(l), lang)}
            />
            <Bar
              dataKey="score"
              barSize={22}
              fill="#111"
              fillOpacity={0.28}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <button onClick={() => window.print()} className={auditStyles.btnSecondary}>
        Guardar PDF
      </button>
    </section>

    <section>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
        {t.recsTitle}
      </h3>
      <ul style={{ paddingLeft: 18, fontSize: 14, lineHeight: 1.6 }}>
        {recs.map((r, idx) => (
          <li key={idx}>{r}</li>
        ))}
      </ul>
    </section>

    <div className={auditStyles.imatchCta}>
      <p className={auditStyles.imatchCtaIntro}>
        Queres aprofundar este diagnóstico?
      </p>
      <a
        href="https://www.imatch.pt"
        target="_blank"
        rel="noopener noreferrer"
        className={auditStyles.imatchLink}
      >
        Conhecer a imatch · innovation collective
      </a>
    </div>
  </main>
)}
<footer className={auditStyles.footer}>
  {t.footer}
</footer>
      </div >
    </div >
  );
}