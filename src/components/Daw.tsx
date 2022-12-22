import TopControls from './TopControls';
import Soundboard from './Soundboard';
import Timeline from './Timeline';

function Daw() {
  return (
    <div>
      {/* Upper Bar Controls */}
      <TopControls />
      {/* Sound Effects */}
      <Soundboard />
      {/* Timeline */}
      <Timeline />
    </div>
  );
}

export default Daw;
