import BPM from './BPM';
import MasterVolume from './MasterVolume';

function Controls() {
  return (
    <div className="flex justify-items-between bg-primary rounded-tr-3xl rounded-tl-3xl p-3">
      {/* BPM */}
      <BPM />
      {/* Master Volume */}
      <MasterVolume />
    </div>
  );
}

export default Controls;