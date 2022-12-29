import TimelinePad from "./TimelinePad";
import TrackUtility from "./TrackUtility";
import Knob from "./Knob";

type Props = {
  name: string,
  setTracks: Function,
  solo: boolean,
  muted: boolean,
  ignored: boolean
}

type Tracks = {
  name: string,
  pads: { armed: boolean, active: boolean, kit: number | null }[],
  solo: boolean,
  muted: boolean,
  ignored: boolean
}[]

const Track = ({ name, solo, muted, ignored, setTracks }: Props) => {

  // Solo selected track, mute all others
  const soloTrack = () => {
    setTracks((tracks: Tracks) => {
      const data = [...tracks];

      // Remove solo from all other tracks, and ignore them
      data.forEach(track => {
        if (track.name !== name) {
          track.solo = false;
        }
        track.ignored = true;
      });

      // Solo self track
      const index = data.findIndex(track => track.name === name);
      data[index] = {
        ...data[index],
        solo: !data[index].solo
      }

      // No soloed tracks, remove ignored state
      const soloCount = data.filter(track => track.solo === true).length;
      if (soloCount === 0) {
        data.forEach(track => {
          track.ignored = false;
        });
      }

      return data;
    });
  };

  // Don't play any media from selected track
  const muteTrack = () => {
    setTracks((tracks: Tracks) => {
      const data = [...tracks];

      // Mute self track
      const index = data.findIndex(track => track.name === name);
      data[index] = {
        ...data[index],
        muted: !data[index].muted
      }

      return data;
    });
  };

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
              symbol={'S'}
              activeColor={'#66c187'}
              role={soloTrack}
              property={solo}
              canBeIgnored={false}
              ignored={ignored}
            />
            {/* Mute */}
            <TrackUtility
              symbol={'M'}
              activeColor={'#f08937'}
              role={muteTrack}
              property={muted}
              canBeIgnored={true}
              ignored={ignored}
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
