import MasterBPM from './MasterBPM';
import MasterVolume from './MasterVolume';

type Props = {
  BPM: number,
  setBPM: Function,
  masterVolume: number,
  setMasterVolume: Function
}

const TopControls = ({ BPM, setBPM, masterVolume, setMasterVolume }: Props) => {
  return (
    <div className="flex justify-between bg-primary rounded-t-xl px-8 py-3 relative shadow-lg">
      {/* BPM */}
      <MasterBPM
        BPM={BPM}
        setBPM={setBPM}
      />
      {/* Master Volume */}
      <MasterVolume
        masterVolume={masterVolume}
        setMasterVolume={setMasterVolume}
      />
    </div>
  );
}

export default TopControls;
