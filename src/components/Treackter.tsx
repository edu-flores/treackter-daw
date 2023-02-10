import DAW from './DAW';
import About from './About';

const Treackter = () => {

  // Web Audio API setup
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext || false;
  const audioContext = new AudioContext();
  if (!AudioContext)
    alert('Treackter only works on modern browsers. Please, consider using Chrome or Firefox.');

  return (
    <div>
      {/* Turn device notification */}
      <div className="landscape:hidden">
        <div className="bg-primary text-secondary rounded-lg w-[90vw] h-screen m-auto flex flex-col gap-10 justify-center items-center">
          {/* Icons */}
          <div className="flex gap-10">
            <svg className="fill-white w-[50px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
            </svg>
            <svg className="fill-white w-[30px] animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
            <svg className="fill-white w-[50px] rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
            </svg>
          </div>
          {/* Alert */}
          <span className="md:text-3xl text-xl text-secondary text-center">
            Please, turn your device <br /> into landscape mode
          </span>
        </div>
      </div>
      {/* Main App */}
      <div className="portrait:hidden">
        <div className="flex h-screen">
          {/* Header */}
          <div className="w-[5%] self-center flex justify-center items-center">
            <h1 className="lg:text-2xl text-xl text-secondary font-bold tracking-widest -rotate-90 drop-shadow-lg">Treackter</h1>
          </div>
          {/* DAW */}
          <div className="w-[90%] self-center">
            <DAW audioContext={audioContext} />
          </div>
          {/* About Section */}
          <div className="w-[5%]">
            <About />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Treackter;
