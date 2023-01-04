import { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import TimelineButton from './TimelineButton';
import Track from './Track';
import timelineJSON from '../json/timeline.json';

type TimelineJSON = {
  settings: {
    BPM: number,
    masterVolume: number
  },
  tracks: {
    name: string,
    pads: {
      kit: number | null,
      sound: AudioBuffer | null,
      playing: boolean
    }[],
    state: {
      solo: boolean,
      muted: boolean,
      ignored: boolean
    },
    audio: {
      volume: number,
      panning: number
    }
  }[]
}

type Pad = {
  id: number,
  type: string,
  path: string,
  color: string,
  name: string,
  audio: AudioBuffer | null
}

type Kit = Pad[];

type Props = {
  kits: Kit[],
  playSound: Function,
  BPM: number,
  masterVolume: number
}

const Timeline = ({ kits, playSound, BPM, masterVolume }: Props) => {

  // Timeline sequence on/off
  const [active, setActive] = useState(false);

  // Timeline settings and track data
  const [timeline, setTimeline] = useState<TimelineJSON>(timelineJSON);

  // Refs for timeline html utilities
  const timelineSpace = useRef<HTMLDivElement>(null);
  const downArrow = useRef<SVGSVGElement>(null);

  // Display or hide down arrow
  const handleScroll = () => {
    const timeline = timelineSpace.current!;
    const arrow = downArrow.current!;
    if (timeline?.scrollTop === 0) {  // Top
      arrow.style.visibility = 'visible';
      arrow.style.opacity = '1';
    } else {
      arrow.style.opacity = '0';
      arrow.style.visibility = 'hidden';
    }
  }

  // Scroll to the bottom of the timelinespace
  const scrollToBottom = () => {
    const timeline = timelineSpace.current!;
    timeline.scrollTop = 1_000_000;
  }

  // Play all armed timeline pads on a column
  const playColumn = async (column: number) => {
    const newTimeline = {...timeline};
    newTimeline.tracks.forEach(track => {
      // Deactivate previous column pads, and activate current column pads
      const prevColumn = (column - 1 < 0) ? (track.pads.length - 1) : (column - 1);
      const prevPad = track.pads[prevColumn];
      prevPad.playing = false;
      const currPad = track.pads[column];
      currPad.playing = true;

      // Play sound
      if (currPad.kit  && (track.state.solo || (!track.state.ignored && !track.state.muted))) {
        playSound(currPad.sound, track.audio.panning, track.audio.volume, newTimeline.settings.masterVolume);

        // Set soundboard pad animation
        const soundboardPad = document.getElementById(`${track.name} ${currPad.kit}`);
        soundboardPad?.classList.add('scale-90');
        setTimeout(() => {
          soundboardPad?.classList.remove('scale-90');
        }, 100);
      }
    });
    setTimeline(newTimeline);
    await new Promise(r => setTimeout(r, 60_000 / timeline.settings.BPM));
  }

  // Media Buttons SVGs and functions
  const playPath = <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />;
  const startTimeline = () => setActive(true);
  const stopPath = <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />;
  const stopTimeline = () => setActive(false);

  // Timeline bottom buttons (clear, shuffle, export & import) SVGs and functions
  // Clear all tiles
  const clearPath = <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />;
  const clearTimeline = () => {
    const newTimeline = {...timeline};
    newTimeline.tracks.forEach(track => {
      track.pads.forEach(pad => {
        pad.kit = null;
        pad.sound = null;
      });
    });
    setTimeline(newTimeline);
    setActive(false);
  }

  // Shuffle all tiles
  const shufflePath = <path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z" />;
  const shuffleTimeline = () => {
    clearTimeline();
    const newTimeline = {...timeline};
    newTimeline.tracks.forEach((track, index) => {
      track.pads.forEach(pad => {
        const isActive = Math.random() > 0.75;
        if (isActive) {
          const kit = Math.floor(Math.random() * 3) + 1;
          pad.kit = kit;
          pad.sound = kits[kit-1][index].audio;
        }
      });
    });
    setTimeline(newTimeline);
    setActive(false);
  }

  // Export timeline
  const exportPath = <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 416c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />;
  const exportTimeline = () => {}

  // Import timeline
  const importPath = <path d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z" />;
  const importTimeline = () => {}

  // Update BPM and master volume after a change
  useEffect(() => {
    const newTimeline = {...timeline}
    newTimeline.settings.BPM = BPM;
    newTimeline.settings.masterVolume = masterVolume;

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [BPM, masterVolume])

  // Timeline manager (starting & stopping)
  useEffect(() => {
    // Activate columns one by one
    let valid: boolean;
    if (active) {
      valid = true;
      const play = async () => {
        while (valid)
          for (let column = 0; column < timeline.tracks[0].pads.length && valid; column++)
            await playColumn(column);
      }
      play();
    }

    // Cleanup
    return () => {
      valid = false;
      const newTimeline = {...timeline};
      newTimeline.tracks.forEach(track => {
        track.pads.forEach(pad => {
          pad.playing = false;
        });
      });
      setTimeline(newTimeline);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [active]);

  return (
    <div className="bg-primary rounded-b-xl relative shadow-lg">
      <div className="px-8 pt-3">
        <div ref={timelineSpace} className="w-6xl h-64 overflow-auto scroll-smooth" onScroll={() => handleScroll()}>
          {/* Top */}
          <div className="flex sticky top-0 left-0 right-0 bg-primary z-10 min-w-fit overflow-auto pb-3 text-light-gray font-semibold shadow-lg">
            {/* Media Buttons */}
            <div className="w-[10%]">
              <div className="flex gap-5 justify-start">
                {/* Play */}
                <TimelineButton
                  svgPath={playPath}
                  color={'#66c187'}
                  role={startTimeline}
                  disabled={active}
                />
                {/* Stop */}
                <TimelineButton
                  svgPath={stopPath}
                  color={'#f08937'}
                  role={stopTimeline}
                  disabled={!active}
                />
              </div>
            </div>
            <div className="w-[90%] flex gap-8 text-sm text-center">
              {/* First Bar */}
              <div className="w-[20%] flex justify-center gap-4">
                <span className="w-7">1</span>
                <span className="w-7">1.2</span>
                <span className="w-7">1.3</span>
                <span className="w-7">1.4</span>
              </div>
              {/* Second Bar */}
              <div className="w-[20%] flex justify-center gap-4">
                <span className="w-7">2</span>
                <span className="w-7">2.2</span>
                <span className="w-7">2.3</span>
                <span className="w-7">2.4</span>
              </div>
              {/* Third Bar */}
              <div className="w-[20%] flex justify-center gap-4">
                <span className="w-7">3</span>
                <span className="w-7">3.2</span>
                <span className="w-7">3.3</span>
                <span className="w-7">3.4</span>
              </div>
              {/* Fourth Bar */}
              <div className="w-[20%] flex justify-center gap-4">
                <span className="w-7">4</span>
                <span className="w-7">4.2</span>
                <span className="w-7">4.3</span>
                <span className="w-7">4.4</span>
              </div>
              {/* Audio Manipulation */}
              <div className="w-[20%] flex gap-5 justify-end items-center">
                <div className="w-[10px]">&nbsp;</div>
                <div className="w-[10px]">&nbsp;</div>
                <div>
                  <span>VOL</span>
                </div>
                <div>
                  <span>PAN</span>
                </div>
              </div>
            </div>
          </div>
          {/* Tracks */}
          <div className="min-w-fit">
            {timeline.tracks.map(track =>
              <Track
                key={track.name}
                self={track}
                soundsData={kits.map(kit => kit.find(sound => sound.type === track.name)!)}
                playSound={playSound}
                timeline={timeline}
                setTimeline={setTimeline}
              />
            )}
          </div>
          {/* Timeline main utilities */}
          <div className="flex gap-10">
            {/* Clear */}
            <TimelineButton
              svgPath={clearPath}
              color={'#fa685b'}
              role={clearTimeline}
              disabled={false}
            />
            {/* Shuffle */}
            <TimelineButton
              svgPath={shufflePath}
              color={'#008ef6'}
              role={shuffleTimeline}
              disabled={false}
            />
            {/* Export */}
            <TimelineButton
              svgPath={exportPath}
              color={'#24d048'}
              role={exportTimeline}
              disabled={false}
            />
            {/* Import */}
            <TimelineButton
              svgPath={importPath}
              color={'#f9c33b'}
              role={importTimeline}
              disabled={false}
            />
          </div>
        </div>
      </div>
      {/* Down Arrow */}
      <div className="py-1">
        <svg ref={downArrow} onClick={() => scrollToBottom()} className="fill-light-gray w-[14px] m-auto transition-opacity cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
        </svg>
      </div>
    </div>
  );
}

export default Timeline;
