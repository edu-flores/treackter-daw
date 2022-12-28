import TempKnob from '../TempKnob.png';

const Knob = () => {
  return (
    <div className="cursor-grab">
      <img className="w-[30px] drop-shadow-lg" src={TempKnob} alt="Knob" />
    </div>
  );
}

export default Knob;
