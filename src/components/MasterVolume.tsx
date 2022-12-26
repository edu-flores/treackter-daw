import Knob from './Knob';

function MasterVolume() {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-sm text-light-gray font-semibold">MASTER VOL</span>
      <Knob />
    </div>
  );
}

export default MasterVolume;
