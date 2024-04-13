// data types

export interface Stand {
  id: number;
  host: string;
  status: string;
  takenBy: string;
}

export interface Container {
  id: string;
  name: string;
  state: string;
}

// Login page components props types

export interface FormProps {
  formSwitch: () => void;
}

export interface LoginFormValues {
  login?: string;
  password?: string;
}

// Stand table

export type Order = 'asc' | 'desc';

export interface Row {
  option: string;
  value: string;
}

export interface StandTableHeaderProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Container,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Container;
  label: string;
  numeric: boolean;
}

export interface StandTableToolbarProps {
  numSelected: number;
}

// Status element component

export enum Status {
  Stopped = 'stopped',
  Running = 'running',
  Pause = 'pause',
}

export interface StatusColorMap {
  [key: string]: string;
}

export interface ElementStatusProps {
  status: string;
}

// Header component

export interface HeaderProps {
  mode: ThemeMode;
  toggleTheme: () => void;
}

// Auth context

export interface IAuthContext {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

// App types

export type ThemeMode = 'dark' | 'light';