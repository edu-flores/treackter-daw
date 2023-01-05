import Knob from './Knob';

type Props = {
  masterVolume: number,
  setMasterVolume: Function
}

const MasterVolume = ({ masterVolume, setMasterVolume }: Props) => {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-sm text-light-gray font-semibold">MASTER VOL</span>
      <Knob
        value={masterVolume}
        setter={setMasterVolume}
        initial={0.5}
        min={0}
        max={1}
        step={0.02}
        getRotation={(val: number) => 250 * (val - 0.5)}
      />
    </div>
  );
}

export default MasterVolume;
