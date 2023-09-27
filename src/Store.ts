// store.ts
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo') || 'null'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserInfo>) => {
      const newState = state;
      newState.userInfo = action.payload;
      localStorage.removeItem('userInfo');
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    signOut: (state) => {
      const newState = state;
      newState.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export const selectUserInfo = (state: { user: UserState }) => state.user.userInfo;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
