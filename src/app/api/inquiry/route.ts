import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const recipients = {
  david: ["davide@admiralenergy.ai"],
  leigh: ["leighnicoleedwards97@gmail.com"],
  both: ["davide@admiralenergy.ai", "leighnicoleedwards97@gmail.com"],
} as const;

const purposeLabels = {
  "paid-project": "Paid Project",
  "marketing-baseline": "Marketing Baseline",
  "job-contract": "Job / Contract Opportunity",
  collaboration: "Collaboration / Partnership",
  general: "General Inquiry",
} as const;

const partnerLabels = { david: "David", leigh: "Leigh", both: "Both" } as const;
const buckets = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\0/g, "").trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
}

function validUrl(value: string) {
  if (!value) return true;
  try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; } catch { return false; }
}

function rateLimited(key: string) {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) { buckets.set(key, { count: 1, resetAt: now + 10 * 60_000 }); return false; }
  existing.count += 1;
  return existing.count > 5;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 24_000) return NextResponse.json({ error: "The inquiry is too large." }, { status: 413 });

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.nextUrl.host) return NextResponse.json({ error: "This request origin is not allowed." }, { status: 403 });

  const ip = request.headers.get("x-nf-client-connection-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "Too many inquiries were sent from this connection. Please wait ten minutes or use a direct email link." }, { status: 429 });

  let raw: Record<string, unknown>;
  try { raw = await request.json(); } catch { return NextResponse.json({ error: "The inquiry could not be read." }, { status: 400 }); }
  if (clean(raw.company_site, 200)) return NextResponse.json({ ok: true });

  const data = {
    name: clean(raw.name, 100),
    email: clean(raw.email, 254).toLowerCase(),
    phone: clean(raw.phone, 40),
    company: clean(raw.company, 150),
    role: clean(raw.role, 120),
    website: clean(raw.website, 500),
    purpose: clean(raw.purpose, 40),
    opportunityType: clean(raw.opportunity_type, 200),
    partner: clean(raw.partner, 20),
    budget: clean(raw.budget, 100),
    timeline: clean(raw.timeline, 100),
    context: clean(raw.context, 200),
    referenceUrl: clean(raw.reference_url, 500),
    message: clean(raw.message, 5000),
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.name.length < 2 || !emailPattern.test(data.email) || !data.company || !data.opportunityType || !data.timeline || data.message.length < 20) {
    return NextResponse.json({ error: "Please complete every required field with valid information." }, { status: 400 });
  }
  if (!(data.purpose in purposeLabels) || !(data.partner in recipients)) return NextResponse.json({ error: "Choose a valid inquiry purpose and preferred partner." }, { status: 400 });
  if (!validUrl(data.website) || !validUrl(data.referenceUrl)) return NextResponse.json({ error: "Website and reference links must begin with http:// or https://." }, { status: 400 });

  const purpose = data.purpose as keyof typeof purposeLabels;
  const partner = data.partner as keyof typeof recipients;
  const rows = [
    ["Purpose", purposeLabels[purpose]], ["Preferred partner", partnerLabels[partner]], ["Name", data.name], ["Email", data.email],
    ["Phone", data.phone], ["Company / organization", data.company], ["Role / job title", data.role], ["Website", data.website],
    ["Project / opportunity type", data.opportunityType], ["Budget", data.budget], ["Timeline", data.timeline], ["Relevant project / service", data.context],
    ["Opportunity / reference URL", data.referenceUrl], ["Message", data.message],
  ].filter(([, value]) => value);
  const textBody = rows.map(([label, value]) => `${label}:\n${value}`).join("\n\n");
  const htmlBody = `<h1>Studio Admiral inquiry</h1>${rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`).join("")}`;

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return NextResponse.json({ error: "Email delivery is not configured yet. Please use David or Leigh’s direct email link on this page." }, { status: 503 });

  const subject = `[Studio Admiral] ${purposeLabels[purpose]} — ${partnerLabels[partner]} — ${data.company}`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "User-Agent": "studio-admiral-site/1.0", "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify({ from, to: recipients[partner], subject, text: textBody, html: htmlBody, reply_to: data.email }),
  });

  if (!response.ok) {
    console.error("Resend delivery failed", response.status, await response.text());
    return NextResponse.json({ error: "Email delivery failed. Please try again or use a direct email link." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
