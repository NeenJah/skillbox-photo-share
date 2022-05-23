import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import constants from '../constants.js';
import unsplashApi from '../unsplash.js';

// функция получения хранилища Redux
export default async function getFeedStore(accessToken) {
  // получаем список постов из API, устанавливаем его как состояние по умолчанию
  const result = await unsplashApi.photos.list();
  const initialState = result.response.results || [];
  
  // слайс для ленты
  const feedSlice = createSlice({
    name: `feed`,
    initialState,
    reducers: {
      toggleLikePhoto(state, { response, payload }) {
        const targetPhotoIndex = state.indexOf(state.find(el => el.id === payload));
        state.splice(targetPhotoIndex, 1, response);
      }
    },
  });
  
  // слайс для авторизации
  const authSlice = createSlice({
    name: `auth`,
    initialState: accessToken,
    reducers: {
      setAccessToken(state, { payload }) {
        state.accessToken = payload;
        localStorage.setItem(constants.LOCAL_STORAGE_KEY, token);
      },
    },
  });
  
  // возвращаем хранилище
  return configureStore({
    reducer: {
      feed: feedSlice.reducer,
      auth: authSlice.reducer,
    }
  });
}