import { Box, Grid, Typography, useTheme } from '@mui/material';
import { addDays, differenceInCalendarDays, format, isEqual } from 'date-fns';
import React from 'react';

type Props = {
  start: Date;
  end: Date;
};

function Calendar({ start, end }: Props) {
  const daysToDisplay = differenceInCalendarDays(end, start);
  const columns = Math.min(7, daysToDisplay);
  const theme = useTheme();
  const borderColour =
    theme.palette.grey[theme.palette.mode === 'dark' ? 800 : 200];
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
          return (
            <Grid
              key={day.getTime()}
              item
              xs={1}
              sx={{
                borderTop:
                  Math.floor(index / columns) !== 0
                    ? `1px solid ${borderColour}`
                    : undefined,
                borderLeft:
                  index % columns > 0 ? `1px solid ${borderColour}` : undefined,
              }}
            >
              {format(day, 'MMM dd')}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default React.memo(Calendar, (prevProps, newProps) => {
  return (
    isEqual(prevProps.start, newProps.start) &&
    isEqual(prevProps.end, newProps.end)
  );
});
