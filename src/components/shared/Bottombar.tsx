import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { NavLink, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <NavLink
            key={link.label}
            to={link.route}
            className={`${
              isActive && "rounded-[10px] bg-primary-500"
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && "invert-white"}`}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </NavLink>
        );
      })}
    </section>
  );
};

export default Bottombar;
