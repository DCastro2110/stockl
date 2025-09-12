'use client';

import { useEffect } from 'react';

import { setTimezone } from '@/app/_actions/user/set-timezone';

export function SetUserInfo() {
  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        await setTimezone({ timezone });
      }
    })();
  }, []);

  return <></>;
}
