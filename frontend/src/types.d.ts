// data types

export interface Stand {
  id: number;
  host: string;
  status: string;
  takenBy: string;
}

export interface Field {
  name: string;
  type: 'input' | 'checkbox' | 'select' | 'button' | 'radio';
  placeholder?: string; // если тип input
  value?: string; // если чекбокс, либо значение по умолчанию в input
  options?: Array<string>; // если тип select; первым значением передаем по умолчанию
  checked?: boolean; // если тип checkbox
}

export interface Plugin {
  name: string;
  description: string;
  shortDescription?: string;
  playbook?: string; // url к плейбук файлу
  fields: Array<Field>;
}

export interface Container {
  id: string;
  name: string;
  state: string;
}

export interface Field {
  name: string;
  type: 'input' | 'checkbox' | 'select' | 'button' | 'radio';
  placeholder?: string; // если тип input
  value?: string; // если чекбокс, либо значение по умолчанию в input
  options?: Array<string>; // если тип select; первым значением передаем по умолчанию
  checked?: boolean; // если тип checkbox
}

export interface Plugin {
  id: number;
  name: string;
  description: string;
  fields: Array<Field>;
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
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Container,
  ) => void;
  order: Order;
  orderBy: string;
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

// store reducers types
// StandsReducer

export interface StandsState {
  stands: Stand[];
}

export interface StandsAction {
  type: string;
  payload: Stand[];
}

export interface TakeStandAction {
  type: string;
  payload: {
    user: string;
    id: number;
  };
}

export interface LeaveStandAction {
  type: string;
  payload: number;
}

// PluginsReducer

export interface PluginsState {
  plugins: Plugin[];
}

export interface PluginsAction {
  type: string;
  payload: Plugin[];
}

export interface AddPluginAction {
  type: string;
  payload: Plugin;
}

export interface RemovePluginAction {
  type: string;
  payload: number;
}

// Logs

export interface LogsProps {
  isVisible: boolean;
  setIsVisible: () => void;
}

// Modal

export interface ModalProps {
  open: boolean;
  onClose: () => void;
}
