import TimelinePad  from "./TimelinePad";
import TrackUtility from "./TrackUtility";
import Knob from "./Knob";

type AudioTrack = {
  name: string,
  pads: { armed: boolean, active: boolean, kit: number | null }[],
  state: { solo: boolean, muted: boolean, ignored: boolean },
  audio: { volume: number, panning: number }
}

type Props = {
  self: AudioTrack,
  soundboardData: { id: number, type: string, path: string, color: string, name: string }[],
  tracks: AudioTrack[],
  setTracks: Function
}

const Track = ({ self, soundboardData, tracks, setTracks }: Props) => {

  // Properties of all 16 pads on the corresponding track
  const pads = tracks.find(track => track.name === self.name)!.pads;

  // Solo selected track, mute all others
  const soloTrack = () => {
    const newTracks = [...tracks];

    // Remove solo from all other tracks, and ignore them
    newTracks.forEach(track => {
      if (track.name !== self.name) {
        track.state.solo = false;
      }
      track.state.ignored = true;
    });

    // Solo self track
    const index = newTracks.findIndex(track => track.name === self.name);
    newTracks[index].state.solo = !newTracks[index].state.solo;

    // No soloed tracks, remove ignored state
    const soloCount = newTracks.filter(track => track.state.solo === true).length;
    if (soloCount === 0) {
      newTracks.forEach(track => {
        track.state.ignored = false;
      });
    }

    setTracks(newTracks);
  };

  // Don't play any media from selected track
  const muteTrack = () => {
    const newTracks = [...tracks];

    // Mute self track
    const index = newTracks.findIndex(track => track.name === self.name);
    newTracks[index].state.muted = !newTracks[index].state.muted;
    
    setTracks(newTracks);
  };

  return (
    <div className="py-2">
      <div className="flex">
        <div className="w-[10%] text-center text-lg text-light-gray">
          <span><b>{self.name}</b></span>
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
              property={self.state.solo}
              canBeIgnored={false}
              ignored={self.state.ignored}
            />
            {/* Mute */}
            <TrackUtility
              symbol={'M'}
              activeColor={'#f08937'}
              role={muteTrack}
              property={self.state.muted}
              canBeIgnored={true}
              ignored={self.state.ignored}
            />
            <Knob
              value={self.audio.volume}
              setter={(value: number) => {
                const newTracks = [...tracks];
                newTracks.find(track => track.name === self.name)!.audio.volume = value;
                setTracks(newTracks);
              }}
              initial={0.5}
              min={0}
              max={1}
              step={0.005}
            />
            <Knob
              value={self.audio.panning}
              setter={(value: number) => {
                const newTracks = [...tracks];
                newTracks.find(track => track.name === self.name)!.audio.panning = value;
                setTracks(newTracks);
              }}
              initial={0}
              min={-1}
              max={1}
              step={0.01}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
