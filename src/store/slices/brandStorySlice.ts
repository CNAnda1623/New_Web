import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface BrandStoryState {
  expandedCapabilityId: string | null;
}

const initialState: BrandStoryState = {
  expandedCapabilityId: null,
};

export const brandStorySlice = createSlice({
  name: "brandStory",
  initialState,
  reducers: {
    setExpandedCapabilityId(state, action: PayloadAction<string | null>) {
      state.expandedCapabilityId = action.payload;
    },
    toggleCapability(state, action: PayloadAction<string>) {
      state.expandedCapabilityId =
        state.expandedCapabilityId === action.payload ? null : action.payload;
    },
  },
});

export const { setExpandedCapabilityId, toggleCapability } =
  brandStorySlice.actions;

export default brandStorySlice.reducer;
