import TimelinePad from "./TimelinePad";
import TrackUtility from "./TrackUtility";
import Knob from "./Knob";

type Props = {
  name: string,
  pads: { "armed": boolean, "active": boolean }[]
  solo: boolean,
  muted: boolean
}

const Track = ({ name, pads, solo, muted }: Props) => {

  const soloTrack = () => solo = !solo;
  const muteTrack = () => muted = !muted;

  return (
    <div className="py-2">
      <div className="flex">
        <div className="w-[10%] text-center text-lg text-light-gray">
          <span><b>{name}</b></span>
        </div>
        <div className="w-[90%] flex gap-8 text-sm text-center">
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
            {/* Solo */}
            <TrackUtility
              name={name}
              symbol={'S'}
              activeColor={'#66c187'}
              role={soloTrack}
            />
            {/* Mute */}
            <TrackUtility
              name={name}
              symbol={'M'}
              activeColor={'#f08937'}
              role={muteTrack}
            />
            <Knob />
            <Knob />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
