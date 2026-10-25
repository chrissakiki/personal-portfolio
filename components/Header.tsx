"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

const Menu = ({
  open,
  onClose,
  onExited,
}: {
  open: boolean;
  onClose: () => void;
  onExited: () => void;
}) => {
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const onExitedRef = useRef(onExited);
  const openRef = useRef(open);
  onExitedRef.current = onExited;
  openRef.current = open;

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(".menu-scrim", { opacity: 0 });
      gsap.set(".menu-item", { yPercent: 120 });
    },
    { scope: root },
  );

  const stopTimeline = () => {
    const current = timeline.current;
    timeline.current = null;
    current?.kill();
  };

  const playIntro = contextSafe(() => {
    stopTimeline();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".menu-scrim", { opacity: 1 });
      gsap.set(".menu-item", { yPercent: 0, opacity: 1 });
      return;
    }

    timeline.current = gsap
      .timeline({ defaults: { ease: "power4.out" } })
      .to(".menu-scrim", { opacity: 1, duration: 0.45 }, 0)
      .to(
        ".menu-item",
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.14 },
        0.1,
      );
  });

  const playOutro = contextSafe(() => {
    stopTimeline();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (!openRef.current) onExitedRef.current();
      return;
    }

    const staggerEach = 0.12;
    const itemDuration = 0.75;
    const itemsEnd = itemDuration + staggerEach * (sections.length - 1);

    const outro = gsap
      .timeline({
        onComplete: () => {
          if (timeline.current !== outro || openRef.current) return;
          onExitedRef.current();
        },
      })
      .to(
        ".menu-item",
        {
          yPercent: 120,
          duration: itemDuration,
          ease: "power2.inOut",
          stagger: { each: staggerEach, from: "end" },
        },
        0,
      )
      .to(
        ".menu-item",
        {
          opacity: 0,
          duration: 0.4,
          ease: "power1.in",
          stagger: { each: staggerEach, from: "end" },
        },
        0.28,
      )
      .to(
        ".menu-scrim",
        { opacity: 0, duration: 0.2, ease: "power2.in" },
        itemsEnd - 0.2,
      );

    timeline.current = outro;
  });

  const playIntroRef = useRef(playIntro);
  const playOutroRef = useRef(playOutro);
  playIntroRef.current = playIntro;
  playOutroRef.current = playOutro;

  useEffect(() => {
    if (open) playIntroRef.current();
    else playOutroRef.current();

    return () => {
      const current = timeline.current;
      timeline.current = null;
      current?.kill();
    };
  }, [open]);

  return (
    <nav
      ref={root}
      id="site-menu"
      aria-label="Primary"
      className="fixed inset-0 z-40"
      onClick={onClose}
    >
      <div className="menu-scrim absolute inset-0 bg-background" />
      <Container className="relative flex h-full flex-col justify-center">
        <ul className="flex flex-col gap-1">
          {sections.map((section, index) => (
            <li key={section.id} className="overflow-hidden">
              <Link
                href={`/#${section.id}`}
                className="menu-item flex items-baseline gap-5 py-3 text-foreground hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:gap-8"
                onClick={(event) => {
                  event.stopPropagation();
                  onClose();
                }}
              >
                <span className="w-10 text-sm font-medium tracking-[0.22em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-4xl font-medium tracking-tight sm:text-6xl">
                  {section.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
};

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => {
    document.body.style.overflow = "";
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) setIsMenuShown(true);
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "header-fade pointer-events-none fixed inset-x-0 top-0 z-30 h-28 transition-opacity duration-300",
          scrolled && !isMenuOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <Container className="flex h-16 items-center justify-between text-white">
          <Link
            href="/#home"
            className="text-base font-semibold tracking-tight transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            onClick={closeMenu}
          >
            {'<Dev />'}
          </Link>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-expanded={isMenuShown}
            aria-controls="site-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 w-6 bg-current transition duration-200",
                  isMenuShown && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-current transition duration-200",
                  isMenuShown && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-6 bg-current transition duration-200",
                  isMenuShown && "-translate-y-2 -rotate-45",
                )}
              />
            </span>
          </button>
        </Container>
      </header>

      {isMenuShown ? (
        <Menu
          open={isMenuOpen}
          onClose={closeMenu}
          onExited={() => setIsMenuShown(false)}
        />
      ) : null}
    </>
  );
};

export default Header;
