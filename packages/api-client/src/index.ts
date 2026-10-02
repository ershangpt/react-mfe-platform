export type TokenProvider = () => string | null;

export type ApiClientOptions = {
  baseUrl: string;
  getAccessToken?: TokenProvider;
};

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN";

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: ApiErrorCode;

  constructor(message: string, status: number, code: ApiErrorCode) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export function createApiClient({ baseUrl, getAccessToken }: ApiClientOptions) {
  async function request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers = new Headers(options.headers);

    headers.set("Accept", "application/json");

    if (options.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const token = getAccessToken?.();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let code: ApiErrorCode = "UNKNOWN";

      if (response.status === 400) {
        code = "BAD_REQUEST";
      } else if (response.status === 401) {
        code = "UNAUTHORIZED";
      } else if (response.status === 403) {
        code = "FORBIDDEN";
      } else if (response.status === 404) {
        code = "NOT_FOUND";
      } else if (response.status >= 500) {
        code = "SERVER_ERROR";
      }

      throw new ApiError(
        `API request failed: ${response.status}`,
        response.status,
        code,
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  return {
    request,
  };
}
