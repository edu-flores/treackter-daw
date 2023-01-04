type Props = {
  svgPath: JSX.Element,
  color: string,
  role: Function,
  disabled: boolean
}

const MediaButton = ({ svgPath, color, role, disabled }: Props) => {
  return (
    <button disabled={disabled} onClick={() => role()}>
      <svg
        className={`w-[18px] drop-shadow-lg ${disabled ? '' : 'active:fill-secondary'}`}
        style={{ cursor: disabled ? '' : 'pointer', filter: disabled ? 'brightness(0.5)' : '' }}
        fill={color}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 384 512"
      >
        {svgPath}
      </svg>
    </button>
  );
}

export default MediaButton;
