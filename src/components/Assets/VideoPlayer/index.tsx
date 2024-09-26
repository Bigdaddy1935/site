"use client";
import IconArrowsExpandRight from "@/components/Icons/IconArrowsExpandRight";
import IconBackward from "@/components/Icons/IconBackward";
import IconForward from "@/components/Icons/IconForward";
import IconPause from "@/components/Icons/IconPause";
import IconPlay from "@/components/Icons/IconPlay";
import IconSettings5Fill from "@/components/Icons/IconSettings5Fill";
import IconSoundOff from "@/components/Icons/IconSoundOff";
import IconSoundOn from "@/components/Icons/IconSoundOn";
import IconSubtitles from "@/components/Icons/IconSubtitles";
import React, { useEffect, useRef, useState } from "react";
import { LessenItem } from "@/types/";


interface VideoPlayerProps {
  src: string;
  poster: string | null;
  setTimeData?: (d: { currentTime: number; duration: number }) => void;
  progress?: LessenItem["progress"][0];
  onPause?: () => void;
  type?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  setTimeData,
  progress,
  onPause,
  type,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [mute, setMute] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(progress?.time ?? 0);
  const [duration, setDuration] = useState<number>(0);
  const [showDuration, setShowDuration] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;

    const updateTime = () => {
      setCurrentTime(video!.currentTime);
      setDuration(video!.duration);
    };

    video!.addEventListener("timeupdate", updateTime);

