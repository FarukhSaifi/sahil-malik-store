import type { FormFieldProps } from "@/types";

export function FormField({ label, htmlFor, error, className, children }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block uppercase tracking-[0.2em] text-xs text-muted">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="field-error mt-2">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function getFieldDescribedBy(htmlFor: string, error?: string) {
  return error ? `${htmlFor}-error` : undefined;
}
