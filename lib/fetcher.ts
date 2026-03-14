type FetcherOptions = RequestInit & {
  token?: string | null;
};


export async function fetcher(
  url: string,
  options: FetcherOptions = {}
) {
  const { token, ...fetchOptions } = options;


  const headers = new Headers(fetchOptions.headers);


  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }


  const res = await fetch(url, {
    ...fetchOptions,
    headers,
  });


//   if (!res.ok) {
//     throw new Error("API Error");
//   }


//   return res.json();
  return res;
}

