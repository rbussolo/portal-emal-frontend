import { useEffect, useState } from "react";

import sound from './music.mp3';

interface Song {
  name: string;
  url: string;
}

const Player = () => {
  // This could came from params
  const song: Song = {
    name: 'Random Music',
    url: sound
  }

  const audio = new Audio(song.url);
  
  return (
    <PlayerDisplay song={song} audio={audio}/>
  )
}

interface PlayerDisplayProps {
  song: Song;
  audio: HTMLAudioElement
}

const PlayerDisplay = ({ song, audio }: PlayerDisplayProps) => {
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return (
    <div>
      <p>Now is playing {song.name}</p>
      <button onClick={() => setPlaying(!isPlaying)}>Pause / Resume</button>
    </div>
  )
}

export { Player }