import { useCallback, useEffect, useState } from 'react';
import useFetch, { CachePolicies } from 'use-http';
import { parseISO } from 'date-fns';
import { User } from './useGoogleAuth';
import { Event } from '../types';
import useIsMounted from './useIsMounted';

type RawEvent = {
  id: string;
  summary: string;
  start: { dateTime: string; date: string };
  end: { dateTime: string; date: string };
};
type Response = {
  items?: RawEvent[];
};

const toEvent = (e: RawEvent): Event => ({
  id: e.id,
  title: e.summary,
  start: e.start.dateTime ? parseISO(e.start.dateTime) : parseISO(e.start.date),
  end: e.end.dateTime ? parseISO(e.end.dateTime) : parseISO(e.end.date),
});

export default function useEvents(
  user: User,
  calendarIds: Set<string>,
  start: Date,
  end: Date
) {
  const [events, setEvents] = useState<Record<string, Event[]>>({});
  const isMounted = useIsMounted();
  const { get } = useFetch<Response>(
    'https://www.googleapis.com/calendar/v3/calendars',
    {
      headers: {
        Authorization: user ? `Bearer ${user.auth.access_token}` : '',
      },
      cachePolicy: CachePolicies.NO_CACHE,
    }
  );
  const getEvent = useCallback(
    (id: string, s: Date, e: Date) =>
      get(
        `${encodeURIComponent(
          id
        )}/events?timeMin=${s?.toISOString()}&timeMax=${e?.toISOString()}`
      ).then((res) => {
        if (isMounted() && res.items) {
          setEvents((evs) => ({
            ...evs,
            [id]: res.items?.map(toEvent) || [],
          }));
        }
      }),
    [isMounted, setEvents, get]
  );

  const refresh = useCallback(() => {
    calendarIds.forEach((id) => {
      getEvent(id, start, end);
    });
  }, [calendarIds, getEvent]);

  useEffect(() => {
    setEvents((e) =>
      Object.keys(e)
        .filter((id) => calendarIds.has(id))
        .reduce(
          (obj, key) => ({
            ...obj,
            [key]: e[key],
          }),
          {} as Record<string, Event[]>
        )
    );
    refresh();
  }, [calendarIds]);

  return { events, refresh };
}
