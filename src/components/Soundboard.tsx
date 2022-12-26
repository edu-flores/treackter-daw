import { useState, useEffect } from 'react';
import Pad from './Pad';
import kit1 from '../sounds/kit1/_data.json';
import kit2 from '../sounds/kit2/_data.json';
import kit3 from '../sounds/kit3/_data.json';

// Props definer
type Sound = {
  "id": string,
  "sound": string,
  "color": string,
  "name": string
}

function Soundboard() {

  const [pressed, setPressed] = useState("");

  // Event handler
  const keyToSound = new Map();
  keyToSound.set("KeyQ", "Kick 1");
  keyToSound.set("KeyA", "Kick 2");
  keyToSound.set("KeyZ", "Kick 3");
  keyToSound.set("KeyW", "Snare 1");
  keyToSound.set("KeyS", "Snare 2");
  keyToSound.set("KeyX", "Snare 3");
  keyToSound.set("KeyE", "Closed 1");
  keyToSound.set("KeyD", "Closed 2");
  keyToSound.set("KeyC", "Closed 3");
  keyToSound.set("KeyR", "Open 1");
  keyToSound.set("KeyF", "Open 2");
  keyToSound.set("KeyV", "Open 3");
  keyToSound.set("KeyT", "Key 1");
  keyToSound.set("KeyG", "Key 2");
  keyToSound.set("KeyB", "Key 3");
  keyToSound.set("KeyY", "Guitar 1");
  keyToSound.set("KeyH", "Guitar 2");
  keyToSound.set("KeyN", "Guitar 3");
  keyToSound.set("KeyU", "Bass 1");
  keyToSound.set("KeyJ", "Bass 2");
  keyToSound.set("KeyM", "Bass 3");
  keyToSound.set("KeyI", "Tom 1");
  keyToSound.set("KeyK", "Tom 2");
  keyToSound.set("Comma", "Tom 3");
  keyToSound.set("KeyP", "Adlib 1");
  keyToSound.set("Semicolon", "Adlib 2");
  keyToSound.set("Slash", "Adlib 3");
  const handleKeyDown = (event: KeyboardEvent) => {
    setPressed(keyToSound.get(event.code));
  }
  
  // Listen for keypress
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  // Pad creator function
  const createRow = (sound: Sound) => {
    return (
      <Pad
        key={sound.id}
        name={sound.name}
        audio={sound.sound}
        background={sound.color}
        pressed={pressed}
      />
    );
  }

  // Create pads for each kit
  const firstRow = kit1.map(createRow);
  const secondRow = kit2.map(createRow);
  const thirdRow = kit3.map(createRow);

  return (
    <div className="flex items-center h-96 bg-secondary px-3">
      {/* Keyboard Icon */}
      <div className="w-[5%] flex justify-center">
        <svg className="fill-white w-[28px] drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M512 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V128C576 92.65 547.3 64 512 64zM528 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h448c8.822 0 16 7.178 16 16V384zM140 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 157.3 146.7 152 140 152zM196 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 194.7 189.3 200 196 200zM276 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 194.7 269.3 200 276 200zM356 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 194.7 349.3 200 356 200zM460 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 157.3 466.7 152 460 152zM140 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 237.3 146.7 232 140 232zM196 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 274.7 189.3 280 196 280zM276 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 274.7 269.3 280 276 280zM356 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 274.7 349.3 280 356 280zM460 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 237.3 466.7 232 460 232zM400 320h-224C167.1 320 160 327.1 160 336V352c0 8.875 7.125 16 16 16h224c8.875 0 16-7.125 16-16v-16C416 327.1 408.9 320 400 320z"/>
        </svg>
      </div>
      {/* Effects */}
      <div className="flex flex-col gap-1 w-full py-5">
        <div className="flex justify-start gap-1">
          {firstRow}
        </div>
        <div className="flex justify-center gap-1">
          {secondRow}
        </div>
        <div className="flex justify-end gap-1">
          {thirdRow}
        </div>
      </div>
      {/* Mouse Icon */}
      <div className="w-[5%] flex justify-center">
        <svg className="fill-white w-[18px] drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M0 192H176V0H160C71.6 0 0 71.6 0 160v32zm0 32V352c0 88.4 71.6 160 160 160h64c88.4 0 160-71.6 160-160V224H192 0zm384-32V160C384 71.6 312.4 0 224 0H208V192H384z"/>
        </svg>
      </div>
    </div>
  );
}

export default Soundboard;
