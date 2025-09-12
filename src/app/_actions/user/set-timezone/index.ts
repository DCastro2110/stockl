'use server';

import dayjs from 'dayjs';
import { cookies } from 'next/headers';

import { ISetUserTimezone, setUserTimezoneSchema } from './schema';

export async function setTimezone({ timezone }: ISetUserTimezone) {
  setUserTimezoneSchema.parse({ timezone });

  const cookieStore = await cookies();
  cookieStore.set('timezone', timezone, {
    priority: 'high',
    expires: dayjs().add(1, 'day').toDate(),
  });
}
