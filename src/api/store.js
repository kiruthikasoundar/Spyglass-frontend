import {configureStore} from '@reduxjs/toolkit';

import { goalApi } from './goalApi';
import { userApi } from './userApi';

const store = configureStore({
  reducer: {
    [goalApi.reducerPath]: goalApi.reducer,
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(goalApi.middleware).concat(userApi.middleware)
});

export default store;