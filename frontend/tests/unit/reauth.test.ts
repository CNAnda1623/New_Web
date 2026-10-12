import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { makeStore } from "@/store/makeStore";
import { authApi } from "@/store/api/authApi";

let refreshCallCount = 0;

const server = setupServer(
  http.get("http://localhost:3000/api/auth/me", () => {
    if (refreshCallCount === 0) {
      return HttpResponse.json({ error: "Token expired" }, { status: 401 });
    }
    return HttpResponse.json({
      user: {
        id: "usr-1",
        name: "Refreshed User",
        email: "refreshed@example.com",
        role: "For Home",
      },
    });
  }),

  // Also support relative path for fetch
  http.get("/api/auth/me", () => {
    if (refreshCallCount === 0) {
      return HttpResponse.json({ error: "Token expired" }, { status: 401 });
    }
    return HttpResponse.json({
      user: {
        id: "usr-1",
        name: "Refreshed User",
        email: "refreshed@example.com",
        role: "For Home",
      },
    });
  }),

  http.post("http://localhost:3000/api/auth/refresh", () => {
    refreshCallCount++;
    return HttpResponse.json({ success: true });
  }),

  http.post("/api/auth/refresh", () => {
    refreshCallCount++;
    return HttpResponse.json({ success: true });
  }),

  http.post("http://localhost:3000/api/auth/login", () => {
    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),

  http.post("/api/auth/login", () => {
    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  server.resetHandlers();
  refreshCallCount = 0;
});
afterAll(() => server.close());

describe("baseQueryWithReauth & Mutex", () => {
  it("causes exactly one refresh call when several simultaneous 401s occur", async () => {
    const store = makeStore();

    // Trigger 3 simultaneous getMe queries that return 401 initially
    const p1 = store.dispatch(
      authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true })
    );
    const p2 = store.dispatch(
      authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true })
    );
    const p3 = store.dispatch(
      authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true })
    );

    const [r1, r2, r3] = await Promise.all([p1, p2, p3]);

    // Mutex ensured refresh was called exactly ONCE
    expect(refreshCallCount).toBe(1);

    // All 3 resolved with the user data after the single refresh
    expect(r1.data?.user.name).toBe("Refreshed User");
    expect(r2.data?.user.name).toBe("Refreshed User");
    expect(r3.data?.user.name).toBe("Refreshed User");

    // Store auth status updated to authenticated
    expect(store.getState().auth.status).toBe("authenticated");
    expect(store.getState().auth.user?.name).toBe("Refreshed User");
  });

  it("does not trigger refresh for login 401", async () => {
    const store = makeStore();

    const res = await store.dispatch(
      authApi.endpoints.login.initiate({
        email: "test@example.com",
        password: "wrongpassword",
      })
    );

    expect(refreshCallCount).toBe(0);
    expect(res.error).toBeDefined();
    expect(res.error).toEqual(
      expect.objectContaining({
        code: "401",
        message: "Invalid credentials",
      })
    );
  });

  it("transitions auth status to anonymous when refresh fails", async () => {
    // Override refresh to fail with 401
    server.use(
      http.post("/api/auth/refresh", () => {
        refreshCallCount++;
        return HttpResponse.json({ error: "Refresh token revoked" }, { status: 401 });
      }),
      http.post("http://localhost:3000/api/auth/refresh", () => {
        refreshCallCount++;
        return HttpResponse.json({ error: "Refresh token revoked" }, { status: 401 });
      })
    );

    const store = makeStore();
    expect(store.getState().auth.status).toBe("loading");

    const res = await store.dispatch(
      authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true })
    );

    expect(refreshCallCount).toBe(1);
    expect(res.error).toBeDefined();
    expect(store.getState().auth.status).toBe("anonymous");
    expect(store.getState().auth.user).toBeNull();
  });
});
