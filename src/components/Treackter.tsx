import DAW from './DAW';
import About from './About';

const Treackter = () => {

  // Web Audio API setup
  const audioContext = new AudioContext();

  return (
    <div className="flex h-screen items-center">
      {/* Header */}
      <div className="w-[5%]">
        <h1 className="text-2xl text-secondary font-bold tracking-widest -rotate-90 drop-shadow-lg">Treackter</h1>
      </div>
      {/* DAW */}
      <div className="w-[90%]">
        <DAW
          audioContext={audioContext}
        />
      </div>
      {/* About Section */}
      <div className="w-[5%]">
        <About />
      </div>
    </div>
  );
}

export default Treackter;
