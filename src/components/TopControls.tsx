import BPM from './BPM';
import MasterVolume from './MasterVolume';

type Props = {
  bpm: number,
  setBpm: Function
}

const TopControls = ({ bpm, setBpm }: Props) => {
  return (
    <div className="flex justify-between bg-primary rounded-tr-3xl rounded-tl-3xl px-8 py-3 relative shadow-lg">
      {/* BPM */}
      <BPM
        bpm={bpm}
        setBpm={setBpm}
      />
      {/* Master Volume */}
      <MasterVolume />
    </div>
  );
}

export default TopControls;
