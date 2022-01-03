import { Box, Typography, useTheme } from '@mui/material';
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
    theme.palette.grey[theme.palette.mode === 'dark' ? 700 : 300];
  const highlightColour = theme.palette.primary.main;
  const pastBackground =
    theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 200];

  return (
    <Box
      sx={{
        display: 'grid',
        width: '100%',
        height: '100%',
        gridTemplateRows: `auto repeat(${
          daysToDisplay / columns
        }, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: columns }, (_, index) => {
        const day = addDays(start, index);
        return (
          <Box
            key={day.getTime()}
            sx={{
              borderBottom: `2px solid ${borderColour}`,
              borderLeft: index > 0 ? `1px solid ${borderColour}` : undefined,
            }}
          >
            <Typography variant="h4" textAlign="center">
              {format(day, 'E')}
            </Typography>
          </Box>
        );
      })}

      {Array.from({ length: daysToDisplay }, (_, index) => {
        const day = addDays(start, index);
        const timestamp = day.getTime();
        const endTimestamp = subMilliseconds(addDays(day, 1), 1).getTime();
        return (
          <Box
            key={day.getTime()}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              background: isBefore(day, startOfDay)
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
            <Typography
              variant="h5"
              textAlign="right"
              paddingTop={0.5}
              paddingRight={2}
            >
              {format(day, day.getDate() === 1 ? 'MMM' : 'dd')}
            </Typography>
            {calendars.flatMap((cal) =>
              cal.events
                .filter(
                  (e) =>
                    e.start.getTime() <= endTimestamp &&
                    e.end.getTime() > timestamp
                )
                .map((e) => (
                  <Box
                    key={`${cal.id}-${e.id}-${day.getTime()}`}
                    sx={{
                      backgroundColor: cal.backgroundColor,
                      borderRadius: 2,
                      whiteSpace: 'nowrap',
                      paddingLeft: 0.5,
                      paddingRight: 0.5,
                      marginLeft: 0.5,
                      marginRight: 0.5,
                    }}
                  >
                    <Typography
                      color={cal.foregroundColor}
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {e.title}
                    </Typography>
                  </Box>
                ))
            )}
          </Box>
        );
      })}
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
