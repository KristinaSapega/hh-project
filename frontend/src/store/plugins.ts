import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPlugins } from '../api/fetchPlugins';
import { Plugin } from '../types';

const getUser = () => {
    const user = localStorage.getItem('user');
    if (!user) throw new Error('Необходимо авторизоваться');
    return user;
}

export const apiGetPlugins = createAsyncThunk(
    'plugins/apiGetPlugins',
    async () => {
        return await fetchPlugins(getUser());
    }
);

//export const apiSavePlugin = createAsyncThunk() ??сохранение изменений плагина

// export const apiGetPluginsByStand = createAsyncThunk( //добавить применение плагина к стенду
//     'plugins/apiGetPluginsByStand',
//     async (standId) => {
//         const user = getUser();
//         return await fetchPlugins(user, standId);
//     }
// );

//при выборе плагина открывается модальное окно где создается конфигурация плагина помимо основного функционала
//для применения плагина указываем определенный набор параметров, которые он требует
//нужны: ссылка на репозиторий, название ветки, имя владельца репозитори - редактирование(заполнение) плагина - сохранение изменений 
//должна быть возможность создать новый плагин


const pluginsSlice = createSlice({
    name: 'plugins',
    initialState: {
        plugins: [] as Plugin[],
    },
    reducers: {
        //givePlugin
        //addPlugin
        //removePlugin
    },
    extraReducers: (builder) => {
        builder
            .addCase(apiGetPlugins.fulfilled, (state, action) => {
                state.plugins = action.payload;
            })
            .addCase(apiGetPlugins.rejected, (_state, action) => {
                alert(action.error.message);
            })
    }

})

export default pluginsSlice.reducer;
