import { ListSubheader } from '@mui/material';
import useFetch from 'use-http';
import { User } from '../../hooks/useGoogleAuth';

type Props = {
  user: User;
};
export default function CalendarList({ user }: Props) {
  useFetch<{
    items: {
      id: string;
      summary: string;
      start: { dateTime: string; date: string };
      end: { dateTime: string; date: string };
    }[];
  }>(
    'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    {
      headers: {
        Authorization: `Bearer ${user.auth.access_token}`,
      },
    },
    [user]
  );

  return <ListSubheader>Calendars</ListSubheader>;
}
