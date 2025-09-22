import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] TTS API called");
    const { text, voice } = await request.json();
    console.log("[v0] Request data:", { textLength: text?.length, voice });

    if (!text) {
      console.log("[v0] Missing text parameter");
      return NextResponse.json(
        { error: "Missing required field: text" },
        { status: 400 }
      );
    }

    const apiKey = process.env.TTS_OPENAI_KEY;
    if (!apiKey) {
      console.error("[v0] Missing TTS OpenAI API key");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const voiceId = "OA001"; // Default voice for ttsopenai.com
    console.log("[v0] Using ttsopenai.com voice:", voiceId);

    const truncatedText =
      text.length > 10000 ? text.substring(0, 10000) + "..." : text;
    console.log("[v0] Text length after truncation:", truncatedText.length);

    const response = await fetch(
      "https://api.ttsopenai.com/uapi/v1/text-to-speech",
      {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1", // Using faster model
          input: truncatedText,
          voice_id: voiceId, // ttsopenai.com uses voice_id instead of voice
          speed: 1.0,
        }),
      }
    );

    console.log("[v0] ttsopenai.com API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[v0] ttsopenai.com API error:", errorText);
      return NextResponse.json(
        {
          error: "TTS API request failed",
          details: errorText,
          status: response.status,
        },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    console.log("[v0] Audio generated, size:", audioBuffer.byteLength, "bytes");

    return new NextResponse(Buffer.from(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[v0] TTS API error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate audio",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
