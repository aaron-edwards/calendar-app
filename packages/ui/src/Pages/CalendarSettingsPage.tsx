import {
  Avatar,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import useFetch from 'use-http';
import { Auth, AuthContext } from '../AuthContext';
import { SettingsContext } from '../SettingsContext';

type CalendarSelectionProps = { auth: Auth };

function CalendarSelection({ auth }: CalendarSelectionProps) {
  const { data } = useFetch<{
    items: {
      id: string;
      summary: string;
      backgroundColor: string;
      foregroundColor: string;
    }[];
  }>(
    'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    {
      headers: {
        Authorization: `${auth?.token.type} ${auth?.token.accessToken}`,
      },
    },
    []
  );
  const { settings, setSettings, updateSettings } = useContext(SettingsContext);

  useEffect(() => {
    if (data?.items) {
      const calendars = data.items.reduce((acc, cal) => {
        acc[cal.id] = {
          id: cal.id,
          summary: cal.summary,
          backgroundColor:
            settings.calendar.calendars?.[cal.id]?.backgroundColor ??
            cal.backgroundColor,
          foregroundColor:
            settings.calendar.calendars?.[cal.id]?.foregroundColor ??
            cal.foregroundColor,
          displayed: settings.calendar.calendars?.[cal.id]?.displayed ?? false,
        };
        return acc;
      }, {});
      setSettings((s) => ({ ...s, calendar: { ...s.calendar, calendars } }));
    }
  }, [data?.items]);

  return (
    <Stack>
      <Typography variant="h6">Displayed Calendars</Typography>
      <List>
        {settings.calendar.calendars &&
          Object.values(settings.calendar.calendars).map((item) => {
            const toggle = () => {
              updateSettings({
                calendar: {
                  calendars: {
                    [item.id]: {
                      displayed: !(item.displayed ?? false),
                    },
                  },
                },
              });
            };
            const labelId = `calendar-selection-${item.id}`;
            return (
              <ListItem key={labelId} disablePadding>
                <ListItemButton dense role={undefined} onClick={toggle}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.displayed || false}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={item.summary} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    </Stack>
  );
}

export default function CalendarPage() {
  const { auth, signIn, signOut } = useContext(AuthContext);
  // const { settings, updateSettings } = useContext(SettingsContext);

  return (
    <Stack>
      <Typography variant="h5">Calendar Settings</Typography>
      <Stack>
        <Typography variant="h6">Authentication</Typography>

        <List>
          {auth ? (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={auth.profile.image} src={auth.profile.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={auth.profile.name}
                  secondary={auth.profile.email}
                />
              </ListItem>
              <ListItem>
                <Button onClick={signOut}>Logout</Button>
              </ListItem>
            </>
          ) : (
            <ListItem>
              <Button onClick={signIn}>Login</Button>
            </ListItem>
          )}
        </List>
      </Stack>
      {auth && <CalendarSelection auth={auth} />}
    </Stack>
  );
}
