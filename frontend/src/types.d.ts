import { ReactNode } from 'react';

// data types

export interface Stand {
  id: number;
  host: string;
  status: string;
  takenBy: string | null;
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
  shortDescription?: string;
  playbook?: string; // url к плейбук файлу
  fields?: Array<Field>;
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

// TasksReducer

export interface TasksState {
  stands: Array<number>;
  tasks: Array<{
    id: number;
    taskId: number;
  }>;
}

export interface AddStandToTasksAction {
  type: string;
  payload: number;
}

export interface RemoveStandFromTasksAction {
  type: string;
  payload: number;
}

export interface AddTaskToTasksAction {
  type: string;
  payload: number;
}

export interface RemoveTaskFromTasksAction {
  type: string;
  payload: number;
}

export interface ResetTasksAction {
  type: string;
  payload: unknown;
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

// Plugins components

export interface CustomAccordionProps {
  title: string;
  children: ReactNode;
}

export interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

export interface PluginsModalProps {
  open: boolean;
  onClose: () => void;
}
