import About from './About';

function Treackter() {
  return (
    <div className="flex h-screen items-center">
      {/* Header */}
      <div className="w-16">
        <h1 className="text-2xl text-secondary font-bold tracking-widest -rotate-90">Treackter</h1>
      </div>
      {/* DAW */}
      <div className="w-full">
      </div>
      {/* About Section */}
      <div className="w-16">
        <About />
      </div>
    </div>
  );
}

export default Treackter;
