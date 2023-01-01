import Knob from './Knob';

type Props = {
  volume: number,
  setVolume: Function
}

const MasterVolume = ({ volume, setVolume }: Props) => {
  return (
    <div className="flex gap-3 items-center">
      <span className="text-sm text-light-gray font-semibold">MASTER VOL</span>
      <Knob
        value={volume}
        setter={setVolume}
        initial={0.5}
        min={0}
        max={1}
        step={0.005}
      />
    </div>
  );
}

export default MasterVolume;
