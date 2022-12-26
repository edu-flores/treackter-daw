import Play from './Play';
import Stop from './Stop';
import Track from './Track';

function Timeline() {

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

  return (
    <div className="bg-primary rounded-br-3xl rounded-bl-3xl px-8 pb-3 h-64 overflow-y-auto relative shadow-lg">
      {/* Top */}
      <div className="flex sticky top-0 bg-primary z-[1] py-3">
        <div className="w-[10%]">
          <div className="flex gap-5 justify-center">
            <Play />
            <Stop />
          </div>
        </div>
        <div className="w-[90%] opacity-50 flex items-center gap-10 text-sm text-center">
          {/* First Bar */}
          <div className="w-[20%] flex justify-center gap-6">
            <span className="w-[25%]">1</span>
            <span className="w-[25%]">1.2</span>
            <span className="w-[25%]">1.3</span>
            <span className="w-[25%]">1.4</span>
          </div>
          {/* Second Bar */}
          <div className="w-[20%] flex justify-center gap-6">
            <span className="w-[25%]">2</span>
            <span className="w-[25%]">2.2</span>
            <span className="w-[25%]">2.3</span>
            <span className="w-[25%]">2.4</span>
          </div>
          {/* Third Bar */}
          <div className="w-[20%] flex justify-center gap-6">
            <span className="w-[25%]">3</span>
            <span className="w-[25%]">3.2</span>
            <span className="w-[25%]">3.3</span>
            <span className="w-[25%]">3.4</span>
          </div>
          {/* Fourth Bar */}
          <div className="w-[20%] flex justify-center gap-6">
            <span className="w-[25%]">4</span>
            <span className="w-[25%]">4.2</span>
            <span className="w-[25%]">4.3</span>
            <span className="w-[25%]">4.4</span>
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
  );
}

export default Timeline;
