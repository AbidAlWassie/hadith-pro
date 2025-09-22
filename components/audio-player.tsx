"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface AudioPlayerProps {
  text: string;
  language?: "ar" | "en";
  className?: string;
}

export function AudioPlayer({
  text,
  language = "ar",
  className = "",
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([0.7]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const generateAudio = async () => {
    setIsLoading(true);
    try {
      const voiceMap = {
        ar: "ar-XA-Wavenet-A", // Arabic voice
        en: "en-US-Wavenet-D", // English voice
      };

      console.log(
        "[v0] Generating audio for text:",
        text.substring(0, 50) + "..."
      );

      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          language,
          voice: voiceMap[language],
        }),
      });

      console.log("[v0] TTS API response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[v0] TTS API error:", errorData);
        throw new Error(`API request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      console.log("[v0] Audio blob created, size:", audioBlob.size);

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        // Auto-play after loading
        audioRef.current.addEventListener(
          "canplaythrough",
          () => {
            audioRef.current?.play();
          },
          { once: true }
        );
      }
    } catch (error) {
      console.error("[v0] Audio generation failed:", error);
      toast.error(
        "Failed to generate audio. Please check your API configuration."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current?.src) {
      await generateAudio();
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0];
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => {
        console.log("[v0] Audio started playing");
        setIsPlaying(true);
      };
      const handlePause = () => {
        console.log("[v0] Audio paused");
        setIsPlaying(false);
      };
      const handleEnded = () => {
        console.log("[v0] Audio playback ended");
        setIsPlaying(false);
      };
      const handleError = (e: Event) => {
        console.error("[v0] Audio playback error:", e);
        toast.error("Audio playback failed");
        setIsPlaying(false);
        setIsLoading(false);
      };

      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, []);

  return (
    <Card className={`border border-muted ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            disabled={isLoading}
            className="flex-shrink-0 bg-transparent"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          {duration > 0 && (
            <>
              <div className="flex-1 space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={handleSeek}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="flex-shrink-0"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Slider
                  value={volume}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                  className="w-20"
                />
              </div>
            </>
          )}
        </div>

        <audio ref={audioRef} preload="none" />
      </CardContent>
    </Card>
  );
}
