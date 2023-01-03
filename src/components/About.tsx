import { useState } from "react";

const About = () => {

  // Open or closed state
  const [open, setOpen] = useState(false);

  // Toggle about section
  const toggleOpen = () => {
    setOpen(open => !open);
  }

  // Heart icon
  const heart = (
    <svg className="fill-[#e71e4d] w-[16px] inline mb-[1px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
    </svg>
  );

  // Link icon
  const link = (
    <svg className="fill-secondary w-[12px] inline mb-[1px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
    </svg>
  );

  return (
    <section onClick={() => toggleOpen()} className="relative z-10 cursor-pointer">
      {!open ? (
        <div className="bg-primary shadow-lg w-8 h-20 flex items-center justify-center rounded-tl-lg rounded-bl-lg fixed right-0 top-[50%] -mt-10">
          <svg className="fill-white w-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </div>
      ) : (
        <div className="bg-primary shadow-lg w-80 h-96 px-3 py-3 rounded-tl-lg rounded-bl-lg fixed right-0 top-[50%] -mt-48">
          <div className="flex h-[100%]">
            <div className="self-center -mt-[14px]">
              <svg className="fill-white w-[18px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </svg>
            </div>
            <div className="w-[100%] px-5">
              <h2 className="text-xl text-center font-bold tracking-wider mt-1 mb-3">About</h2>
              <p className="mb-3"><i><b>Treackter</b></i> is an online digital audio workstation (DAW) for creating beats. </p>
              <p className="mb-3">Cycle a pad sound on the timeline by clicking it multiple times. To clear it use <b>Shift</b> + <b>Click</b>.</p>
              <p className="mb-3">You can also solo, mute and adjust the volume and panning of each instrument.</p>
              <p className="text-sm text-center">Made with {heart} <br /> by <a className="font-bold" href="https://edu-flores.github.io/" target="_blank" rel="noreferrer">Eduardo Flores {link}</a>.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default About;
