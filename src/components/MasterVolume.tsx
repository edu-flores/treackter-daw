import Knob from './Knob';

function MasterVolume() {
  return (
    <div>
      <span className="text-sm opacity-50">MASTER VOL</span>
      <Knob />
    </div>
  );
}

export default MasterVolume;
