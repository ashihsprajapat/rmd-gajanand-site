"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top > window.innerHeight) element.classList.add("reveal-pending");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return <>
    <Navbar/>
    <div className="route-enter" key={pathname}>{children}</div>
    <Footer/>
  </>;
}
