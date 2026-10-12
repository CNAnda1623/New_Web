import { describe, it, expect } from "vitest";
import authReducer, {
  selectAuthStatus,
  selectUser,
  selectIsAuthenticated,
  selectDisplayName,
  type AuthState,
} from "@/store/slices/authSlice";
import uiReducer, {
  toggleMobileNav,
  openMegaMenu,
  closeMegaMenu,
  setNavRowHidden,
  setAccountMenuOpen,
  openAccountDialog,
  closeAccountDialog,
  closeAllOverlays,
  selectUI,
  selectMobileNavOpen,
  selectActiveMegaMenu,
  selectNavRowHidden,
  selectAccountMenuOpen,
  selectActiveAccountDialog,
} from "@/store/slices/uiSlice";
import registerReducer, {
  saveStep1,
  goToStep,
  codeSent,
  openSuccess,
  resetRegister,
  selectRegisterStep,
  selectRegisterStep1,
  selectResendAvailableAt,
  selectSuccessDialogOpen,
} from "@/store/slices/registerSlice";
import type { AuthUser } from "@/store/api/authApi";
import type { RootState } from "@/store/makeStore";

const mockUser: AuthUser = {
  id: "user-123",
  name: "Priya Sharma",
  email: "priya@example.com",
  role: "For Home",
};

