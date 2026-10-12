import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import homeReducer from "./slices/homeSlice";
import brandStoryReducer from "./slices/brandStorySlice";
import sustainabilityReducer from "./slices/sustainabilitySlice";
import loginReducer from "./slices/loginSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      home: homeReducer,
      brandStory: brandStoryReducer,
      sustainability: sustainabilityReducer,
      login: loginReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
