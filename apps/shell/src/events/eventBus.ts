import {
  APP_EVENTS,
  type UserChangedDetail,
} from './appEvents';

export function publishUserChanged(
  user: UserChangedDetail,
) {
  window.dispatchEvent(
    new CustomEvent<UserChangedDetail>(
      APP_EVENTS.USER_CHANGED,
      {
        detail: user,
      },
    ),
  );
}