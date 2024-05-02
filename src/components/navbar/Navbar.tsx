"use client";
import navbar from "./Navbar.module.scss";
import Image from "next/image";
import NavLink from "./links/Link";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { SafeUser } from "@/types/types";
import UserMenu from "./UserMenu";
import { signOut } from "next-auth/react";

interface NavbarProps {
  currentUser: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const { cartTotalQty } = useCart();
  const Links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Shop",
      path: "/shop",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact-us",
    },
  ];

  const Buttons = [
    {
      text: "Sign Up",
      path: "/signup",
    },
    {
      text: "Sign In",
      path: "/signin",
    },
  ];

  const mobileNav = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth < 1081) {
          console.log("yes");
          // setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }, 200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const refs = [mobileNav, overlay];
    if (!isOpen) {
      refs.forEach((ref) => {
        ref.current?.classList.add(`${navbar["fade-out"]}`);
        ref.current?.classList.remove(`${navbar["fade-in"]}`);
      });
    } else {
      refs.forEach((ref) => {
        ref.current?.classList.add(`${navbar["fade-in"]}`);
        ref.current?.classList.remove(`${navbar["fade-out"]}`);
      });
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`${navbar.header} ${isOpen ? navbar.open : ""}`}>
      <div
        className={`${navbar["full-overlay"]} ${navbar["has-fade"]}`}
        ref={overlay}
      ></div>
      <nav className={navbar.navbar}>
        <NavLink href="/" className={`${navbar["navbar__logo"]}`} title="">
          <Image
            width={70}
            height={40}
            src="/img/Dziram-white-small.png"
            alt="Dziram Maxwell logo"
            className={navbar["navbar__logo"]}
          />
        </NavLink>

        <a
          href=""
          id="btnHamburger"
          className={navbar.navbar__hamburger}
          onClick={(e) => {
            e.preventDefault();
            toggleMenu();
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
        <ul className={navbar.navbar__menu}>
          {Links.map(({ title, path }) => (
            <li className={navbar.navbar__item} key={path}>
              <NavLink
                className={navbar.navbar__link}
                href={path}
                title={title}
              />
            </li>
          ))}
        </ul>
        <div className={navbar.navbar__buttons}>
          <Link
            href="/cart"
            className={`${navbar["cart-img"]} ${navbar["btn-border-full"]}`}
          >
            <Image
              width={22.5}
              height={22.5}
              src="/img/icons/cart-shopping.svg"
              alt="Shopping cart"
            />
            <span className={`${navbar.counter} ${navbar["fw-semibold"]}`}>
              {cartTotalQty}
            </span>
          </Link>
          <div className={`${navbar["navbar-btn-group"]}`}>
            {currentUser ? (
              <>
                <UserMenu />
                <Link
                  className={`${navbar["btn-default"]} ${navbar["btn-border-full"]} ${navbar["fw-semibold"]} ${navbar["height"]}`}
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    signOut({
                      callbackUrl: "/signin",
                      redirect: true,
                    });
                  }}
                >
                  Logout
                </Link>
              </>
            ) : (
              Buttons.map(({ text, path }) => (
                <NavLink
                  key={text}
                  className={`${navbar["btn-default"]} ${navbar["btn-border-full"]} ${navbar["fw-semibold"]} ${navbar["height"]}`}
                  href={path}
                  title={text}
                />
              ))
            )}
          </div>
        </div>
      </nav>
      <div
        className={`${navbar["header__menu"]} ${navbar["has-fade"]}`}
        ref={mobileNav}
      >
        {Links.map(({ title, path }) => (
          <NavLink key={title} href={path} title={title} />
        ))}

        <a href="./signup.html">Sign Up</a>
        <a href="./signin.html">Sign In</a>
      </div>
    </header>
  );
};

export default Navbar;
