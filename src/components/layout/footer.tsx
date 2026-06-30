import { APP_NAME, COMPANY_NAME } from "@/constants/app";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/70 px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>
          {APP_NAME} by {COMPANY_NAME}
        </p>
        <p>Premium website intelligence for growth-focused teams.</p>
      </div>
    </footer>
  );
}
