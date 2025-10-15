
import { resumeData } from "@/data/resume";

const Footer = () => {
  return (
    <footer className="py-10 w-full mt-16">
      <p className="text-xs text-center text-muted-foreground">{resumeData.footer}</p>
    </footer>
  );
};

export default Footer;
