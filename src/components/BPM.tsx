function BPM() {
  return (
    <div className="flex gap-3">
      <input className="w-9 text-xl text-right bg-inherit outline-none font-bold drop-shadow-lg" style={{caretColor: "transparent"}} type="number" min="60" max="260" />
      <span className="self-end pb-[3px] text-sm text-light-gray font-semibold">BPM</span>
    </div>
  );
}

export default BPM;
