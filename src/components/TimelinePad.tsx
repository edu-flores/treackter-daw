import { useState } from "react";

type Props = {
  padProperties: { armed: boolean, active: boolean, kit: null | number },
  soundboardData: { id: number, type: string, path: string, color: string, name: string }[]
}

const TimelinePad = ({ padProperties, soundboardData }: Props) => {

  // Background color
  const [bgColor, setBgColor] = useState('');
  const [clicks, setClicks] = useState(0);
  
  // Activate or deactivate a timeline pad
  let kitIndex: number;
  const alterPad = (event: React.MouseEvent<HTMLElement>) => {
    // Deactivate
    if (event.shiftKey) {
      padProperties.armed = false;
      padProperties.kit = null;
      setBgColor('');
      setClicks(0);
    }
    // Activate
    else {
      kitIndex = clicks % soundboardData.length;
      padProperties.armed = true;
      padProperties.kit = kitIndex + 1;
      setClicks(clicks => clicks + 1);
      setBgColor((soundboardData[kitIndex]).color);
      document.getElementById(soundboardData[kitIndex].name)?.dispatchEvent(new Event('mousedown'));
    }
  }

  return (
    <div 
      className="relative border-solid border-2 border-white rounded-lg bg-primary w-7 h-7 cursor-pointer shadow-lg"
      style={{
        backgroundColor: bgColor,
        borderColor: padProperties.active ? '#87b3e0' : '',
        transform: padProperties.active ? 'scale(1.3)' : ''
      }}
      onClick={event => alterPad(event)}
    >
    </div>
  ); 
}

export default TimelinePad;
