import { useState, useEffect, useRef } from 'react';
import MediaButton from './MediaButton';
import Track from './Track';
import timelineJSON from '../json/timeline.json';

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
  const [timeline, setTimeline] = useState(timelineJSON);

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
            <div className="w-[10%]">
              <div className="flex gap-5 justify-start">
                {/* Play */}
                <MediaButton
                  svgPath={playPath}
                  color={'#66c187'}
                  role={startTimeline}
                  disabled={active}
                />
                {/* Stop */}
                <MediaButton
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
