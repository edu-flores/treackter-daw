import TopControls from './TopControls';
import Soundboard from './Soundboard';
import Timeline from './Timeline';

function Daw() {
  return (
    <div className="max-w-6xl m-auto">
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
