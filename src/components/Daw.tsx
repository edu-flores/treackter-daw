import { useState, useEffect } from 'react';
import TopControls from './TopControls';
import Soundboard from './Soundboard';
import Timeline from './Timeline';

import kit1 from '../json/kit1.json';
import kit2 from '../json/kit2.json';
import kit3 from '../json/kit3.json';

type Kit = {
  id: number,
  type: string,
  path: string,
  color: string,
  name: string,
  audio: AudioBuffer | null
}[]

type Props = {
  audioContext: any
}

const Daw = ({ audioContext }: Props) => {

  // Beats per minute
  const [BPM, setBPM] = useState(120);

  // Master volume
  const [masterVolume, setMasterVolume] = useState(0.5);

  // Get sample from public folder
  const getSample = async (path: string) => {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  // Set up sounds on audio buffer arrays
  const loadSounds = async (paths: string[]) => {
    const audioBuffers = [];

    for (const path of paths) {
      const sample = await getSample(path);
      audioBuffers.push(sample);
    }

    return audioBuffers;
  }

  // Start a sound
  const playSound = (audioBuffer: AudioBuffer, volume=masterVolume, panning=0) => {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    // Volume & Panning
    const vol = audioContext.createGain();
    vol.gain.value = volume;
    const pan = new StereoPannerNode(audioContext, { pan: panning });
    source.connect(vol).connect(pan).connect(audioContext.destination);

    // Play
    source.start(0);
  }

  // Determine if all audio buffers have been loaded on their respective kit
  let loads = 0;
  const [loading, setLoading] = useState(true);

  // Load all kits
  const kits: Kit[] = [kit1, kit2, kit3];
  useEffect(() => {
    kits.forEach(kit => {
      const paths = kit.map(sound => sound.path);
      loadSounds(paths).then(response => {
        response.forEach((audio, index) => {
          kit[index].audio = audio;
        });

        // Increment loads until all kits are loaded
        loads++;
        if (loads === kits.length)
          setLoading(false);
      });
    });

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="max-w-6xl m-auto">
      {/* Upper Bar Controls */}
      <TopControls
        BPM={BPM}
        setBPM={setBPM}
        masterVolume={masterVolume}
        setMasterVolume={setMasterVolume}
      />
      {/* Sound Effects */}
      <Soundboard
        loading={loading}
        kits={[kit1, kit2, kit3]}
        playSound={playSound}
        masterVolume={masterVolume}
      />
      {/* Timeline */}
      <Timeline
        BPM={BPM}
        masterVolume={masterVolume}
      />
    </div>
  );
}

export default Daw;
