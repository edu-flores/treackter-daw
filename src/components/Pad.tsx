// Props definer
type PadProps = {
  name: string,
  audio: string,
  background: string,
};

function Pad({ name, audio, background }: PadProps) {

  function playAudio() {
    const effect = new Audio(require(`../sounds/kit1/${audio}.wav`));
    effect.play();
  }

  return (
    <div 
      className="border-solid border-2 border-white rounded-lg w-24 h-24 py-8 text-center shadow-lg"
      style={{backgroundColor: `${background}`}}
      onClick={playAudio}
    >
      <span className="drop-shadow-lg">{name}</span>
    </div>
  );
}

export default Pad;