describe("Redux Slices", () => {
  describe("authSlice", () => {
    it("has initial state of loading with null user", () => {
      const state = authReducer(undefined, { type: "@@INIT" });
      expect(state.status).toBe("loading");
      expect(state.user).toBeNull();
    });

    it("handles getMe.matchFulfilled matcher", () => {
      const action = {
        type: "authApi/executeQuery/fulfilled",
        payload: { user: mockUser },
        meta: { arg: { endpointName: "getMe" } },
      };
      const state = authReducer(undefined, action);
      expect(state.status).toBe("authenticated");
      expect(state.user).toEqual(mockUser);
    });

    it("handles login.matchFulfilled matcher", () => {
      const action = {
        type: "authApi/executeMutation/fulfilled",
        payload: { success: true, user: mockUser },
        meta: { arg: { endpointName: "login" } },
      };
      const state = authReducer(undefined, action);
      expect(state.status).toBe("authenticated");
      expect(state.user).toEqual(mockUser);
    });

    it("handles loginCode.matchFulfilled matcher", () => {
      const action = {
        type: "authApi/executeMutation/fulfilled",
        payload: { success: true, user: mockUser },
        meta: { arg: { endpointName: "loginCode" } },
      };
      const state = authReducer(undefined, action);
      expect(state.status).toBe("authenticated");
      expect(state.user).toEqual(mockUser);
    });

    it("handles getMe.matchRejected matcher -> anonymous", () => {
      const initialState: AuthState = {
        status: "loading",
        user: null,
      };
      const action = {
        type: "authApi/executeQuery/rejected",
        meta: { arg: { endpointName: "getMe" } },
      };
      const state = authReducer(initialState, action);
      expect(state.status).toBe("anonymous");
      expect(state.user).toBeNull();
    });

    it("handles logout.matchFulfilled matcher -> anonymous", () => {
      const initialState: AuthState = {
        status: "authenticated",
        user: mockUser,
      };
      const action = {
        type: "authApi/executeMutation/fulfilled",
        payload: { success: true },
        meta: { arg: { endpointName: "logout" } },
      };
      const state = authReducer(initialState, action);
      expect(state.status).toBe("anonymous");
      expect(state.user).toBeNull();
    });

    it("handles deleteAccount.matchFulfilled matcher -> anonymous", () => {
      const initialState: AuthState = {
        status: "authenticated",
        user: mockUser,
      };
      const action = {
        type: "authApi/executeMutation/fulfilled",
        payload: { success: true },
        meta: { arg: { endpointName: "deleteAccount" } },
      };
      const state = authReducer(initialState, action);
      expect(state.status).toBe("anonymous");
      expect(state.user).toBeNull();
    });

    it("handles resetPassword.matchFulfilled matcher -> anonymous", () => {
      const initialState: AuthState = {
        status: "authenticated",
        user: mockUser,
      };
      const action = {
        type: "authApi/executeMutation/fulfilled",
        payload: { success: true },
        meta: { arg: { endpointName: "resetPassword" } },
      };
      const state = authReducer(initialState, action);
      expect(state.status).toBe("anonymous");
      expect(state.user).toBeNull();
    });

    it("evaluates selectors correctly", () => {
      const rootState = {
        auth: {
          status: "authenticated" as const,
          user: mockUser,
        },
      } as RootState;

      expect(selectAuthStatus(rootState)).toBe("authenticated");
      expect(selectUser(rootState)).toEqual(mockUser);
      expect(selectIsAuthenticated(rootState)).toBe(true);
      expect(selectDisplayName(rootState)).toBe("Priya Sharma");
    });
  });

  describe("uiSlice", () => {
    it("handles mobileNavOpen toggles", () => {
      let state = uiReducer(undefined, { type: "@@INIT" });
      expect(state.mobileNavOpen).toBe(false);

      state = uiReducer(state, toggleMobileNav());
      expect(state.mobileNavOpen).toBe(true);

      state = uiReducer(state, toggleMobileNav());
      expect(state.mobileNavOpen).toBe(false);
    });

    it("handles openMegaMenu and closeMegaMenu", () => {
      let state = uiReducer(undefined, { type: "@@INIT" });
      expect(state.activeMegaMenu).toBeNull();

      state = uiReducer(state, openMegaMenu("products"));
      expect(state.activeMegaMenu).toBe("products");

      state = uiReducer(state, closeMegaMenu());
      expect(state.activeMegaMenu).toBeNull();
    });

    it("handles setNavRowHidden", () => {
      let state = uiReducer(undefined, { type: "@@INIT" });
      expect(state.navRowHidden).toBe(false);

      state = uiReducer(state, setNavRowHidden(true));
      expect(state.navRowHidden).toBe(true);

      state = uiReducer(state, setNavRowHidden(false));
      expect(state.navRowHidden).toBe(false);
    });

    it("openAccountDialog closes the account dropdown and sets dialog type", () => {
      let state = uiReducer(undefined, { type: "@@INIT" });
      state = uiReducer(state, setAccountMenuOpen(true));
      expect(state.accountMenuOpen).toBe(true);

      state = uiReducer(state, openAccountDialog("reset"));
      expect(state.activeAccountDialog).toBe("reset");
      expect(state.accountMenuOpen).toBe(false);

      state = uiReducer(state, closeAccountDialog());
      expect(state.activeAccountDialog).toBeNull();
    });

    it("closeAllOverlays closes mobile nav, mega menu, account menu, and dialogs", () => {
      let state = uiReducer(undefined, { type: "@@INIT" });
      state = uiReducer(state, toggleMobileNav());
      state = uiReducer(state, openMegaMenu("solutions"));
      state = uiReducer(state, setAccountMenuOpen(true));
      state = uiReducer(state, openAccountDialog("delete"));

      state = uiReducer(state, closeAllOverlays());
      expect(state.mobileNavOpen).toBe(false);
      expect(state.activeMegaMenu).toBeNull();
      expect(state.accountMenuOpen).toBe(false);
      expect(state.activeAccountDialog).toBeNull();
    });

    it("evaluates ui selectors correctly", () => {
      const rootState = {
        ui: {
          mobileNavOpen: true,
          activeMegaMenu: "about",
          navRowHidden: true,
          accountMenuOpen: false,
          activeAccountDialog: "forgot" as const,
        },
      } as RootState;

      expect(selectUI(rootState).activeMegaMenu).toBe("about");
      expect(selectMobileNavOpen(rootState)).toBe(true);
      expect(selectActiveMegaMenu(rootState)).toBe("about");
      expect(selectNavRowHidden(rootState)).toBe(true);
      expect(selectAccountMenuOpen(rootState)).toBe(false);
      expect(selectActiveAccountDialog(rootState)).toBe("forgot");
    });
  });

  describe("registerSlice", () => {
    it("has initial state at step 1", () => {
      const state = registerReducer(undefined, { type: "@@INIT" });
      expect(state.step).toBe(1);
      expect(state.step1.region).toBe("India");
      expect(state.resendAvailableAt).toBeNull();
      expect(state.successDialogOpen).toBe(false);
    });

    it("saves step 1 and transitions to step 2", () => {
      let state = registerReducer(undefined, { type: "@@INIT" });
      const step1Payload = {
        region: "Germany",
        firstName: "Hans",
        lastName: "Gruber",
        agreed: true,
        newsletter: true,
      };

      state = registerReducer(state, saveStep1(step1Payload));
      expect(state.step1).toEqual(step1Payload);

      state = registerReducer(state, goToStep(2));
      expect(state.step).toBe(2);
    });

    it("computes resendAvailableAt ~60s in the future via prepare callback", () => {
      const before = Date.now();
      const state = registerReducer(undefined, codeSent());
      const after = Date.now();

      expect(state.resendAvailableAt).toBeGreaterThanOrEqual(before + 59_000);
      expect(state.resendAvailableAt).toBeLessThanOrEqual(after + 61_000);
    });

    it("handles openSuccess and resetRegister", () => {
      let state = registerReducer(undefined, { type: "@@INIT" });
      state = registerReducer(state, openSuccess());
      expect(state.successDialogOpen).toBe(true);

      state = registerReducer(state, resetRegister());
      expect(state.step).toBe(1);
      expect(state.successDialogOpen).toBe(false);
      expect(state.resendAvailableAt).toBeNull();
    });

    it("evaluates register selectors correctly", () => {
      const rootState = {
        register: {
          step: 2 as const,
          step1: {
            region: "India",
            firstName: "Raj",
            lastName: "Patel",
            agreed: true,
            newsletter: false,
          },
          resendAvailableAt: 1700000000000,
          successDialogOpen: true,
        },
      } as RootState;

      expect(selectRegisterStep(rootState)).toBe(2);
      expect(selectRegisterStep1(rootState).firstName).toBe("Raj");
      expect(selectResendAvailableAt(rootState)).toBe(1700000000000);
      expect(selectSuccessDialogOpen(rootState)).toBe(true);
    });
  });
});
