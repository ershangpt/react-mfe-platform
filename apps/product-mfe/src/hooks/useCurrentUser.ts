import { useEffect, useState } from 'react';

const USER_CHANGED_EVENT = 'app:user-changed';

type UserChangedDetail = {
  id: string;
  name: string;
  tenant: string;
};

export function useCurrentUser() {
  const [user, setUser] = useState<UserChangedDetail | null>(null);

  useEffect(() => {
    console.log('[Product] registering listener');

    const handleUserChanged = (event: Event) => {
      console.log('[Product] EVENT RECEIVED', event);

      const customEvent =
        event as CustomEvent<UserChangedDetail>;

      console.log('[Product] payload:', customEvent.detail);

      setUser(customEvent.detail);
    };

    window.addEventListener(
      USER_CHANGED_EVENT,
      handleUserChanged,
    );

    return () => {
      console.log('[Product] removing listener');

      window.removeEventListener(
        USER_CHANGED_EVENT,
        handleUserChanged,
      );
    };
  }, []);

  return user;
}