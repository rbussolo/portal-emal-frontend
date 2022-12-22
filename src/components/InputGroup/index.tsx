import { InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  labelClass?: string;
  divInputClass?: string;
  inputClass?: string;
  groupClass?: string;
  messageError?: string;
}

interface SelectGroupProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  labelClass?: string;
  divInputClass?: string;
  groupClass?: string;
  inputClass?: string;
  messageError?: string;
  children: React.ReactNode | JSX.Element | JSX.Element[];
}

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  inline?: boolean;
  inputClass?: string;
  groupClass?: string;
}

export function InputGroup({ name, label, inputClass, groupClass, messageError, ...rest }: InputGroupProps) {
  return (
    <div className={(groupClass ? groupClass : '') + (messageError ? " has-validation" : "")}>
      <label htmlFor={name} className="form-label">{ label }:</label>
      <input id={name} name={name} className={`form-control ${inputClass ? inputClass : ''}`} {...rest} />
      { messageError ? (
        <div className="invalid-tooltip">{messageError}</div>
      ) : null}
    </div>
  )
}

export function InputFilters({ name, label, inputClass, groupClass, labelClass = "col-sm-3", divInputClass = "col-sm-9", ...rest }: InputGroupProps) {
  return (
    <div className={`mb-3 row ${groupClass ? groupClass : ''}`}>
      <label htmlFor={name} className={`${labelClass} col-form-label`}>{label}:</label>
      <div className={divInputClass}>
        <input id={name} name={name} className={`form-control ${inputClass ? inputClass : ''}`} {...rest} />
      </div>
    </div>
  )
}

interface InputFiltersGroupDatesProps {
  initialDate: string;
  onInitialDateChange: (initialDate: string) => void;
  finalDate: string;
  onFinalDateChange: (finalDate: string) => void;
}

export function InputFiltersGroupDates({ initialDate, onInitialDateChange, finalDate, onFinalDateChange }: InputFiltersGroupDatesProps){ 
  return (
    <div className='mb-3 row'>
      <label htmlFor="date" className="col-sm-3 col-form-label">Período:</label>
      <div className="col-sm-9">
        <div className="input-group">
          <input
            type="date"
            className="form-control width-auto"
            value={initialDate}
            onChange={e => onInitialDateChange(e.target.value)}
          />
          <span className="input-group-text">a</span>
          <input
            type="date"
            className="form-control width-auto"
            value={finalDate}
            onChange={e => onFinalDateChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export function SelectFilters({ name, label, groupClass, inputClass, labelClass = "col-sm-3", divInputClass = "col-sm-9", children, ...rest }: SelectGroupProps) {
  return (
    <div className={`mb-3 row ${groupClass ? groupClass : ''}`}>
      <label htmlFor={name} className={`${labelClass} col-form-label`}>{label}:</label>
      <div className={divInputClass}>
        <select className={`form-select ${inputClass ? inputClass : ''}`} {...rest}>
          { children }
        </select>
      </div>
    </div>
  )
}

export function InputForm({ name, label, inputClass, groupClass, messageError, labelClass = "col-sm-3", divInputClass = "col-sm-9", ...rest }: InputGroupProps) {
  return (
    <div className={`mb-3 row ${groupClass ? groupClass : ''}`}>
      <label htmlFor={name} className={`${labelClass} col-form-label`}>{label}:</label>
      <div className={divInputClass}>
        <input id={name} name={name} className={`form-control ${inputClass ? inputClass : ''} ${messageError ? "is-invalid" : ""}`} {...rest} />
        {messageError ? (
          <div className="invalid-feedback">{messageError}</div>
        ) : null}
      </div>
    </div>
  )
}

export function SelectForm({ name, label, groupClass, inputClass, children, messageError, ...rest }: SelectGroupProps) {
  return (
    <div className={`mb-3 row ${groupClass ? groupClass : ''}`}>
      <label htmlFor={name} className="col-sm-3 col-form-label">{label}:</label>
      <div className="col-sm-9">
        <select className={`form-select ${inputClass ? inputClass : ''} ${messageError ? "is-invalid" : ""}`} {...rest}>
          {children}
        </select>
        {messageError ? (
          <div className="invalid-feedback">{messageError}</div>
        ) : null}
      </div>
    </div>
  )
}

export function CheckFilters({ name, label, inline, ...rest }: CheckBoxProps) {
  return (
    <div className={`form-check ${inline ? 'form-check-inline' : ''}`}>
      <input className="form-check-input" type="checkbox" id={name} { ...rest }/>
      <label className="form-check-label" htmlFor={name}>{label}</label>
    </div>
  )
}
