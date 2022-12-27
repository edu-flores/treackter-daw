import { useEffect, useCallback } from 'react';
import SoundboardPad from './SoundboardPad';
import kit1 from '../sounds/kit1/_data.json';
import kit2 from '../sounds/kit2/_data.json';
import kit3 from '../sounds/kit3/_data.json';

type Sound = {
  "id": string,
  "sound": string,
  "color": string,
  "name": string
}

// Hashmap for key presses
const keyToSound = new Map();
// Kit1
keyToSound.set('KeyQ', [1, 'kick1.wav']);
keyToSound.set('KeyW', [1, 'snare1.wav']);
keyToSound.set('KeyE', [1, 'closed1.wav']);
keyToSound.set('KeyR', [1, 'open1.wav']);
keyToSound.set('KeyT', [1, 'key1.wav']);
keyToSound.set('KeyY', [1, 'guitar1.wav']);
keyToSound.set('KeyU', [1, 'bass1.wav']);
keyToSound.set('KeyI', [1, 'tom1.wav']);
keyToSound.set('KeyO', [1, 'clap1.wav']);
keyToSound.set('KeyP', [1, 'adlib1.wav']);
// Kit2
keyToSound.set('KeyA', [2, 'kick2.wav']);
keyToSound.set('KeyS', [2, 'snare2.wav']);
keyToSound.set('KeyD', [2, 'closed2.wav']);
keyToSound.set('KeyF', [2, 'open2.wav']);
keyToSound.set('KeyG', [2, 'key2.wav']);
keyToSound.set('KeyH', [2, 'guitar2.wav']);
keyToSound.set('KeyJ', [2, 'bass2.wav']);
keyToSound.set('KeyL', [2, 'clap2.wav']);
keyToSound.set('Semicolon', [2, 'adlib2.wav']);
// Kit3
keyToSound.set('KeyZ', [3, 'kick3.wav']);
keyToSound.set('KeyX', [3, 'snare3.wav']);
keyToSound.set('KeyC', [3, 'closed3.wav']);
keyToSound.set('KeyV', [3, 'open3.wav']);
keyToSound.set('KeyB', [3, 'key3.wav']);
keyToSound.set('KeyN', [3, 'guitar3.wav']);
keyToSound.set('KeyM', [3, 'bass3.wav']);
keyToSound.set('KeyK', [2, 'tom2.wav']);
keyToSound.set('Comma',[3, 'tom3.wav']);
keyToSound.set('Period', [3, 'clap3.wav']);
keyToSound.set('Slash', [3, 'adlib3.wav']);

const Soundboard = () => {

  // Reproduce media after clicking a soundboard pad or pressing a key
  function playAudio(n: number, audio: string) {

    // Web Audio API specs
    const audioContext = new AudioContext();
    const audioSource = new Audio(require(`../sounds/kit${n}/${audio}`));
    const audioEffect = audioContext.createMediaElementSource(audioSource);

    // Controlling audio (gain and panning)
    const vol = audioContext.createGain();
    vol.gain.value = 0.5;
    const pan = new StereoPannerNode(audioContext, { pan: 0 });
    audioEffect.connect(vol).connect(pan).connect(audioContext.destination);
    audioSource.play();
  }

  // Event handler function
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (keyToSound.has(event.code)) {
      const [n, audio] = keyToSound.get(event.code);
      playAudio(n, audio);
    }
  }, []);

  // Listen for key presses
  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    }
  }, [handleKeyPress]);

  // SoundboardPad creator function
  const createRow = (sound: Sound) => {
    return (
      <SoundboardPad
        key={sound.id}
        name={sound.name}
        audio={sound.sound}
        background={sound.color}
        playAudio={playAudio}
      />
    );
  }

  // Create pads for each kit
  const firstRow = kit1.map(createRow);
  const secondRow = kit2.map(createRow);
  const thirdRow = kit3.map(createRow);

  return (
    <div className="flex items-center h-96 bg-secondary">
      {/* Keyboard Icon */}
      <div className="w-[5%] flex justify-center pl-3">
        <svg className="fill-white w-[28px] drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M512 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V128C576 92.65 547.3 64 512 64zM528 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h448c8.822 0 16 7.178 16 16V384zM140 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 157.3 146.7 152 140 152zM196 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 194.7 189.3 200 196 200zM276 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 194.7 269.3 200 276 200zM356 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 194.7 349.3 200 356 200zM460 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 157.3 466.7 152 460 152zM140 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 237.3 146.7 232 140 232zM196 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 274.7 189.3 280 196 280zM276 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 274.7 269.3 280 276 280zM356 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 274.7 349.3 280 356 280zM460 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 237.3 466.7 232 460 232zM400 320h-224C167.1 320 160 327.1 160 336V352c0 8.875 7.125 16 16 16h224c8.875 0 16-7.125 16-16v-16C416 327.1 408.9 320 400 320z"/>
        </svg>
      </div>
      {/* Effects */}
      <div className="flex flex-col gap-1 w-full py-5 overflow-x-auto">
        <div className="flex gap-1">
          {firstRow}
          <div className="w-4"></div>
        </div>
        <div className="flex gap-1">
          <div className="w-2"></div>
          {secondRow}
          <div className="w-2"></div>
        </div>
        <div className="flex gap-1">
          <div className="w-4"></div>
          {thirdRow}
        </div>
      </div>
      {/* Mouse Icon */}
      <div className="w-[5%] flex justify-center pr-3">
        <svg className="fill-white w-[18px] drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M0 192H176V0H160C71.6 0 0 71.6 0 160v32zm0 32V352c0 88.4 71.6 160 160 160h64c88.4 0 160-71.6 160-160V224H192 0zm384-32V160C384 71.6 312.4 0 224 0H208V192H384z"/>
        </svg>
      </div>
    </div>
  );
}

export default Soundboard;
