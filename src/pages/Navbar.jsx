import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Collapse } from "@material-tailwind/react";
import LogoImage from '../images/Univalle_bol_cbb_logo.png'; 

import {
  Navbar as MTNavbar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, href }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          <a
            href={href}
            onClick={(e) => scrollToSection(e, href.slice(1))}
            className="flex items-center gap-1 p-1 font-normal"
          >
            {name}
          </a>
        </Typography>
      ))}
    </ul>
  );
  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const scrollToSection = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className=" bg-[#522b46] bg-transparent absolute top-0 left-0 w-full z-10" style={{ background: '#522b46' }}>
    <div className="max-w-7xl mx-auto px-8">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          {/* Logo */}
          <div className="flex items-center py-5 px-2">
            <img src={LogoImage} alt="Logo" className="h-10" /> {/* Ajusta la clase de altura según sea necesario */}
            <Link to="/Main" className="text-xl text-white font-bold ml-2">Univalle</Link>
          </div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          <div className="flex-grow"></div>
          {/* Primary Nav */}
          <div className={`md:flex items-center space-x-1 ml-auto ${openNav ? "block" : "hidden"}`}>
            {routes.map((route) => (
              <Link key={route.name} to={route.href} className="py-5 px-3 text-white hover:text-gray-200">
                {route.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Secondary Nav */}
        <div className="hidden md:flex items-center space-x-1">
         
          <Link to="/LoginPage" className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Login</Link>
        </div>

        {/* Mobile button */}         
        <button className="md:hidden text-white" onClick={toggleNav}>
            {openNav ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
      </div>
    </div>
  </nav>
);
}
