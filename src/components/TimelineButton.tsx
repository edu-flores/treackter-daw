type Props = {
  text: string,
  role: Function
}

const TimelineButton = ({ text, role }: Props) => {
  return (
    <button
      className="drop-shadow-lg text-light-gray hover:!text-secondary"
      onClick={() => role()}
    >
      <span className="text-sm font-semibold tracking-widest">{text}</span>
    </button>
  );
}
  
export default TimelineButton;
