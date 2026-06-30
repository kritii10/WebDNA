import Link from "next/link";
import { Github, Linkedin, Send, Twitter } from "lucide-react";

import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

const footerLinks = {
  product: ["Features", "Pricing", "FAQ", "Changelog"],
  company: ["About", "Customers", "Careers", "Contact"],
  resources: ["Guides", "API", "Security", "Status"]
} as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_repeat(3,0.8fr)]">
          <div className="space-y-5">
            <div>
              <h3 className="font-display text-2xl font-semibold">WebDNA</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Premium AI website intelligence for teams that care about speed,
                clarity, accessibility, and growth.
              </p>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input
                aria-label="Email address"
                className="h-12 flex-1 rounded-full border border-white/10 bg-background/70 px-4 text-sm outline-none transition focus:border-sky-400/40"
                placeholder="Join the product newsletter"
                type="email"
              />
              <Button className="h-12 rounded-full" type="submit">
                Subscribe
                <Send className="size-4" />
              </Button>
            </form>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Link
                aria-label="Twitter"
                className="rounded-full border border-white/10 p-2 transition hover:text-foreground"
                href="#"
              >
                <Twitter className="size-4" />
              </Link>
              <Link
                aria-label="GitHub"
                className="rounded-full border border-white/10 p-2 transition hover:text-foreground"
                href="#"
              >
                <Github className="size-4" />
              </Link>
              <Link
                aria-label="LinkedIn"
                className="rounded-full border border-white/10 p-2 transition hover:text-foreground"
                href="#"
              >
                <Linkedin className="size-4" />
              </Link>
            </div>
          </div>
          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h4 className="font-medium capitalize text-foreground">{group}</h4>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {items.map((item) => (
                  <li key={item}>
                    <Link className="transition hover:text-foreground" href="#">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 WebDNA. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Security</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
