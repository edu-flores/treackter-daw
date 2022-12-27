// Props definer
type PadProps = {
  name: string,
  audio: string,
  background: string
}

function SoundboardPad({ name, audio, background }: PadProps) {

  // Kit number
  const n = name.slice(-1);

  // Reproduce media after clicking a soundboard pad
  function playAudio() {

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
    <div 
      className="border-solid border-2 border-white rounded-lg w-24 h-24 py-8 text-center shadow-lg hover:cursor-pointer"
      style={{backgroundColor: `${background}`}}
      onClick={playAudio}
    >
      <span className="drop-shadow-lg">{name}</span>
    </div>
  );
}

export default SoundboardPad;
