"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/drive", label: "Drive" }
];

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          GLM
          <span>Creative Systems</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => {
            const isActive =
              mounted &&
              (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link${isActive ? " active" : ""}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-bubble"
                    className="nav-bubble"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <Link href="/work" className="cta-link">
            Let&apos;s build
          </Link>
          <button
            type="button"
            className={`mobile-menu-toggle${menuOpen ? " is-open" : ""}`}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
          <nav aria-label="Mobile primary" className="mobile-menu-nav">
            {links.map((link) => {
              const isActive =
                mounted &&
                (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href));

              return (
                <Link
                  key={`mobile-${link.href}`}
                  href={link.href}
                  className={`mobile-nav-link${isActive ? " active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
