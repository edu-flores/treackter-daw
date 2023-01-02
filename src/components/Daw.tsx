import { useState } from 'react';
import TopControls from './TopControls';
import Soundboard from './Soundboard';
import Timeline from './Timeline';

const Daw = () => {

  // Beats per minute
  const [BPM, setBPM] = useState(120);

  // Master volume
  const [masterVolume, setMasterVolume] = useState(0.5);

  return (
    <div className="max-w-6xl m-auto">
      {/* Upper Bar Controls */}
      <TopControls
        BPM={BPM}
        setBPM={setBPM}
        masterVolume={masterVolume}
        setMasterVolume={setMasterVolume}
      />
      {/* Sound Effects */}
      <Soundboard
        masterVolume={masterVolume}
      />
      {/* Timeline */}
      <Timeline
        BPM={BPM}
        masterVolume={masterVolume}
      />
    </div>
  );
}

export default Daw;
