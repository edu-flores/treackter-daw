import BPM from './BPM';
import MasterVolume from './MasterVolume';

function Controls() {
  return (
    <div className="flex justify-between bg-primary rounded-tr-3xl rounded-tl-3xl px-8 py-3">
      {/* BPM */}
      <BPM />
      {/* Master Volume */}
      <MasterVolume />
    </div>
  );
}

export default Controls;
