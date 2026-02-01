import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

function getTodayKey(): string {
  const today = new Date().toISOString().split("T")[0];
  return `views:daily:${today}`;
}

export async function POST() {
  try {
    const todayKey = getTodayKey();

    const [total, today] = await Promise.all([
      redis.incr("views:total"),
      redis.incr(todayKey),
    ]);

    // Set expiry on daily key (48 hours = 172800 seconds)
    await redis.expire(todayKey, 172800);

    return NextResponse.json({ total, today });
  } catch (error) {
    console.error("Failed to increment views:", error);
    return NextResponse.json({ total: 0, today: 0 }, { status: 500 });
  }
}

export async function GET() {
  try {
    const todayKey = getTodayKey();

    const [total, today] = await Promise.all([
      redis.get<number>("views:total"),
      redis.get<number>(todayKey),
    ]);

    return NextResponse.json({
      total: total || 0,
      today: today || 0,
    });
  } catch (error) {
    console.error("Failed to get views:", error);
    return NextResponse.json({ total: 0, today: 0 }, { status: 500 });
  }
}
