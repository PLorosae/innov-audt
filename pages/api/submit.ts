import type { NextApiRequest, NextApiResponse } from "next";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    return res
      .status(500)
      .json({ error: "Airtable env vars not configured" });
  }

  try {
    const { email, company, role, answers, scoring } = req.body;

    const createdAt = new Date().toISOString();

    const fields: Record<string, any> = {
      Email: email,
      Empresa: company,
      Função: role,
      DataHora: createdAt,
      ScoreGlobal: scoring?.amplifiedScore ?? null,
      Score_Indivíduo: scoring?.levelScoresRaw?.["Indivíduo"] ?? null,
      Score_Equipa: scoring?.levelScoresRaw?.["Equipa"] ?? null,
      Score_Organização: scoring?.levelScoresRaw?.["Organização"] ?? null,
      Score_Ecossistema: scoring?.levelScoresRaw?.["Ecossistema"] ?? null,
      Score_O_Todo: scoring?.levelScoresRaw?.["O Todo"] ?? null,
      RespostasJSON: JSON.stringify(answers),
      RadarJSON: JSON.stringify(scoring?.radarData || [])
    };

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME
    )}`;

    const airtableRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fields })
    });

    if (!airtableRes.ok) {
      const text = await airtableRes.text();
      console.error("Airtable error:", text);
      return res
        .status(500)
        .json({ error: "Failed to save to Airtable" });
    }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Unexpected error" });
  }
}