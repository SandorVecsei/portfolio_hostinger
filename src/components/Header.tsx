"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" }
];

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

        <Link href="/work" className="cta-link">
          Let&apos;s build
        </Link>
      </div>
    </header>
  );
}
