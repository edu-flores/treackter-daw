import { useState } from 'react';
import TopControls from './TopControls';
import Soundboard from './Soundboard';
import Timeline from './Timeline';

const Daw = () => {

  // BPM
  const [bpm, setBpm] = useState(120);

  // Volume
  const [volume, setVolume] = useState(0.5);

  return (
    <div className="max-w-6xl m-auto">
      {/* Upper Bar Controls */}
      <TopControls
        bpm={bpm}
        setBpm={setBpm}
        volume={volume}
        setVolume={setVolume}
      />
      {/* Sound Effects */}
      <Soundboard
        volume={volume}
      />
      {/* Timeline */}
      <Timeline
        bpm={bpm}
        volume={volume}
      />
    </div>
  );
}

export default Daw;
