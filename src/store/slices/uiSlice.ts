import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  mobileNavOpen: boolean;
  activeMegaMenu: string | null;
  headerNavHidden: boolean;
  backToTopVisible: boolean;
}

const initialState: UiState = {
  mobileNavOpen: false,
  activeMegaMenu: null,
  headerNavHidden: false,
  backToTopVisible: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    toggleMobileNav(state) {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
    setActiveMegaMenu(state, action: PayloadAction<string | null>) {
      state.activeMegaMenu = action.payload;
    },
    setHeaderNavHidden(state, action: PayloadAction<boolean>) {
      state.headerNavHidden = action.payload;
    },
    setBackToTopVisible(state, action: PayloadAction<boolean>) {
      state.backToTopVisible = action.payload;
    },
  },
});

export const {
  setMobileNavOpen,
  toggleMobileNav,
  setActiveMegaMenu,
  setHeaderNavHidden,
  setBackToTopVisible,
} = uiSlice.actions;

export default uiSlice.reducer;
