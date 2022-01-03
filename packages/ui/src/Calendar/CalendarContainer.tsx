import { addWeeks, startOfWeek, startOfDay, addDays } from 'date-fns';
import { useMemo } from 'react';
import { Theme, useMediaQuery } from '@mui/material';
import useTime from '../hooks/useTime';
import CalendarPage from './Calendar';
import { User } from '../hooks/useGoogleAuth';
import useCalendars from '../hooks/useCalendars';
import useEvents from '../hooks/useEvents';
import useInterval from '../hooks/useInterval';

const UPDATE_TIME = 60_000 * 5;
const WEEK_STARTS_ON = 1;

export default function CalendarContainer({ user }: { user: User }) {
  const { calendars } = useCalendars(user);
  const calendarIds = useMemo(
    () => new Set(Object.keys(calendars)),
    [calendars]
  );

  const currentTime = useTime(UPDATE_TIME);
  const mobile = useMediaQuery((theme: Theme) =>
    theme?.breakpoints?.down('sm')
  );
  const start = mobile
    ? startOfDay(currentTime)
    : startOfWeek(currentTime, { weekStartsOn: WEEK_STARTS_ON });
  const weeksToDisplay = 3;
  const end = mobile ? addDays(start, 3) : addWeeks(start, weeksToDisplay);
  const { events, refresh } = useEvents(user, calendarIds, start, end);
  useInterval(refresh, UPDATE_TIME);

  const calendarEvents = useMemo(
    () =>
      Object.values(calendars ?? {})
        .map((c) => ({
          ...c,
          events: events[c.id] ?? [],
        }))
        .filter((c) => c.events.length >= 1),
    [calendars, events]
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
