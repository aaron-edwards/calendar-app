import { Stack, Card } from '@mui/material';
import { addWeeks, startOfWeek, parseISO, startOfDay } from 'date-fns';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useFetch } from 'use-http';
import { Auth } from '../AuthContext';
import useTime from '../hooks/useTime';
import { SettingsContext } from '../SettingsContext';
import CalendarPage from './Calendar';
import { Event } from '../types';

const UPDATE_TIME = 60_000 * 5;
const WEEK_STARTS_ON = 1;
const WEEKS_TO_DISPLAY = 5;

type Events = Record<string, Event[]>;

export default function CalendarContainer({ auth }: { auth: Auth }) {
  const {
    settings: { calendar },
  } = useContext(SettingsContext);
  const currentTime = useTime(UPDATE_TIME);
  const [events, setEvents] = useState<Events>({});
  const start = startOfWeek(currentTime, { weekStartsOn: WEEK_STARTS_ON });
  const end = addWeeks(start, WEEKS_TO_DISPLAY);

  const { get } = useFetch<{
    items: {
      id: string;
      summary: string;
      start: { dateTime: string; date: string };
      end: { dateTime: string; date: string };
    }[];
  }>('https://www.googleapis.com/calendar/v3/calendars', {
    headers: {
      Authorization: `${auth?.token.type} ${auth?.token.accessToken}`,
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

  if (!auth) {
    return (
      <Stack
        sx={{ alignItems: 'center', height: '100%', justifyContent: 'center' }}
      >
        <Card
          elevation={12}
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
          }}
        >
          Login to view calendar
        </Card>
      </Stack>
    );
  }

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
    />
  );
}
