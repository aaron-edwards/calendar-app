import { render } from '@testing-library/react';
import merge from 'lodash.merge';
import { ReactElement } from 'react';
import {
  defaultSettings,
  Settings,
  SettingsContext,
} from '../../SettingsContext';
import { DeepPartial } from '../../types';
import SettingsPage from '../SettingsPage';

const settingsRenderer = (
  ui: ReactElement,
  settings: DeepPartial<Settings> = {},
  updateSettings: (newSettings: DeepPartial<Settings>) => void = () => undefined
) =>
  render(
    <SettingsContext.Provider
      value={merge(
        {},
        { settings: defaultSettings },
        { settings, updateSettings }
      )}
    >
      {ui}
    </SettingsContext.Provider>
  );

describe('<SettingsPage />', () => {
  describe('theme', () => {
    describe('darkmode', () => {
      it.each`
        initial    | checked  | result
        ${'light'} | ${false} | ${'dark'}
        ${'dark'}  | ${true}  | ${'light'}
      `(
        'when dark mode is $initial, should change to $result',
        ({ initial, checked, result }) => {
          const updateSettings = jest.fn();
          const { getByRole } = settingsRenderer(
            <SettingsPage />,
            { global: { theme: { palette: { mode: initial } } } },
            updateSettings
          );
          const darkModeToggle = getByRole('checkbox', {
            name: 'Use dark mode',
          });
          if (checked) {
            expect(darkModeToggle).toBeChecked();
          } else {
            expect(darkModeToggle).not.toBeChecked();
          }
          darkModeToggle.click();
          expect(updateSettings).toHaveBeenCalledWith({
            global: { theme: { palette: { mode: result } } },
          });
        }
      );
    });
  });
});
