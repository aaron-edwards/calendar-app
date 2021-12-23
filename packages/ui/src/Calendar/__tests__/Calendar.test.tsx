import { render } from '@testing-library/react';
import { addDays, format } from 'date-fns';
import Calendar from '../Calendar';

const MONDAY_6_12 = new Date('2021-12-06');

describe('<Calendar />', () => {
  describe('titles', () => {
    it('should display all 7 days if displaying more than a week', () => {
      const { baseElement } = render(
        <Calendar start={MONDAY_6_12} end={new Date('2021-12-31')} />
      );
      const dayNames = Array.from({ length: 7 }, (_, index) =>
        format(addDays(MONDAY_6_12, index), 'EEEE')
      ).join('');
      expect(baseElement).toHaveTextContent(dayNames);
    });

    it('should only display days covered if less than 7', () => {
      const TUES_7_12 = new Date('2021-12-06');
      const { baseElement } = render(
        <Calendar start={TUES_7_12} end={addDays(TUES_7_12, 3)} />
      );
      const dayNames = Array.from({ length: 3 }, (_, index) =>
        format(addDays(TUES_7_12, index), 'EEEE')
      ).join('');
      expect(baseElement).toHaveTextContent(dayNames);
    });
  });
});
