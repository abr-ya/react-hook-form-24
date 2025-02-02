import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Link } from "react-router-dom";

type HeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <header className={className} {...props}>
      <Link to="/">Home</Link>
      <Link to="/users">Users Form (HookForm + MUI + Zod)</Link>
      <Link to="/pokemons">Pokemons (MF)</Link>
      <Link to="/food">Food (test!)</Link>
    </header>
  );
};

export default Header;
