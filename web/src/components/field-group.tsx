import React from 'react'

interface FieldGroupProps {
  children: React.ReactNode
}

export function FieldGroup ({ children }: FieldGroupProps) {
  return (
    <div className="field-group" children={children} />
  )
}