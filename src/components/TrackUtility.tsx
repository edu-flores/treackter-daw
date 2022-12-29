type Props = {
  name: string,
  symbol: string,
  activeColor: string,
  role: Function
}

const TrackUtility = ({ name, symbol, activeColor, role }: Props) => {

  // Set active state
  const switchColor = () => {
    const utility = document.getElementById(`${name}-${symbol}-utility`.toLowerCase());
    utility?.classList.toggle(`!text-${activeColor}`);
  }

  return (
    <div
      id={`${name}-${symbol}-utility`.toLowerCase()}
      className="cursor-pointer font-bold text-secondary"
      onClick={() => { role(); switchColor(); }}
    >
      <span>{symbol}</span>
    </div>
  )
}

export default TrackUtility;
