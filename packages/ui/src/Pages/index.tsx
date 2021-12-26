import SettingsPage from './SettingsPage';
import CalendarSettingsPage from './CalendarSettingsPage';

// eslint-disable-next-line import/prefer-default-export
export enum Page {
  Settings = 'Settings',
  CalendarSettings = 'CalendarSettings',
}

const pages: Record<Page, JSX.Element> = {
  [Page.Settings]: <SettingsPage />,
  [Page.CalendarSettings]: <CalendarSettingsPage />,
};

export default function SidePages({ page }: { page: Page }) {
  return pages[page];
}
