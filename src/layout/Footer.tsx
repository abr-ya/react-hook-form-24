import { DetailedHTMLProps, HTMLAttributes } from "react";

type FooterProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={className} {...props}>
      footer
    </footer>
  );
};

export default Footer;
