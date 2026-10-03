import { registerRemotes } from '@module-federation/enhanced/runtime';

export function registerMfeRemotes() {
  const config = window.__APP_CONFIG__;

  registerRemotes([
    {
      name: 'product',
      entry: `${config.PRODUCT_MFE_URL}/remoteEntry.js`,
    },
  ]);
}