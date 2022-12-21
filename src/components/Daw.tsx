import Controls from './Controls';
import Soundboard from './Soundboard';
import Timeline from './Timeline';

function Daw() {
  return (
    <div>
      {/* Upper Bar Controls */}
      <Controls />
      {/* Sound Effects */}
      <Soundboard />
      {/* Timeline */}
      <Timeline />
    </div>
  );
}

export default Daw;
