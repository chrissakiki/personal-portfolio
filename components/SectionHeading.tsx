import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  as?: "h1" | "h2";
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

const SectionHeading = ({
  eyebrow,
  title,
  as: Heading = "h2",
  description,
  action,
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        action && "flex flex-wrap items-end justify-between gap-x-6 gap-y-4",
        className,
      )}
    >
      <div>
        <p className="text-[0.7rem] tracking-[0.28em] text-white/45 uppercase">
          {eyebrow}
        </p>
        <Heading className="mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
          {title}
        </Heading>
        {description ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
};

export default SectionHeading;
