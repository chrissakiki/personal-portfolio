import { cacheLife } from "next/cache";
import Link from "next/link";
import Container from "@/components/Container";

const pages = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const profiles = [
  { href: "https://www.linkedin.com", label: "LinkedIn" },
  { href: "https://github.com", label: "GitHub" },
];

const getYear = async () => {
  "use cache";
  cacheLife("weeks");
  return new Date().getFullYear();
};

const Footer = async () => {
  const year = await getYear();

  return (
    <footer id="footer" className="border-t border-line">
      <Container className="py-8">
        <div className="grid gap-12 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-lg font-medium tracking-tight">Chris Akiki</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Full stack developer. I build web products from the screen to the
              server.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-[0.7rem] tracking-[0.28em] text-white/45 uppercase">
              Menu
            </p>
            <ul className="mt-4 space-y-2.5">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[0.7rem] tracking-[0.28em] text-white/45 uppercase">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              {profiles.map((profile) => (
                <li key={profile.label}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    {profile.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Chris Akiki</p>
          <p>Lebanon</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
