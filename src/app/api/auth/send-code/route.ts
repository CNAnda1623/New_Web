import { NextResponse } from "next/server";
import { z } from "zod";
import {
  canSendCode,
  saveVerificationCode,
} from "@/server/db/store";
import { generateVerificationCode } from "@/server/auth/codes";
import { sendEmailCode } from "@/server/email/mailer";

const sendCodeSchema = z.object({
  email: z.string().email(),
  purpose: z.enum(["register", "login", "reset-password", "delete-account"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = sendCodeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { email, purpose } = result.data;
    const check = canSendCode(email, purpose);
    if (!check.allowed) {
      return NextResponse.json(
        {
          error: `Please wait ${check.waitSeconds || 60} seconds before requesting a new code.`,
          waitSeconds: check.waitSeconds || 60,
        },
        { status: 429 }
      );
    }

    const code = generateVerificationCode();
    saveVerificationCode(email, code, purpose);
    await sendEmailCode(email, code, purpose);

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (err) {
    console.error("send-code error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
