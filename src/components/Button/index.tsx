import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  buttonClass: string;
  isLoading?: boolean;
}

export function Button({ label, buttonClass, isLoading, ...rest }: ButtonProps) {
  return (
    <button className={`btn ${buttonClass}`} disabled={isLoading} { ...rest }>
      { isLoading ? (
        <span className="spinner-border spinner-border-sm mr-5" role="status" aria-hidden="true"></span>
      ) : null }
      { label }
    </button>
  )
}