import SettingsPage from './SettingsPage';

// eslint-disable-next-line import/prefer-default-export
export enum Page {
  Settings = 'Settings',
}

const pages: Record<Page, JSX.Element> = {
  [Page.Settings]: <SettingsPage />,
};

export default function SidePages({ page }: { page: Page }) {
  return pages[page];
}
