import { useState, useEffect, useCallback } from 'react';
import SoundboardPad from './SoundboardPad';

import kit1 from '../json/kit1.json';
import kit2 from '../json/kit2.json';
import kit3 from '../json/kit3.json';

// Hashmap for key presses
const keyToSound = new Map([
  // Kit1
  ['KeyQ', 'Kick 1'],
  ['KeyW', 'Snare 1'],
  ['KeyE', 'Closed 1'],
  ['KeyR', 'Open 1'],
  ['KeyT', 'Key 1'],
  ['KeyY', 'Guitar 1'],
  ['KeyU', 'Bass 1'],
  ['KeyI', 'Tom 1'],
  ['KeyO', 'Clap 1'],
  ['KeyP', 'Adlib 1'],
  // Kit2
  ['KeyA', 'Kick 2'],
  ['KeyS', 'Snare 2'],
  ['KeyD', 'Closed 2'],
  ['KeyF', 'Open 2'],
  ['KeyG', 'Key 2'],
  ['KeyH', 'Guitar 2'],
  ['KeyJ', 'Bass 2'],
  ['KeyK', 'Tom 2'],
  ['KeyL', 'Clap 2'],
  ['Semicolon', 'Adlib 2'],
  // Kit3
  ['KeyZ', 'Kick 3'],
  ['KeyX', 'Snare 3'],
  ['KeyC', 'Closed 3'],
  ['KeyV', 'Open 3'],
  ['KeyB', 'Key 3'],
  ['KeyN', 'Guitar 3'],
  ['KeyM', 'Bass 3'],
  ['Comma', 'Tom 3'],
  ['Period', 'Clap 3'],
  ['Slash', 'Adlib 3']
]);

type Props = {
  volume: number
}

const Soundboard = ({ volume }: Props) => {

  // Event handler functions
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (keyToSound.has(event.code) && !event.repeat) {
      const name = keyToSound.get(event.code)!;
      const pad = document.getElementById(name);
      pad?.dispatchEvent(new Event('mousedown'));
      pad?.classList.add('scale-95');
    }
  }, []);
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (keyToSound.has(event.code)) {
      const name = keyToSound.get(event.code)!;
      const pad = document.getElementById(name);
      pad?.classList.remove('scale-95');
    }
  }, []);

  useEffect(() => {
    // Listen for key presses
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keypress', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [handleKeyDown, handleKeyUp]);

  // Web Audio API setup
  const audioContext = new AudioContext();

  // Get sample from public folder
  const getSample = async (path: string) => {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  // Set them up on audio buffers
  const loadSounds = async (paths: string[]) => {
    const audioBuffers = [];

    for (const path of paths) {
      const sample = await getSample(path);
      audioBuffers.push(sample);
    }

    return audioBuffers;
  }

  // Render pads only after loading
  let loads = 0;
  const [loading, setLoading] = useState(true);

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
              context={audioContext}
              audio={sound}
              volume={volume}
            />
          )
        }));
  
        // Increment loads until all kits are loaded
        loads++;
        if (loads === kits.length)
          setLoading(false);
      });
    });

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex items-center h-96 bg-secondary">
      {/* Keyboard Icon */}
      <div className="w-[5%] flex justify-center pl-3">
        <svg className="fill-primary w-[28px] drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M512 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V128C576 92.65 547.3 64 512 64zM528 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h448c8.822 0 16 7.178 16 16V384zM140 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 157.3 146.7 152 140 152zM196 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 194.7 189.3 200 196 200zM276 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 194.7 269.3 200 276 200zM356 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 194.7 349.3 200 356 200zM460 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 157.3 466.7 152 460 152zM140 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 237.3 146.7 232 140 232zM196 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 274.7 189.3 280 196 280zM276 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 274.7 269.3 280 276 280zM356 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 274.7 349.3 280 356 280zM460 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 237.3 466.7 232 460 232zM400 320h-224C167.1 320 160 327.1 160 336V352c0 8.875 7.125 16 16 16h224c8.875 0 16-7.125 16-16v-16C416 327.1 408.9 320 400 320z"/>
        </svg>
      </div>
      {/* Effects */}
      <div className="m-auto overflow-x-auto">
      {!loading ? (
        <div>
          <div className="flex gap-1 mb-1">
            {firstRow}
            <div className="w-4"></div>
          </div>
          <div className="flex gap-1 mb-1">
            <div className="w-2"></div>
            {secondRow}
            <div className="w-2"></div>
          </div>
          <div className="flex gap-1">
            <div className="w-4"></div>
            {thirdRow}
          </div>
        </div>
      ) : (
        <span className="text-lg text-primary">Loading ...</span>
      )}
      </div>
      {/* Mouse Icon */}
      <div className="w-[5%] flex justify-center pr-3">
        <svg className="fill-primary w-[18px] drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M0 192H176V0H160C71.6 0 0 71.6 0 160v32zm0 32V352c0 88.4 71.6 160 160 160h64c88.4 0 160-71.6 160-160V224H192 0zm384-32V160C384 71.6 312.4 0 224 0H208V192H384z"/>
        </svg>
      </div>
    </div>
  );
}

export default Soundboard;
