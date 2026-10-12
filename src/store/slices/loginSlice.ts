import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
  showPassword: boolean;
  rememberMe: boolean;
}

const initialState: LoginState = {
  showPassword: false,
  rememberMe: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setShowPassword(state, action: PayloadAction<boolean>) {
      state.showPassword = action.payload;
    },
    toggleShowPassword(state) {
      state.showPassword = !state.showPassword;
    },
    setRememberMe(state, action: PayloadAction<boolean>) {
      state.rememberMe = action.payload;
    },
  },
});

export const { setShowPassword, toggleShowPassword, setRememberMe } =
  loginSlice.actions;

export default loginSlice.reducer;
