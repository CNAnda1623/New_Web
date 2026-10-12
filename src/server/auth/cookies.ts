import { cookies } from "next/headers";
import crypto from "crypto";
import { signAccessToken, signRefreshToken, type TokenUserPayload } from "./jwt";
import { saveRefreshToken } from "../db/store";

export async function setAuthCookies(
  user: TokenUserPayload,
  rememberMe: boolean = false
): Promise<void> {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  // 1. Access Token (15 minutes)
  const accessToken = await signAccessToken(user);
  cookieStore.set({
    name: "sg_at",
    value: accessToken,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });

  // 2. Refresh Token (30 days or 24 hours)
  const jti = crypto.randomUUID();
  const refreshToken = await signRefreshToken({ id: user.id, jti });
  const refreshMaxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

  saveRefreshToken(jti, user.id, refreshToken, Date.now() + refreshMaxAge * 1000);

  cookieStore.set({
    name: "sg_rt",
    value: `${jti}:${refreshToken}`,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/api/auth",
    maxAge: refreshMaxAge,
  });
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("sg_at");
  cookieStore.delete("sg_rt");
}
