import { forwardRef } from "react";

type Props = {
  name: string,
  background: string,
  audio: AudioBuffer,
  playSound: Function
}

const SoundboardPad = forwardRef<HTMLButtonElement, Props>(({ name, background, audio, playSound }: Props, ref) => {
  return (
    <button
      id={name}
      ref={ref}
      className="border-solid border-2 border-white rounded-lg w-24 h-24 py-8 text-center shadow-lg
      transition-all duration-75 hover:cursor-pointer active:scale-90 focus:outline-none"
      style={{backgroundColor: `${background}`}}
      type="button"
      onMouseDownCapture={() => playSound(audio)}
    >
      <span className="lg:text-lg text-sm drop-shadow-lg font-bold">{name}</span>
    </button>
  );
})

export default SoundboardPad;
