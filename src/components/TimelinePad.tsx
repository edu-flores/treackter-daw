import { useState } from "react";

type Props = {
  padProperties: {
    kit: null | number,
    sound: AudioBuffer | null,
    playing: boolean
  },
  audioProperties: {
    volume: number,
    panning: number
  }
  soundsData: {
    id: number,
    type: string,
    path: string,
    color: string,
    name: string,
    audio: AudioBuffer | null
  }[],
  playSound: Function
}

const TimelinePad = ({ padProperties, audioProperties, soundsData, playSound }: Props) => {

  // Background color
  const [bgColor, setBgColor] = useState('');
  const [clicks, setClicks] = useState(0);
  
  // Activate or deactivate a timeline pad
  let kitIndex: number;
  const alterPad = (event: React.MouseEvent<HTMLElement>) => {
    // Deactivate
    if (event.shiftKey) {
      padProperties.kit = null;
      padProperties.sound = null;
      setBgColor('');
      setClicks(0);
    }
    // Activate
    else {
      kitIndex = clicks % soundsData.length;
      padProperties.kit = kitIndex + 1;
      padProperties.sound = soundsData[kitIndex].audio;
      setClicks(clicks => clicks + 1);
      setBgColor((soundsData[kitIndex]).color);
      playSound(padProperties.sound, audioProperties.volume, audioProperties.panning);
    }
  }

  return (
    <div
      className="relative border-solid border-2 border-white rounded-lg bg-primary w-7 h-7 cursor-pointer shadow-lg active:scale-90"
      style={{
        backgroundColor: bgColor,
        borderColor: padProperties.playing ? '#87b3e0' : '',
        transform: padProperties.playing ? 'scale(1.3)' : ''
      }}
      onClick={event => alterPad(event)}
    >
    </div>
  ); 
}

export default TimelinePad;
