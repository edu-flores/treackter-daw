import Play from './Play';
import Stop from './Stop';
import Track from './Track';

const Timeline = () => {

  // Ten tracks for each instrument
  const tracks = [
    {
      "name": "Kick",
      "pads": [
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
      ],
      "solo": false,
      "muted": false,
    },
    {
      "name": "Snare",
      "pads": [
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
      ],
      "solo": false,
      "muted": false,
    },
    {
      "name": "Closed",
      "pads": [
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
      ],
      "solo": false,
      "muted": false,
    },
    {
      "name": "Open",
      "pads": [
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
      ],
      "solo": false,
      "muted": false,
    },
    {
      "name": "Key",
      "pads": [
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
      ],
      "solo": false,
      "muted": false,
    },
    {
      "name": "Guitar",
      "pads": [
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
      ],
      "solo": false,
      "muted": false,
    },
    {
      "name": "Bass",
      "pads": [
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
      ],
      "solo": false,
      "muted": false,
    },
    {
      "name": "Tom",
      "pads": [
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
      ],
      "solo": false,
      "muted": false,
    },
    {
      "name": "Clap",
      "pads": [
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
      ],
      "solo": false,
      "muted": false,
    },
    {
      "name": "Adlib",
      "pads": [
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
        { "armed": false, "active": false },
      ],
      "solo": false,
      "muted": false,
    },
  ];

  // Display or hide down arrow
  const handleScroll = () => {
    const timeline = document.getElementById('timeline')!;
    const arrow = document.getElementById('down-arrow')!;
    if (timeline.scrollTop === 0) {  // Top
      arrow.style.opacity = '1';
    } else {
      arrow.style.opacity = '0';
    }
  }

  return (
    <div className="bg-primary rounded-br-3xl rounded-bl-3xl relative shadow-lg">
      <div id="timeline" className="h-64 overflow-y-auto" onScroll={() => handleScroll()}>
        {/* Top */}
        <div className="flex sticky top-0 bg-primary z-10 px-8 py-3 text-light-gray font-semibold shadow-lg">
          <div className="w-[10%]">
            <div className="flex gap-5 justify-center">
              <Play />
              <Stop />
            </div>
          </div>
          <div className="w-[90%] flex items-center gap-8 text-sm text-center">
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
            <div className="w-[20%] flex gap-5 justify-end">
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
        <div className="px-8 pt-3">
          {tracks.map(track => 
            <Track 
              key={track.name}
              name={track.name}
              pads={track.pads}
              solo={track.solo}
              muted={track.muted}
            />
          )}
        </div>
      </div>
      {/* Down Arrow */}
      <div className="py-1">
        <svg id="down-arrow" className="fill-white w-[18px] m-auto transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg>
      </div>
    </div>
  );
}

export default Timeline;
