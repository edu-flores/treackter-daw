import { useState, useEffect } from 'react';
import TopControls from './TopControls';
import Soundboard from './Soundboard';
import SoundboardPad from './SoundboardPad';
import Timeline from './Timeline';

import kit1 from '../json/kit1.json';
import kit2 from '../json/kit2.json';
import kit3 from '../json/kit3.json';

const Daw = () => {

  // Beats per minute
  const [BPM, setBPM] = useState(120);

  // Master volume
  const [masterVolume, setMasterVolume] = useState(0.5);

  // Web Audio API setup
  const audioContext = new AudioContext();

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

  // Create each row after each kit
  const [firstRow, setFirstRow] = useState<JSX.Element[]>();
  const [secondRow, setSecondRow] = useState<JSX.Element[]>();
  const [thirdRow, setThirdRow] = useState<JSX.Element[]>();

  // Load all kits
  const kits = [kit1, kit2, kit3];
  const setters = [setFirstRow, setSecondRow, setThirdRow];
  useEffect(() => {
    kits.forEach((kit, kitIndex) => {
      const paths = kit.map(sound => sound.path);
      loadSounds(paths).then(response => {
  
        // Fill row with pads
        const setter = setters[kitIndex];
        setter(response.map((sound: AudioBuffer, soundIndex) => {
          return (
            <SoundboardPad
              key={kit[soundIndex].id}
              name={kit[soundIndex].name}
              background={kit[soundIndex].color}
              audio={sound}
              playSound={playSound}
            />
          );
        }));
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
        pads={[firstRow, secondRow, thirdRow]}
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
