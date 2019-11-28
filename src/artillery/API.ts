const CLIENT_ID = encodeURIComponent(process.env.REACT_APP_CLIENT_ID!);
const CLIENT_SECRET = encodeURIComponent(process.env.REACT_APP_CLIENT_SECRET!);
const API_BASE = process.env.REACT_APP_API_BASE!;

export const fetchToken = async () => {
  saveToken(
    (
      await (
        await fetch(
          `${API_BASE}/auth/?client_id=` +
            `${CLIENT_ID}&client_secret=${CLIENT_SECRET}` +
            "&grant_type=client_credentials",
          { method: "post" }
        )
      ).json()
    ).access_token as string
  );
};

const saveToken = (token: string) => localStorage.setItem("n95_token", token);
export const loadToken = (): string => localStorage.getItem("n95_token")!;

export const fetchWithToken = async (
  url: string,
  second: boolean = false
): Promise<Response> => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${loadToken()}`,
      "Content-Type": "application/json"
    }
  });

  if (res.status === 401 && !second) {
    // token is too old
    await fetchToken();

    const retryRes = await fetchWithToken(url, true);

    if (retryRes.status === 401) {
      throw retryRes;
    }

    return retryRes;
  }

  return res;
};

export interface LoginResponse {
  count: number;
  next: any;
  previous: any;
  results: Array<{
    pk: number;
    first_name: string;
    last_name: string;
    saldo: number;
  }>;
}

export const login = async (rfid: string) =>
  (await (
    await fetchWithToken(`${API_BASE}/usersaldo/?rfid=${rfid}`)
  ).json()) as LoginResponse;
