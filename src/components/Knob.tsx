import TempKnob from '../TempKnob.png';

function Knob() {
  return (
    <div className="cursor-grab">
      <img className="w-[30px] drop-shadow-lg" src={TempKnob} alt="Knob" />
    </div>
  );
}

export default Knob;
