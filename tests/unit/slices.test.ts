import { describe, it, expect } from "vitest";
import uiReducer, {
  setMobileNavOpen,
  setActiveMegaMenu,
  setHeaderNavHidden,
  setBackToTopVisible,
} from "@/store/slices/uiSlice";
import homeReducer, {
  setActiveScenarioTab,
  setHeroSlideIndex,
} from "@/store/slices/homeSlice";
import brandStoryReducer, {
  toggleCapability,
} from "@/store/slices/brandStorySlice";
import sustainabilityReducer, {
  setActiveStrategyTab,
  setActiveReportTab,
  setActiveSection,
} from "@/store/slices/sustainabilitySlice";
import loginReducer, {
  toggleShowPassword,
  setRememberMe,
} from "@/store/slices/loginSlice";

describe("Redux Slices", () => {
  it("handles uiSlice actions correctly", () => {
    let state = uiReducer(undefined, { type: "unknown" });
    expect(state.mobileNavOpen).toBe(false);

    state = uiReducer(state, setMobileNavOpen(true));
    expect(state.mobileNavOpen).toBe(true);

    state = uiReducer(state, setActiveMegaMenu("for-home"));
    expect(state.activeMegaMenu).toBe("for-home");

    state = uiReducer(state, setHeaderNavHidden(true));
    expect(state.headerNavHidden).toBe(true);

    state = uiReducer(state, setBackToTopVisible(true));
    expect(state.backToTopVisible).toBe(true);
  });

  it("handles homeSlice actions correctly", () => {
    let state = homeReducer(undefined, { type: "unknown" });
    expect(state.activeScenarioTab).toBe("for-home");

    state = homeReducer(state, setActiveScenarioTab("for-utility"));
    expect(state.activeScenarioTab).toBe("for-utility");

    state = homeReducer(state, setHeroSlideIndex(1));
    expect(state.heroSlideIndex).toBe(1);
  });

  it("handles brandStorySlice actions correctly", () => {
    let state = brandStoryReducer(undefined, { type: "unknown" });
    expect(state.expandedCapabilityId).toBeNull();

    state = brandStoryReducer(state, toggleCapability("solar"));
    expect(state.expandedCapabilityId).toBe("solar");

    state = brandStoryReducer(state, toggleCapability("solar"));
    expect(state.expandedCapabilityId).toBeNull();
  });

  it("handles sustainabilitySlice actions correctly", () => {
    let state = sustainabilityReducer(undefined, { type: "unknown" });
    expect(state.activeStrategyTab).toBe("governance");
    expect(state.activeReportTab).toBe("reports");

    state = sustainabilityReducer(state, setActiveStrategyTab("netzero"));
    expect(state.activeStrategyTab).toBe("netzero");

    state = sustainabilityReducer(state, setActiveReportTab("policies"));
    expect(state.activeReportTab).toBe("policies");

    state = sustainabilityReducer(state, setActiveSection("reports"));
    expect(state.activeSection).toBe("reports");
  });

  it("handles loginSlice actions correctly", () => {
    let state = loginReducer(undefined, { type: "unknown" });
    expect(state.showPassword).toBe(false);
    expect(state.rememberMe).toBe(false);

    state = loginReducer(state, toggleShowPassword());
    expect(state.showPassword).toBe(true);

    state = loginReducer(state, setRememberMe(true));
    expect(state.rememberMe).toBe(true);
  });
});
