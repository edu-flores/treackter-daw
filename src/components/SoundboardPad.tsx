type Props = {
  name: string,
  background: string,
  audio: AudioBuffer,
  playSound: Function
}

const SoundboardPad = ({ name, background, audio, playSound }: Props) => {
  return (
    <button
      id={name}
      className="border-solid border-2 border-white rounded-lg w-24 h-24 py-8 text-center shadow-lg
      transition-all duration-75 hover:cursor-pointer active:scale-95 focus:outline-none"
      style={{backgroundColor: `${background}`}}
      type="button"
      onMouseDownCapture={() => playSound(audio)}
    >
      <span className="drop-shadow-lg">{name}</span>
    </button>
  );
}

export default SoundboardPad;
