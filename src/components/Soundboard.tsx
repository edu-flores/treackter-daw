import { useEffect, useCallback, useMemo } from 'react';
import SoundboardPad from './SoundboardPad';

// Hashmap for key presses
const keyToSound = new Map([
  // Kit1
  ['KeyQ', 1],
  ['KeyW', 2],
  ['KeyE', 3],
  ['KeyR', 4],
  ['KeyT', 5],
  ['KeyY', 6],
  ['KeyU', 7],
  ['KeyI', 8],
  ['KeyO', 9],
  ['KeyP', 10],
  // Kit2
  ['KeyA', 11],
  ['KeyS', 12],
  ['KeyD', 13],
  ['KeyF', 14],
  ['KeyG', 15],
  ['KeyH', 16],
  ['KeyJ', 17],
  ['KeyK', 18],
  ['KeyL', 19],
  ['Semicolon', 20],
  // Kit3
  ['KeyZ', 21],
  ['KeyX', 22],
  ['KeyC', 23],
  ['KeyV', 24],
  ['KeyB', 25],
  ['KeyN', 26],
  ['KeyM', 27],
  ['Comma', 28],
  ['Period', 29],
  ['Slash', 30]
]);

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
  loaded: boolean,
  kits: Kit[],
  playSound: Function
}

type RefsObject = {
  [key: number]: HTMLButtonElement
}

const Soundboard = ({ loaded, kits, playSound }: Props) => {

  // Object containing all refs of the soundboard pads
  const padsRefs: RefsObject = useMemo(() => {
    return {};
  }, []);

  // Event handler functions
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (keyToSound.has(event.code) && !event.repeat) {
      const pad = padsRefs[keyToSound.get(event.code)!];
      pad?.dispatchEvent(new Event('mousedown'));
      pad?.classList.add('scale-90');
    }
  }, [padsRefs])
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (keyToSound.has(event.code)) {
      const pad = padsRefs[keyToSound.get(event.code)!];
      pad?.classList.remove('scale-90');
    }
  }, [padsRefs]);

  useEffect(() => {
    // Listen for key presses
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keypress', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }

  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="lg:flex hidden items-center h-[45%] max-h-96 bg-secondary overflow-auto">
      {/* Keyboard Icon */}
      <div className="w-[5%] flex justify-center pl-3">
        <svg className="fill-primary w-[28px] drop-shadow-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M512 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V128C576 92.65 547.3 64 512 64zM528 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h448c8.822 0 16 7.178 16 16V384zM140 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 157.3 146.7 152 140 152zM196 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 194.7 189.3 200 196 200zM276 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 194.7 269.3 200 276 200zM356 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 194.7 349.3 200 356 200zM460 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 157.3 466.7 152 460 152zM140 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 237.3 146.7 232 140 232zM196 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 274.7 189.3 280 196 280zM276 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 274.7 269.3 280 276 280zM356 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 274.7 349.3 280 356 280zM460 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 237.3 466.7 232 460 232zM400 320h-224C167.1 320 160 327.1 160 336V352c0 8.875 7.125 16 16 16h224c8.875 0 16-7.125 16-16v-16C416 327.1 408.9 320 400 320z"/>
        </svg>
      </div>
      {/* Effects */}
      {loaded ? (
        <div className="py-1 m-auto w-full">
          {/* First Row */}
          <div className="flex justify-center gap-1 w-full mb-1">
            {kits[0]?.map((sound: Pad) =>
              <SoundboardPad
                key={sound.id}
                ref={(ref: HTMLButtonElement) => padsRefs[sound.id] = ref}
                name={sound.name}
                background={sound.color}
                audio={sound.audio!}
                playSound={playSound}
              />
            )}
            <div className="w-4"></div>
          </div>
          {/* Second Row */}
          <div className="flex justify-center gap-1 w-full mb-1">
            <div className="w-2"></div>
            {kits[1]?.map((sound: Pad) =>
              <SoundboardPad
                key={sound.id}
                ref={(ref: HTMLButtonElement) => padsRefs[sound.id] = ref}
                name={sound.name}
                background={sound.color}
                audio={sound.audio!}
                playSound={playSound}
              />
            )}
            <div className="w-2"></div>
          </div>
          {/* Third Row */}
          <div className="flex justify-center gap-1 w-full">
            <div className="w-4"></div>
            {kits[2]?.map((sound: Pad) =>
              <SoundboardPad
                key={sound.id}
                ref={(ref: HTMLButtonElement) => padsRefs[sound.id] = ref}
                name={sound.name}
                background={sound.color}
                audio={sound.audio!}
                playSound={playSound}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-1 m-auto w-full">
          <svg className="animate-spin w-[30px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z" />
          </svg>
        </div>
      )}
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
