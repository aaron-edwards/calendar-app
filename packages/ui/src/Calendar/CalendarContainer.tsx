import { addWeeks, startOfWeek, parseISO, startOfDay, addDays } from 'date-fns';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useFetch } from 'use-http';
import { useMediaQuery } from '@mui/material';
import useTime from '../hooks/useTime';
import { SettingsContext } from '../SettingsContext';
import CalendarPage from './Calendar';
import { Event } from '../types';
import { User } from '../hooks/useGoogleAuth';

const UPDATE_TIME = 60_000 * 5;
const WEEK_STARTS_ON = 1;

type Events = Record<string, Event[]>;

export default function CalendarContainer({ user }: { user: User }) {
  const {
    settings: { calendar },
  } = useContext(SettingsContext);
  const currentTime = useTime(UPDATE_TIME);
  const [events, setEvents] = useState<Events>({});
  const mobile = useMediaQuery('(max-width:600px)');
  const start = mobile
    ? startOfDay(currentTime)
    : startOfWeek(currentTime, { weekStartsOn: WEEK_STARTS_ON });
  const weeksToDisplay = useMediaQuery('(max-height: 600px)') ? 2 : 5;
  const end = mobile ? addDays(start, 3) : addWeeks(start, weeksToDisplay);

  const { get } = useFetch<{
    items: {
      id: string;
      summary: string;
      start: { dateTime: string; date: string };
      end: { dateTime: string; date: string };
    }[];
  }>('https://www.googleapis.com/calendar/v3/calendars', {
    headers: {
      Authorization: `Bearer ${user.auth.access_token}`,
    },
  });

  useEffect(() => {
    setEvents((e) =>
      Object.values(calendar?.calendars || []).reduce((acc, cal) => {
        if (cal.displayed) {
          acc[cal.id] = e[cal.id];
        }
        return acc;
      }, {})
    );
    Object.values(calendar?.calendars || {})
      .filter((c) => c.displayed)
      .forEach((cal) => {
        get(
          `${encodeURIComponent(
            cal.id
          )}/events?timeMin=${start.toISOString()}&timeMax=${end.toISOString()}`
        ).then((result) => {
          setEvents((evts) => ({
            ...evts,
            [cal.id]: result.items.map((e) => ({
              id: e.id,
              title: e.summary,
              start: e.start.dateTime
                ? parseISO(e.start.dateTime)
                : parseISO(e.start.date),
              end: e.end.dateTime
                ? parseISO(e.end.dateTime)
                : parseISO(e.end.date),
            })),
          }));
        });
      });
  }, [calendar.calendars, currentTime]);

  const calendarEvents = useMemo(
    () =>
      Object.values(calendar.calendars ?? {})
        .map((c) => ({
          ...c,
          events: events[c.id] ?? [],
        }))
        .filter((c) => c.events.length >= 1),
    [(calendar.calendars, events)]
  );

  return (
    <CalendarPage
      start={start}
      startOfDay={startOfDay(currentTime)}
      end={end}
      calendars={calendarEvents}
      mobile={mobile}
    />
  );
}
