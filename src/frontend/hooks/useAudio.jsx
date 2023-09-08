import { useState } from 'react';
import useSound from 'use-sound';

const useAudio = ({ audioTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause }] = useSound(audioTrack, {
    volume: 0.5,
    onend: () => {
      setIsPlaying(false);
    },
  });

  const handleSoundPausePlay = () => {
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      pause();
      return;
    }

    play();
  };

  return handleSoundPausePlay;
};

export default useAudio;
