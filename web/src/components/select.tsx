import React from 'react'

type OptionProps = {
  key: number | string
  value: number | string
  text?: number | string
}

interface selectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  labelText: string
  options: OptionProps[]
}

export function Select ({ labelText, options, ...rest }: selectProps) {
  return (
    <div className="field">
      <label htmlFor={rest.id}>{labelText}</label>
      <select {...rest} >
        <option value="0">Selecione</option>
        {
          options.map(option => (
            <option key={option.key} value={option.value}>{option.text ?? option.value}</option>
          ))
        }
      </select>
    </div>
  )
}