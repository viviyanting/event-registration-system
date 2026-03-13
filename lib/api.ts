export async function apiFetch(
  url: string,
  options?: RequestInit
) {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}
