import { useState, useEffect } from 'react';
import TopControls from './TopControls';
import Soundboard from './Soundboard';
import Timeline from './Timeline';

import kit1 from '../json/kit1.json';
import kit2 from '../json/kit2.json';
import kit3 from '../json/kit3.json';

type Pad = {
  id: number,
  type: string,
  path: string,
  color: string,
  name: string,
  audio: AudioBuffer | null
}

type Kit = Pad[];

type Props = {
  audioContext: AudioContext
}

const DAW = ({ audioContext }: Props) => {

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
  const playSound = (audioBuffer: AudioBuffer, panning=0, selfVol=1, masterVol=masterVolume) => {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    // Panning & volume
    const pan = new StereoPannerNode(audioContext, { pan: panning });
    const vol = audioContext.createGain();
    vol.gain.value = selfVol * masterVol;
    source.connect(vol).connect(pan).connect(audioContext.destination);

    // Play
    source.start(0);
  }

  // State for re-rendering the component after all kits are loaded
  const [loaded, setLoaded] = useState(false);

  // Load all kits
  const kits: Kit[] = [kit1, kit2, kit3];
  useEffect(() => {
    let loads = 0;
    kits.forEach(async (kit) => {
      const paths = kit.map(sound => sound.path);
      await loadSounds(paths).then(response => {
        response.forEach((audio, i) => {
          kit[i].audio = audio;
          loads++;
        });
      });
      if (loads === 30) setLoaded(true);
    });

    return () => {
      loads = 0;
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex flex-col justify-center max-w-6xl h-[90vh] m-auto">
      {/* Upper Bar Controls */}
      <TopControls
        BPM={BPM}
        setBPM={setBPM}
        masterVolume={masterVolume}
        setMasterVolume={setMasterVolume}
      />
      {/* Sound Effects */}
      <Soundboard
        loaded={loaded}
        kits={kits}
        playSound={playSound}
      />
      {/* Timeline */}
      <Timeline
        kits={kits}
        playSound={playSound}
        BPM={BPM}
        setBPM={setBPM}
        masterVolume={masterVolume}
        setMasterVolume={setMasterVolume}
      />
    </div>
  );
}

export default DAW;
