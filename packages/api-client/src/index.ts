export type TokenProvider = () => string | null;

export type ApiClientOptions = {
  baseUrl: string;
  getAccessToken?: TokenProvider;
};

export function createApiClient({
  baseUrl,
  getAccessToken,
}: ApiClientOptions) {
  async function request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers = new Headers(options.headers);

    headers.set('Content-Type', 'application/json');

    const token = getAccessToken?.();

    if (token) {
      headers.set(
        'Authorization',
        `Bearer ${token}`,
      );
    }

    const response = await fetch(
      `${baseUrl}${path}`,
      {
        ...options,
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status}`,
      );
    }

    return response.json() as Promise<T>;
  }

  return {
    request,
  };
}