import { InputHTMLAttributes } from "react";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  inputClass?: string;
  groupClass?: string;
}

export function InputGroup({ name, label, inputClass, groupClass, ...rest }: InputGroupProps) {
  return (
    <div className={groupClass}>
      <label htmlFor={name} className="form-label">{ label }:</label>
      <input id={name} name={name} className={`form-control ${inputClass}`} {...rest} />
    </div>
  )
}