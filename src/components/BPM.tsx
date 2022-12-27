type Props = {
  bpm: number,
  setBpm: Function
}

const BPM = ({ bpm, setBpm }: Props) => {

  // Modify BPM on the DAW
  const changeBPM = (val: number) => {
    val = (val < 60) ? 60 : val;
    val = (val > 120) ? 120 : val;
    setBpm(val);
  }

  return (
    <div className="flex gap-3">
      <input
        value={bpm}
        onChange={(val) => {
          changeBPM(Number(val.target.value));
        }}
        className="w-9 text-xl text-right bg-inherit outline-none font-bold drop-shadow-lg"
        style={{caretColor: "transparent"}}
        type="number"
        min="60"
        max="260"
      />
      <span className="self-end pb-[3px] text-sm text-light-gray font-semibold">BPM</span>
    </div>
  );
}

export default BPM;
