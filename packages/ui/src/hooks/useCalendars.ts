import { useContext, useEffect } from 'react';
import useFetch from 'use-http';
import { Calendar } from '../types';
import { SettingsContext } from '../SettingsContext';
import { User } from './useGoogleAuth';

type RawCalendar = {
  id: string;
  summary: string;
  selected: boolean;
  primary: boolean;
  backgroundColor: string;
  foregroundColor: string;
};

type Response = {
  items: RawCalendar[];
};

const toCalendar = (raw: RawCalendar): Calendar => ({
  id: raw.id,
  summary: raw.summary,
  backgroundColor: raw.backgroundColor,
  foregroundColor: raw.foregroundColor,
  displayed: raw.selected,

  selected: raw.selected,
  primary: raw.primary,
});

function mergeCalendars(
  oldCalendars: Record<string, Calendar>,
  res: Response
): Record<string, Calendar> {
  const oldKeys = new Set(Object.keys(oldCalendars));
  if (!res.items) {
    return oldCalendars;
  }
  if (
    oldKeys.size === res.items.length &&
    res.items.every((c) => oldKeys.has(c.id))
  ) {
    return oldCalendars;
  }

  return res.items.reduce((acc, cal) => {
    acc[cal.id] = oldCalendars[cal.id] || toCalendar(cal);
    return acc;
  }, {});
}

export default function useCalendars(user: User) {
  const { setSettings, settings } = useContext(SettingsContext);

  const { get, loading } = useFetch<Response>(
    'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    {
      headers: {
        Authorization: user ? `Bearer ${user.auth.access_token}` : '',
      },
    }
  );

  useEffect(() => {
    if (user) {
      get().then((res) => {
        setSettings((s) => {
          return {
            ...s,
            user: {
              ...s.user,
              calendars: mergeCalendars(s.user.calendars, res),
            },
          };
        });
      });
    }
  }, [user]);

  return { calendars: settings.user.calendars, loading };
}
