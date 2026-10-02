export const APP_EVENTS = {
  USER_CHANGED: 'app:user-changed',
} as const;

export type UserChangedDetail = {
  id: string;
  name: string;
  tenant: string;
};