import TimelinePad from "./TimelinePad";

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
          <div className="w-[20%] flex justify-center gap-6">
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
          </div>
          {/* Second Bar */}
          <div className="w-[20%] flex justify-center gap-6">
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
          </div>
          {/* Third Bar */}
          <div className="w-[20%] flex justify-center gap-6">
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
          </div>
          {/* Fourth Bar */}
          <div className="w-[20%] flex justify-center gap-6">
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
            <TimelinePad />
          </div>
          {/* Audio Manipulation */}
          <div className="w-[20%] flex gap-5 justify-end">
            <div>
              <span>S</span>
            </div>
            <div>
              <span>M</span>
            </div>
            <div>
              <span>VOL</span>
            </div>
            <div>
              <span>PAN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
