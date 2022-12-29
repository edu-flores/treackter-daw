type Props = {
  svgPath: JSX.Element,
  color: string,
  role: Function
}

const MediaButton = ({ svgPath, color, role }: Props) => {
  return (
    <svg 
      className="w-[18px] drop-shadow-lg hover:cursor-pointer active:fill-secondary"
      fill={color}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 384 512"
      onClick={() => role()}
    >
      {svgPath}
    </svg>
  );
}
  
export default MediaButton;
