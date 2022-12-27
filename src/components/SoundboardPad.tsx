type Props = {
  name: string,
  audio: string,
  background: string,
  playAudio: Function
}

const SoundboardPad = ({ name, audio, background, playAudio }: Props) => {

  // Kit number
  const n = name.slice(-1);

  return (
    <div 
      className="border-solid border-2 border-white rounded-lg w-24 h-24 py-8 text-center shadow-lg hover:cursor-pointer"
      style={{backgroundColor: `${background}`}}
      onClick={() => playAudio(n, audio)}
    >
      <span className="drop-shadow-lg">{name}</span>
    </div>
  );
}

export default SoundboardPad;
