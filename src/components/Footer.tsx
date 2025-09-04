
import { resumeData } from "@/data/resume";

const Footer = () => {
  return (
    <footer className="text-center p-4 w-full">
      <p>{resumeData.footer}</p>
    </footer>
  );
};

export default Footer;
