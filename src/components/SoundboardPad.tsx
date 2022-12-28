type Props = {
  name: string,
  audio: string,
  background: string
}

const SoundboardPad = ({ name, audio, background }: Props) => {

  // Kit number
  const n = Number(name.slice(-1));

  // Reproduce media after clicking a soundboard pad or pressing a key
  const playAudio = (n: number, audio: string) => {

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

  return (
    <button
      id={name}
      className="border-solid border-2 border-white rounded-lg w-24 h-24 py-8 text-center shadow-lg
      transition-all duration-75 hover:cursor-pointer active:scale-95 focus:outline-none"
      style={{backgroundColor: `${background}`}}
      type="button"
      onMouseDownCapture={() => playAudio(n, audio)}
    >
      <span className="drop-shadow-lg">{name}</span>
    </button>
  );
}

export default SoundboardPad;
