import { useState, useEffect, useRef } from "react";

type Props = {
  value: number,
  setter: Function
  initial: number,
  min: number,
  max: number,
  step: number,
  getRotation: Function
}

const Knob = ({ value, setter, initial, min, max, step, getRotation }: Props) => {

  let valueCopy = value;

  // Rotation degrees (max: 120, min: -120)
  const [rotation, setRotation] = useState(0);

  // Slide knob up & down
  let prevY = 0;
  const scrollKnob = (event: MouseEvent | WheelEvent) => {
    (event as WheelEvent).preventDefault();
    if (event.pageY < prevY || (event as WheelEvent).deltaY < 0) {  // Up
      if (valueCopy + step <= max) {
        valueCopy += step;
      } else {
        valueCopy = max;
      }
    } else if (event.pageY > prevY || (event as WheelEvent).deltaY > 0) {  // Down
      if (valueCopy - step >= min) {
        valueCopy -= step;
      } else {
        valueCopy = min;
      }
    }
    prevY = event.pageY;
    setter(valueCopy);
  }

  // Update rotation position when value changes
  useEffect(() => {
    setRotation(getRotation(valueCopy));
  }, [valueCopy, getRotation]);

  // Get knob and append wheel event listener to prevent page scrolling
  const knob = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const currentKnob = knob.current;
    currentKnob?.addEventListener('wheel', scrollKnob);

    return () => {
      currentKnob?.removeEventListener('wheel', scrollKnob);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

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
      ref={knob}
      className="bg-secondary rounded-full w-[28px] h-[28px] drop-shadow-lg"
      style={{ transform: `rotate(${rotation}deg)` }}
      onMouseDown={() => listenMovement()}
      onDoubleClick={() => setter(initial)}
    >
      <div className="bg-primary rounded-full w-[3px] h-[5px] m-auto mt-[3px]"></div>
    </div>
  );
}

export default Knob;
