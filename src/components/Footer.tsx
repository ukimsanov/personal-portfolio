
import { resumeData } from "@/data/resume";

const Footer = () => {
  return (
    <footer className="py-8 w-full border-t border-border/40 mt-16">
      <p className="text-muted-foreground">{resumeData.footer}</p>
    </footer>
  );
};

export default Footer;
