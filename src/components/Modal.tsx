type Props = {
  title: string,
  content: JSX.Element
}

const Modal = ({ title, content }: Props) => {
  return (
    <div className="w-screen h-screen">
      <div className="">
        <h3 className="text-2xl text-center">{title}</h3>
        {content}
      </div>
    </div>
  );
}

export default Modal;
