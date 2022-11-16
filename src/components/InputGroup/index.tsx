import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  inputClass?: string;
  groupClass?: string;
}

interface SelectGroupProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  groupClass?: string;
  inputClass?: string;
  children: JSX.Element | JSX.Element[];
}

export function InputGroup({ name, label, inputClass, groupClass, ...rest }: InputGroupProps) {
  return (
    <div className={groupClass}>
      <label htmlFor={name} className="form-label">{ label }:</label>
      <input id={name} name={name} className={`form-control ${inputClass}`} {...rest} />
    </div>
  )
}

export function InputFilters({ name, label, inputClass, groupClass, ...rest }: InputGroupProps) {
  return (
    <div className={`mb-3 row ${groupClass}`}>
      <label htmlFor={name} className="col-sm-3 col-form-label text-end">{label}:</label>
      <div className="col-sm-9">
        <input id={name} name={name} className={`form-control ${inputClass}`} {...rest} />
      </div>
    </div>
  )
}

export function SelectFilters({ name, label, groupClass, inputClass, children, ...rest }: SelectGroupProps) {
  return (
    <div className={`mb-3 row ${groupClass}`}>
      <label htmlFor={name} className="col-sm-3 col-form-label text-end">{label}:</label>
      <div className="col-sm-9">
        <select className={`form-select ${inputClass}`} {...rest}>
          { children }
        </select>
      </div>
    </div>
  )
}
