type Props = {
  symbol: string,
  activeColor: string,
  role: Function,
  property: boolean,
  canBeIgnored: boolean,
  ignored: boolean
}

const TrackUtility = ({ symbol, activeColor, role, property, canBeIgnored, ignored }: Props) => {

  // Pick utility color
  const defineColor = () => {
    if (!canBeIgnored || !ignored)
      return property ? activeColor : '';
    else
      return property ? 'lightslategray' : 'darkslategray';
  }

  return (
    <div
      className="cursor-pointer font-bold text-secondary"
      style={{ color: defineColor() }}
      onClick={() => role()}
    >
      <span>{symbol}</span>
    </div>
  )
}

export default TrackUtility;
