import { BiLogoFacebook, BiLogoGithub } from "react-icons/bi";

function Footer() {
  return (
    <footer className="w-full flex flex-row gap-7 items-center justify-center p-2">
      <p>StudyBuddy {new Date().getFullYear()} © Limuel Camangon </p>

      <div className="flex gap-3">
        <a
          href="https://github.com/limuelcamangon15"
          target="_blank"
          rel="noopener noreferrer"
          className="links-logo"
        >
          <BiLogoGithub className="text-xl hover:text-gray-700 transition" />
        </a>
        <a
          href="https://www.facebook.com/lims.1506"
          target="_blank"
          rel="noopener noreferrer"
          className="links-logo"
        >
          <BiLogoFacebook className="text-xl hover:text-gray-700 transition" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
