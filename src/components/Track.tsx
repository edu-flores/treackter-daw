import TimelinePad  from "./TimelinePad";
import TrackUtility from "./TrackUtility";
import Knob from "./Knob";

type Tracks = {
  name: string,
  pads: { armed: boolean, active: boolean, kit: number | null }[],
  solo: boolean,
  muted: boolean,
  ignored: boolean
}[]

type Props = {
  name: string,
  solo: boolean,
  muted: boolean,
  ignored: boolean,
  soundboardData: { id: number, type: string, path: string, color: string, name: string }[],
  tracks: Tracks,
  setTracks: Function
}

const Track = ({ name, solo, muted, ignored, soundboardData, tracks, setTracks }: Props) => {

  // Properties of all 16 pads on the corresponding track
  const pads = tracks.find(track => track.name === name)!.pads;

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
            <TimelinePad padProperties={pads[0]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[1]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[2]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[3]} soundboardData={soundboardData} />
          </div>
          {/* Second Bar */}
          <div className="w-[20%] flex justify-center gap-4">
            <TimelinePad padProperties={pads[4]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[5]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[6]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[7]} soundboardData={soundboardData} />
          </div>
          {/* Third Bar */}
          <div className="w-[20%] flex justify-center gap-4">
            <TimelinePad padProperties={pads[8]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[9]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[10]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[11]} soundboardData={soundboardData} />
          </div>
          {/* Fourth Bar */}
          <div className="w-[20%] flex justify-center gap-4">
            <TimelinePad padProperties={pads[12]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[13]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[14]} soundboardData={soundboardData} />
            <TimelinePad padProperties={pads[15]} soundboardData={soundboardData} />
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
