import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../makeStore";

export type AccountDialogType = "reset" | "delete" | "forgot";

export interface UIState {
  mobileNavOpen: boolean;
  activeMegaMenu: string | null;
  navRowHidden: boolean;
  accountMenuOpen: boolean;
  activeAccountDialog: AccountDialogType | null;
}

const initialState: UIState = {
  mobileNavOpen: false,
  activeMegaMenu: null,
  navRowHidden: false,
  accountMenuOpen: false,
  activeAccountDialog: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileNav: (state) => {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
    openMegaMenu: (state, action: PayloadAction<string>) => {
      state.activeMegaMenu = action.payload;
    },
    closeMegaMenu: (state) => {
      state.activeMegaMenu = null;
    },
    setNavRowHidden: (state, action: PayloadAction<boolean>) => {
      state.navRowHidden = action.payload;
    },
    setAccountMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.accountMenuOpen = action.payload;
    },
    openAccountDialog: (state, action: PayloadAction<AccountDialogType>) => {
      state.activeAccountDialog = action.payload;
      state.accountMenuOpen = false;
    },
    closeAccountDialog: (state) => {
      state.activeAccountDialog = null;
    },
    closeAllOverlays: (state) => {
      state.mobileNavOpen = false;
      state.activeMegaMenu = null;
      state.accountMenuOpen = false;
      state.activeAccountDialog = null;
    },
  },
});

export const {
  toggleMobileNav,
  openMegaMenu,
  closeMegaMenu,
  setNavRowHidden,
  setAccountMenuOpen,
  openAccountDialog,
  closeAccountDialog,
  closeAllOverlays,
} = uiSlice.actions;

export const selectUI = (state: RootState): UIState => state.ui;
export const selectMobileNavOpen = (state: RootState): boolean =>
  state.ui.mobileNavOpen;
export const selectActiveMegaMenu = (state: RootState): string | null =>
  state.ui.activeMegaMenu;
export const selectNavRowHidden = (state: RootState): boolean =>
  state.ui.navRowHidden;
export const selectAccountMenuOpen = (state: RootState): boolean =>
  state.ui.accountMenuOpen;
export const selectActiveAccountDialog = (
  state: RootState
): AccountDialogType | null => state.ui.activeAccountDialog;

export default uiSlice.reducer;
