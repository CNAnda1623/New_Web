import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SustainabilityState {
  activeStrategyTab: string;
  activeReportTab: string;
  activeSection: string;
}

const initialState: SustainabilityState = {
  activeStrategyTab: "governance",
  activeReportTab: "reports",
  activeSection: "overview",
};

export const sustainabilitySlice = createSlice({
  name: "sustainability",
  initialState,
  reducers: {
    setActiveStrategyTab(state, action: PayloadAction<string>) {
      state.activeStrategyTab = action.payload;
    },
    setActiveReportTab(state, action: PayloadAction<string>) {
      state.activeReportTab = action.payload;
    },
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveStrategyTab, setActiveReportTab, setActiveSection } =
  sustainabilitySlice.actions;

export default sustainabilitySlice.reducer;