    return () => {
      video!.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  useEffect(() => {
    if (progress?.time) {
      videoRef.current!.currentTime = progress.time;
      setCurrentTime(progress.time);
    }
  }, [progress?.time]);

  useEffect(() => {
    setTimeData?.({ currentTime, duration });
  }, [setTimeData, currentTime]);

  const togglePlay = () => {
    if (videoRef.current!.paused) {
      videoRef.current!.play();
    } else {
      videoRef.current!.pause();
      onPause?.();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (speed: number) => {
    setSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSetting(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleFullScreen = () => {
    const video = videoRef.current;
    if (video && video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const handleDownload = () => {
    const video = videoRef.current;
    if (video) {
      const a = document.createElement("a");
      a.href = src;
      a.download = "video.mp4";
      a.click();
    }
  };

  const handleBackward = () => {
    if (currentTime > 10 && videoRef.current) {
      setCurrentTime((prev) => {
        videoRef.current!.currentTime = prev - 10;
        return prev - 10;
      });
    }
  };

  const handleForward = () => {
    if (currentTime < duration - 10 && videoRef.current) {
      setCurrentTime((prev) => {
        videoRef.current!.currentTime = prev + 10;
        return prev + 30;
      });
    }
  };

  const calculatePlayedAmount = () => {
    return ((currentTime / duration) * 100 || 0).toFixed(0);
  };

  const calculateDownloadedAmount = () => {
    if (videoRef.current) {
      const buffered = videoRef.current.buffered;
      if (buffered.length > 0) {
        const end = buffered.end(buffered.length - 1);
        return ((end / duration) * 100).toFixed(2);
      }
    }
    return 0;
  };

  return (
    <>
      <div
        style={{ direction: "ltr" }}
        className={`relative overflow-hidden rounded-3xl ${type !== "podcast" && "max-h-[75vh]"}`}
      >
        {/*  {src.endsWith('.ts') ? (
        <TsVideoPlayer
          ref={videoRef}
          src={src}
          poster={poster ?? undefined}
          className={`video-player ${type === 'podcast' && 'h-20'}`}
          muted={mute}
        />
      ) : (
      
      )} */}
        <video
          ref={videoRef}
          src={src}
          poster={poster ?? undefined}
          className={`video-player ${type === "podcast" && "h-20"}`}
          muted={mute}
        >
          <source src={src} type="video/mp2t" />
        </video>
        <div className="controls absolute bottom-0 left-0 right-0 z-[15] transform bg-transparent p-2">
          <div className="flex items-center justify-between gap-2 px-3">
            <div className="relative flex-1">
              <input
                className="relative z-[15] w-full bg-transparent"
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={calculatePlayedAmount()}
                onChange={handleProgressChange}
                ref={progressBarRef}
              />
              <div className="absolute top-2.5 z-[0] h-1.5 w-full rounded-md bg-hgray-350" />
              <div
                style={{ width: `calc(${calculateDownloadedAmount()}%)` }}
                className="absolute top-2.5 z-[5] h-1.5 rounded-md bg-hgray-300"
              />
              <div
                style={{ width: `calc(${calculatePlayedAmount()}%)` }}
                className="absolute top-2.5 z-[10] h-1.5 rounded-md bg-primary-300"
              />
            </div>

            <div>
              <button
                onClick={() => setShowDuration(!showDuration)}
                className="cursor-pointer border-none bg-transparent text-white"
              >
                {!showDuration ? formatTime(currentTime) : formatTime(duration)}
              </button>
            </div>
          </div>

          <div className="mt-1 flex justify-between px-3 lg:mt-3">
            <div className="">
              <button
                className="mr-4 cursor-pointer border-none bg-transparent text-primary-300"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <IconPause width={22} height={22} />
                ) : (
                  <IconPlay width={22} height={22} />
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <button
                  className="mr-4 cursor-pointer border-none bg-transparent text-primary-300"
                  onClick={handleBackward}
                >
                  <IconBackward width={22} height={22} />
                </button>
                <button
                  className="cursor-pointer border-none bg-transparent text-primary-300"
                  onClick={handleForward}
                >
                  <IconForward width={22} height={22} />
                </button>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => setMute(!mute)}
                  className="mr-1 cursor-pointer border-none bg-transparent text-primary-300"
                >
                  {mute ? (
                    <IconSoundOff width={22} height={22} />
                  ) : (
                    <IconSoundOn width={24} height={24} />
                  )}
                </button>
                <div className="relative">
                  <input
                    className="relative z-[15] bg-transparent"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                  <div className="absolute top-2.5 z-[0] h-1.5 w-full rounded-md bg-hgray-200" />
                  <div
                    style={{ width: `calc(${volume * 100}%)` }}
                    className="absolute top-2.5 z-[10] h-1.5 rounded-md bg-primary-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1">
                <div className="group relative flex items-center px-1">
                  <button
                    onClick={() => setShowSetting((prev) => !prev)}
                    className="cursor-pointer border-none bg-transparent text-primary-300"
                  >
                    <IconSettings5Fill width={22} height={22} />
                  </button>

                  <div
                    className={`absolute bottom-[100%] right-0 z-40 ${showSetting ? "block opacity-100" : "hidden opacity-0"}  rounded-sm bg-white/70 p-1  hover:block hover:opacity-100 group-hover:block group-hover:opacity-100`}
                  >
                    {["0.5", "0.75", "1", "1.25", "1.5", "2"].map((i) => (
                      <button
                        key={i}
                        className="mr-4 flex w-full cursor-pointer items-center border-none bg-transparent text-black hover:bg-white/90"
                        onClick={() => handleSpeedChange(Number(i))}
                      >
                        <span
                          className={`mr-1 inline-block h-3 w-3 rounded-full border border-solid ${speed === Number(i) && "bg-white"}`}
                        ></span>
                        {`${i}x`}
                      </button>
                    ))}
                  </div>
                </div>

                {type !== "podcast" && (
                  <>
                    <button>
                      <IconSubtitles
                        width={22}
                        height={22}
                        className="text-primary-300"
                      />
                    </button>

                    <button
                      onClick={handleFullScreen}
                      className="cursor-pointer border-none bg-transparent text-primary-300"
                    >
                      <IconArrowsExpandRight width={22} height={22} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {!isPlaying && type !== "podcast" ? (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white/65">
            <button
              onClick={togglePlay}
              className="flex h-[65px] w-[65px] items-center justify-center rounded-full bg-primary-300 text-white"
            >
              <IconPlay width={28} height={28} />
            </button>
          </div>
        ) : (
          <div
            onClick={togglePlay}
            className="absolute bottom-0 left-0 right-0 top-0 z-[10] bg-transparent"
          ></div>
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
