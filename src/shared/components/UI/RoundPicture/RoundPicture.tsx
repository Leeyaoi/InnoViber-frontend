import "./RoundPicture.scss";

interface Prop {
  picPath?: string;
}

const RoundPicture = ({ picPath = "/src/shared/assets/profile.jpg" }: Prop) => {
  return <img src={picPath} />;
};

export default RoundPicture;
