import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/server/auth/cookies";

export async function POST() {
  try {
    await clearAuthCookies();
    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (err) {
    console.error("logout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
