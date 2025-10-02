"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navs = [
  { href: "/basic", label: "基本" },
  { href: "/advance", label: "応用" },
];

export default function GlobalNav() {
  const pathname = usePathname();
  usePathname();
  return (
    <nav className="border-r p-4">
      <ul>
        {navs.map((nav) => (
          <li key={nav.href}>
            <Link
              href={nav.href}
              className={cn(
                "hover:text-blue-500",
                pathname === nav.href
                  ? "font-bold text-blue-500 underline"
                  : "text-gray-500",
              )}
            >
              {nav.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
