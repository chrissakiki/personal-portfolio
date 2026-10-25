import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  error?: string;
};

type InputProps = FieldProps &
  ComponentProps<"input"> & {
    multiline?: false;
  };

type TextareaProps = FieldProps &
  ComponentProps<"textarea"> & {
    multiline: true;
  };

const Input = (props: InputProps | TextareaProps) => {
  const { label, error, className, id, multiline, ...field } = props;
  const fieldId = id ?? ("name" in field ? field.name : undefined);
  const errorId = error && fieldId ? `${fieldId}-error` : undefined;
  const controlClass = cn(
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-foreground transition-colors outline-none placeholder:text-white/30 focus:border-accent aria-invalid:border-red-300",
    multiline && "min-h-36 resize-y",
    className,
  );

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={fieldId}
        className="text-[0.7rem] tracking-[0.18em] text-white/45 uppercase"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          {...(field as ComponentProps<"textarea">)}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={controlClass}
        />
      ) : (
        <input
          {...(field as ComponentProps<"input">)}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={controlClass}
        />
      )}
      {error ? (
        <p id={errorId} className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
