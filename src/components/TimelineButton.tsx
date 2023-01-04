type Props = {
  text: string,
  color: string,
  role: Function
}

const TimelineButton = ({ text, color, role }: Props) => {
  return (
    <button
      className="drop-shadow-lg active:!text-secondary"
      style={{ color: color }}
      onClick={() => role()}
    >
      <span className="text-sm font-semibold tracking-widest brightness-90">{text}</span>
    </button>
  );
}
  
export default TimelineButton;
