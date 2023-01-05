type Props = {
  visible: boolean
  children: React.ReactNode
}

const Modal = ({ visible, children }: Props) => {
  return (
    <div className="top-0 fixed left-0 z-20 w-screen h-screen backdrop-blur" style={{ visibility: visible ? 'visible' : 'hidden' }}>
      <div className="bg-[#1a1a1a] rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-56 px-14 py-7">
        {children}
      </div>
    </div>
  );
}

export default Modal;
