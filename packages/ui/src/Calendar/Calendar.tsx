import { Box, Chip, Grid, Typography, useTheme } from '@mui/material';
import {
  addDays,
  differenceInCalendarDays,
  format,
  isBefore,
  isEqual,
  subMilliseconds,
} from 'date-fns';
import { Calendar, Event } from '../types';

type CalendarEvent = Calendar & { events: Event[] };

type Props = {
  start: Date;
  startOfDay: Date;
  end: Date;
  calendars: CalendarEvent[];
};

function CalendarPage({ start, end, calendars, startOfDay }: Props) {
  const daysToDisplay = differenceInCalendarDays(end, start);
  const columns = Math.min(7, daysToDisplay);
  const theme = useTheme();
  const borderColour =
    theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 200];
  const highlightColour =
    theme.palette.grey[theme.palette.mode === 'dark' ? 600 : 400];
  const pastBackground = `repeating-linear-gradient(-30deg, ${borderColour}, ${borderColour} 30px, transparent 30px, transparent 60px)`;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <Grid container columns={columns}>
        {Array.from({ length: columns }, (_, index) => {
          const day = addDays(start, index);
          return (
            <Grid
              key={day.getTime()}
              item
              xs={1}
              sx={{
                borderBottom: `2px solid ${borderColour}`,
                borderLeft: index > 0 ? `1px solid ${borderColour}` : undefined,
              }}
            >
              <Typography variant="h5" textAlign="center">
                {format(day, 'EEEE')}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
      <Grid container columns={columns} sx={{ flexGrow: 1 }}>
        {Array.from({ length: daysToDisplay }, (_, index) => {
          const day = addDays(start, index);
          const timestamp = day.getTime();
          const endTimestamp = subMilliseconds(addDays(day, 1), 1).getTime();
          return (
            <Grid
              key={day.getTime()}
              item
              xs={1}
              sx={{
                backgroundImage: isBefore(day, startOfDay)
                  ? pastBackground
                  : undefined,
                borderTop:
                  Math.floor(index / columns) !== 0
                    ? `1px solid ${borderColour}`
                    : undefined,
                borderLeft:
                  index % columns > 0 ? `1px solid ${borderColour}` : undefined,
                boxShadow: isEqual(day, startOfDay)
                  ? `0 0 0 2px ${highlightColour} inset`
                  : undefined,
              }}
            >
              <Chip
                label={format(day, 'MMM dd')}
                color="primary"
                size="small"
              />
              {calendars.flatMap((cal) =>
                cal.events
                  .filter(
                    (e) =>
                      e.start.getTime() <= endTimestamp &&
                      e.end.getTime() >= timestamp
                  )
                  .map((e) => (
                    <Box
                      key={`${cal.id}-${e.id}-${day.getTime()}`}
                      sx={{
                        backgroundColor: cal.backgroundColor,
                        whiteSpace: 'nowrap',
                        overflow: 'clip',
                      }}
                    >
                      <Typography color={cal.foregroundColor}>
                        {e.title}
                      </Typography>
                    </Box>
                  ))
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default CalendarPage;

// export default React.memo(CalendarPage, (prevProps, newProps) => {
//   return (
//     isEqual(prevProps.start, newProps.start) &&
//     isEqual(prevProps.end, newProps.end) &&
//     deep(prevProps.calendars, newProps.calendars)
//   );
// });
