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

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  inline?: boolean;
  inputClass?: string;
  groupClass?: string;
}

export function InputGroup({ name, label, inputClass, groupClass, ...rest }: InputGroupProps) {
  return (
    <div className={groupClass ? groupClass : ''}>
      <label htmlFor={name} className="form-label">{ label }:</label>
      <input id={name} name={name} className={`form-control ${inputClass ? inputClass : ''}`} {...rest} />
    </div>
  )
}

export function InputFilters({ name, label, inputClass, groupClass, ...rest }: InputGroupProps) {
  return (
    <div className={`mb-3 row ${groupClass ? groupClass : ''}`}>
      <label htmlFor={name} className="col-sm-3 col-form-label">{label}:</label>
      <div className="col-sm-9">
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

export function SelectFilters({ name, label, groupClass, inputClass, children, ...rest }: SelectGroupProps) {
  return (
    <div className={`mb-3 row ${groupClass ? groupClass : ''}`}>
      <label htmlFor={name} className="col-sm-3 col-form-label">{label}:</label>
      <div className="col-sm-9">
        <select className={`form-select ${inputClass ? inputClass : ''}`} {...rest}>
          { children }
        </select>
      </div>
    </div>
  )
}

export function InputForm({ name, label, inputClass, groupClass, ...rest }: InputGroupProps) {
  return (
    <div className={`mb-3 row ${groupClass ? groupClass : ''}`}>
      <label htmlFor={name} className="col-sm-3 col-form-label">{label}:</label>
      <div className="col-sm-9">
        <input id={name} name={name} className={`form-control ${inputClass ? inputClass : ''}`} {...rest} />
      </div>
    </div>
  )
}

export function SelectForm({ name, label, groupClass, inputClass, children, ...rest }: SelectGroupProps) {
  return (
    <div className={`mb-3 row ${groupClass ? groupClass : ''}`}>
      <label htmlFor={name} className="col-sm-3 col-form-label">{label}:</label>
      <div className="col-sm-9">
        <select className={`form-select ${inputClass ? inputClass : ''}`} {...rest}>
          {children}
        </select>
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
