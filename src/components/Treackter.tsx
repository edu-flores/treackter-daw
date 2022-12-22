import About from './About';
import Daw from './Daw';

function Treackter() {
  return (
    <div className="flex h-screen items-center">
      {/* Header */}
      <div className="w-16">
        <h1 className="text-2xl text-primary font-bold tracking-widest -rotate-90 drop-shadow-lg">Treackter</h1>
      </div>
      {/* DAW */}
      <div className="w-full">
        <Daw />
      </div>
      {/* About Section */}
      <div className="w-16">
        <About />
      </div>
    </div>
  );
}

export default Treackter;
