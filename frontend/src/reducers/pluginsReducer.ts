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

type pluginsActionsType = PluginsAction | AddPluginAction | RemovePluginAction;

const pluginsReducer = (
  state: PluginsState = initialStandsState,
  action: pluginsActionsType,
) => {
  switch (action.type) {
    case GIVE_PLUGINS: {
      const plugins = action.payload as Plugin[];
      return {
        ...state,
        plugins,
      };
    }
    case ADD_PLUGIN: {
      const plugin = action.payload as Plugin;
      return {
        ...state,
        plugins: [plugin, ...state.plugins],
      };
    }
    case REMOVE_PLUGIN: {
      const id = action.payload as number;
      const filteredPlugins = state.plugins.filter(
        (plugin) => plugin.id !== id,
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

export { givePlugins, addPlugin, removePlugin, pluginsReducer };
