import "./DefaultButton.scss";

interface Props {
  value?: string;
}

const DefaultButton = ({ value = "Add" }: Props) => {
  return (
    <input
      className="default-button"
      type="button"
      value={value}
      onClick={() => {}}
    />
  );
};

export default DefaultButton;
