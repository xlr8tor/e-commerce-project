import Link from "next/link";
import type { Route } from "next";
import { ReactNode } from "react";

const NavLink = <T extends string>({
  href,
  title,
  className,
  children,
}: {
  href: Route<T> | URL;
  title?: string;
  className?: string;
  children?: ReactNode;
}) => (
  <Link className={className} href={href}>
    {title}
    {children}
  </Link>
);

export default NavLink;
