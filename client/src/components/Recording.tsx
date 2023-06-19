"use client";
import * as Progress from "@radix-ui/react-progress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Recording = ({
  id,
  name,
  url,
}: {
  id: string;
  name: string;
  url: string;
}) => {
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audioElement = audioRef.current;
    if (audioElement === null) return;
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement === null) return;
    audioElement.addEventListener("loadedmetadata", () => {
      const duration = audioElement.duration;
      console.log("Audio duration:", duration);
    });
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement === null) return;
    audioElement.addEventListener("timeupdate", () => {
      const progress = (audioElement.currentTime / audioElement.duration) * 100;
      setProgress(progress);
    });
  }, [isPlaying]);

  return (
    <div key={id} className=" flex flex-col bg-slate gap-4 p-4 rounded-[20px]">
      <div className=" flex gap-4 items-center">
        <button onClick={togglePlay}>
          <Image
            style={{
              maxWidth: "unset",
              height: "unset",
            }}
            src="/play.svg"
            alt="play icon"
            width={48}
            height={48}
            priority
          />
        </button>

        <Progress.Root
          className="relative overflow-hidden bg-blackA9 rounded-full w-full h-[20px] bg-slate-input"
          style={{
            // Fix overflow clipping in Safari
            // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
            transform: "translateZ(0)",
          }}
          value={progress}
        >
          <Progress.Indicator
            className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </Progress.Root>
      </div>

      <p className=" font-medium text-sm text-white w-[260px]">{name} </p>

      <audio
        ref={audioRef}
        src={`https://gateway.lighthouse.storage/ipfs/${url}`}
      />
    </div>
  );
};

export default Recording;
