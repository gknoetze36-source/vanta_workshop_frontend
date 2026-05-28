function normalizeApiBaseUrl(value?: string) {
  const trimmed = (value || "").trim().replace(/\/$/, "");
  if (!trimmed) return "https://vanta-automation.up.railway.app";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export const API_BASE_URL = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL);
