import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface HomeState {
  activeScenarioTab: string;
  heroSlideIndex: number;
}

const initialState: HomeState = {
  activeScenarioTab: "for-home",
  heroSlideIndex: 0,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setActiveScenarioTab(state, action: PayloadAction<string>) {
      state.activeScenarioTab = action.payload;
    },
    setHeroSlideIndex(state, action: PayloadAction<number>) {
      state.heroSlideIndex = action.payload;
    },
  },
});

export const { setActiveScenarioTab, setHeroSlideIndex } = homeSlice.actions;

export default homeSlice.reducer;
