export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Calendar = {
  id: string;
  summary: string;
  backgroundColor: string;
  foregroundColor: string;
  displayed: boolean;

  selected: boolean;
  primary: boolean;
};

type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};
