import { useState } from 'react';
import TopControls from './TopControls';
import Soundboard from './Soundboard';
import Timeline from './Timeline';

function Daw() {

  // BPM
  const [bpm, setBpm] = useState(120);

  return (
    <div className="max-w-6xl m-auto">
      {/* Upper Bar Controls */}
      <TopControls
        bpm={bpm}
        setBpm={setBpm}
      />
      {/* Sound Effects */}
      <Soundboard />
      {/* Timeline */}
      <Timeline />
    </div>
  );
}

export default Daw;
