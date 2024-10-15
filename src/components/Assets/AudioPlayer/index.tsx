"use client";

import IconPause from "@/components/Icons/IconPause";
import IconPlay from "@/components/Icons/IconPlay";
import { useEffect, useRef, useState } from "react";
import { LessenItem } from "@/types/";
import { useAudioPlayer } from "./AudioPlayerContext";

type Props = {
  src: string;
  picture: string;
  id: number;
};
export default function AudioPlayer(props: Props) {
  const { src, picture, id } = props;
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLVideoElement>(null);
  const { playing, setPlaying } = useAudioPlayer();
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setDuration(audio!.duration);
    };

    audio!.addEventListener("timeupdate", updateTime);

    return () => {
      audio!.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current!.paused) {
      audioRef.current!.play();
      setPlaying(id);
    } else {
      audioRef.current!.pause();
      setPlaying(null);
    }
  };

  useEffect(() => {
    if (playing !== id) audioRef.current!.pause();
  }, [playing]);

  return (
    <div className="audio-player">
      <video preload="none" ref={audioRef} className="h-0" src={src} />
      <div className="controls">
        <div
          style={{ backgroundImage: `url("${picture}")` }}
          className="w-full h-[70px] rounded-xl flex items-center justify-center bg-contain"
        >
          <button
            className={`w-[54px] h-[54px] flex items-center justify-center rounded-full text-white border-none cursor-pointer`}
            onClick={togglePlay}
          >
            {playing === id ? (
              <IconPause width={24} height={24} />
            ) : (
              <IconPlay width={24} height={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
