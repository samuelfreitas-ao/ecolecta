import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string
}

export function Input ({ labelText, ...rest }: InputProps) {
  return (
    <div className="field">
      <label htmlFor={rest.id}>{labelText}</label>
      <input {...rest} />
    </div>
  )
}