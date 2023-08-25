type Props = {
  BPM: number,
  setBPM: Function
}

const MasterBPM = ({ BPM, setBPM }: Props) => {

  // Modify BPM on the DAW
  const changeBPM = (val: number) => {
    // Valid range
    val = (val < 120) ? 120 : val;
    val = (val > 360) ? 360 : val;
    setBPM(val);
  }

  return (
    <div className="flex gap-3">
      <div className="flex">
        <input
          value={BPM}
          onChange={event => changeBPM(Number(event.target.value))}
          className="w-24 text-xl text-center accent-white outline-none font-bold drop-shadow-lg"
          type="range"
          step="20"
          min="120"
          max="360"
        />
      </div>
      <div className="flex gap-2">
        <span className="w-8 text-end self-center text-md text-secondary font-bold">{BPM}</span>
        <span className="self-center text-sm text-light-gray font-semibold">BPM</span>
      </div>
    </div>
  );
}

export default MasterBPM;
