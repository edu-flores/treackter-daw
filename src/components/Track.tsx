import TimelinePad from "./TimelinePad";
import Knob from "./Knob";

// Props definer
type TrackProps = {
  name: string,
  pads: { "armed": boolean, "active": boolean }[]
  solo: boolean,
  muted: boolean,
}

function Track({ name, pads, solo, muted }: TrackProps) {
  return (
    <div className="py-3">
      <div className="flex">
        <div className="w-[10%] opacity-50 text-center text-lg">
          <span>{name}</span>
        </div>
        <div className="w-[90%] opacity-50 flex gap-10 text-sm text-center">
          {/* First Bar */}
          <div className="w-[20%] flex justify-center gap-4">
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
          </div>
          {/* Second Bar */}
          <div className="w-[20%] flex justify-center gap-4">
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
          </div>
          {/* Third Bar */}
          <div className="w-[20%] flex justify-center gap-4">
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
          </div>
          {/* Fourth Bar */}
          <div className="w-[20%] flex justify-center gap-4">
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
          </div>
          {/* Audio Manipulation */}
          <div className="w-[20%] flex gap-5 justify-end items-center">
            <span><b>S</b></span>
            <span><b>M</b></span>
            <Knob />
            <Knob />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
