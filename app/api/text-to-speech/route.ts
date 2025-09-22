import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, language, voice } = await request.json();

    if (!text || !language || !voice) {
      return NextResponse.json(
        { error: "Missing required fields: text, language, or voice" },
        { status: 400 }
      );
    }

    // Call the SpeechGen API
    const response = await fetch("https://api.speechgen.io/v1/synthesize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SPEECHGEN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        voice_id: voice,
        language_code: language,
        audio_format: "mp3",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: "TTS API request failed", details: errorData },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(audioBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": Buffer.byteLength(audioBuffer).toString(),
      },
    });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      { error: "Failed to generate audio" },
      { status: 500 }
    );
  }
}
