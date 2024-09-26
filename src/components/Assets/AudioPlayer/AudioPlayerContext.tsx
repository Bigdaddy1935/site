"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

type AudioPlayerContextType = {
  playing: number | null;
  setPlaying: (playing: number | null) => void;
};
export const AudioPlayerContext = createContext<AudioPlayerContextType>({
  playing: null,
  setPlaying: () => {},
});

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export default function AudioPlayerProvider({ children }: PropsWithChildren) {
  const [playing, setPlaying] = useState<number | null>(null);
  return (
    <AudioPlayerContext.Provider value={{ playing, setPlaying }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
