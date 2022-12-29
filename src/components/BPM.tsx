type Props = {
  bpm: number,
  setBpm: Function
}

const BPM = ({ bpm, setBpm }: Props) => {

  // Modify BPM on the DAW
  const changeBPM = (val: number, modifier=0) => {
    // Arrow keys on screen
    val += modifier;

    // Valid range
    val = (val < 60) ? 60 : val;
    val = (val > 240) ? 240 : val;
    setBpm(val);
  }

  return (
    <div className="flex gap-3">
      <div className="flex">
        <input
          value={bpm}
          onChange={(val) => {
            changeBPM(Number(val.target.value));
          }}
          className="w-24 text-xl text-center accent-white outline-none font-bold drop-shadow-lg"
          type="range"
          step="10"
          min="60"
          max="240"
        />
      </div>
      <div className="flex gap-3">
        <span className="w-8 text-end self-center text-md text-white font-bold">{bpm}</span>
        <span className="self-center text-sm text-light-gray font-semibold">BPM</span>
      </div>
    </div>
  );
}

export default BPM;
