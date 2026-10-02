export type RuntimeConfig = {
  PRODUCT_MFE_URL: string;
  ORDER_MFE_URL: string;
  API_BASE_URL: string;
};

declare global {
  interface Window {
    __APP_CONFIG__: RuntimeConfig;
  }
}

export function getRuntimeConfig(): RuntimeConfig {
  if (!window.__APP_CONFIG__) {
    throw new Error('Runtime configuration is missing');
  }

  return window.__APP_CONFIG__;
}