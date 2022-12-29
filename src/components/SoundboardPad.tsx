type Props = {
  name: string,
  background: string,
  context: AudioContext,
  audio: AudioBuffer
}

const SoundboardPad = ({ name, background, context, audio }: Props) => {

  // Start a sound
  const playSound = (audioBuffer: AudioBuffer, delay: number) => {
    const source = context.createBufferSource();
    source.buffer = audioBuffer;

    // Volume & Panning
    const vol = context.createGain();
    vol.gain.value = 0.5;
    const pan = new StereoPannerNode(context, { pan: 0 });
    source.connect(vol).connect(pan).connect(context.destination);

    // Play
    source.start(delay);
  }

  return (
    <button
      id={name}
      className="border-solid border-2 border-white rounded-lg w-24 h-24 py-8 text-center shadow-lg
      transition-all duration-75 hover:cursor-pointer active:scale-95 focus:outline-none"
      style={{backgroundColor: `${background}`}}
      type="button"
      onMouseDownCapture={() => playSound(audio, 0)}
    >
      <span className="drop-shadow-lg">{name}</span>
    </button>
  );
}

export default SoundboardPad;
