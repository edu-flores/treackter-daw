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
      className="border-solid border-2 border-white rounded-lg w-24 h-24 py-8 text-center"
      style={{backgroundColor: `${background}`}}
      onClick={playAudio}
    >
      {name}
    </div>
  );
}

export default Pad;
