import {
  AddPluginAction,
  Plugin,
  PluginsAction,
  PluginsState,
  RemovePluginAction,
} from '../types';

const initialStandsState: PluginsState = {
  plugins: [],
};

const GIVE_PLUGINS = 'GIVEPLUGINS';
const ADD_PLUGIN = 'ADDPLUGIN';
const REMOVE_PLUGIN = 'REMOVEPLUGIN';

const givePlugins = (plugins: Plugin[]): PluginsAction => ({
  type: GIVE_PLUGINS,
  payload: plugins,
});

const addPlugin = (plugin: Plugin): AddPluginAction => ({
  type: ADD_PLUGIN,
  payload: plugin,
});

const removePlugin = (id: number): RemovePluginAction => ({
  type: REMOVE_PLUGIN,
  payload: id,
});

const standsReducer = (
  state: PluginsState = initialStandsState,
  action: PluginsAction | AddPluginAction | RemovePluginAction,
) => {
  switch (action.type) {
    case GIVE_PLUGINS:
      return {
        ...state,
        plugins: action.payload,
      };
    case ADD_PLUGIN:
      return {
        ...state,
        plugins: [action.payload, ...state.plugins],
      };
    case REMOVE_PLUGIN: {
      const filteredPlugins = state.plugins.filter(
        ({ id }) => id !== action.payload,
      );
      return {
        ...state,
        plugins: filteredPlugins,
      };
    }
    default:
      return state;
  }
};

export { givePlugins, addPlugin, removePlugin, standsReducer };
