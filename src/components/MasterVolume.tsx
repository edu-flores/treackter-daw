import Knob from './Knob';

function MasterVolume() {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-sm opacity-50">MASTER VOL</span>
      <Knob />
    </div>
  );
}

export default MasterVolume;
