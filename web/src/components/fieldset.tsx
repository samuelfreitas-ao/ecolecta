import React from 'react'
type FiledSetProps = {
  children: React.ReactNode
  title: string
  description?: string
}
export function FiledSet ({ children, title, description }: FiledSetProps) {
  return (
    <fieldset>
      <legend>
        <h2>{title}</h2>
      </legend>
      <span>{description}</span>
      {children}
    </fieldset>
  )
}