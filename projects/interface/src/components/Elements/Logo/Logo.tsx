import SmallLogoImage from "@/assets/penta-core.png";
import LargeLogoImage from "@/assets/penta-logo.png";

export const Logo: React.FC<{ large?: boolean }> = ({ large }) => {
  if (large) {
    return (
      <img src={LargeLogoImage} alt="Penta" className="h-full object-contain" />
    );
  } else {
    return (
      <img src={SmallLogoImage} alt="Penta" className="h-full object-contain" />
    );
  }
};
