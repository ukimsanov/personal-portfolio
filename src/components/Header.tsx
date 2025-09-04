
import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full p-4">
      <div>
        <h1 className="text-2xl font-bold">Ular Kimsanov</h1>
      </div>
      <nav className="flex items-center gap-4">
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
        <ThemeToggler />
      </nav>
    </header>
  );
};

export default Header;
