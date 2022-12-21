function BPM() {
  return (
    <div>
      <input className="w-14 text-xl text-right bg-inherit outline-none font-bold" style={{caretColor: "transparent"}} type="number" min="60" max="260" />
      <span className="text-sm opacity-50 ml-2">BPM</span>
    </div>
  );
}

export default BPM;