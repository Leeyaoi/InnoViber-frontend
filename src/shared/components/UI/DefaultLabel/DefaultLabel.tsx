import "./DefaultLabel.scss";

interface Props {
  text: string;
  smaller?: boolean;
}

const DefaultLabel = ({ text, smaller = false }: Props) => {
  if (smaller) {
    return <p className="default-label-smaller">{text}</p>;
  }
  return <p className="default-label">{text}</p>;
};

export default DefaultLabel;
