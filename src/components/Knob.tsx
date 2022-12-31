import { useState } from "react";

type Props = {
  value: number,
  setter: Function
  initial: number,
  min: number,
  max: number,
  step: number
}

const Knob = ({ value, setter, initial, min, max, step }: Props) => {

  let valueCopy = value;

  // Rotation degrees (max: 120, min: -120)
  const [rotation, setRotation] = useState(0);

  // Slide knob up & down
  let prevY = 0;
  const scrollKnob = (event: MouseEvent) => {
    if (event.pageY < prevY) {  // Up
      if (valueCopy + step <= max) {
        setRotation(rotation => rotation + 1.2);
        valueCopy += step;
      } else {
        setRotation(120);
        valueCopy = max;
      }
    } else if (event.pageY > prevY) {  // Down
      if (valueCopy - step >= min) {
        setRotation(rotation => rotation - 1.2);
        valueCopy -= step;
      } else {
        setRotation(-120);
        valueCopy = min;
      }
    }
    prevY = event.pageY;
    setter(valueCopy);
  }

  // Detect mouse movement and the release of a click
  const listenMovement = () => {
    window.addEventListener('mousemove', scrollKnob);
    window.addEventListener('mouseup', clearEvents);
  }

  // Remove events from window
  const clearEvents = () => {
    window.removeEventListener('mousemove', scrollKnob);
    window.removeEventListener('mouseup', clearEvents);
  }

  return (
    <div 
      className="bg-secondary rounded-full w-[28px] h-[28px] drop-shadow-lg"
      style={{transform: `rotate(${rotation}deg)`}}
      onMouseDown={() => listenMovement()}
      onClick={event => {
        if (event.detail > 1) {
          setter(initial);
          setRotation(0);
        }
      }}
    >
      <div className="bg-primary rounded-full w-[3px] h-[5px] m-auto mt-[3px]"></div>
    </div>
  );
}

export default Knob;
