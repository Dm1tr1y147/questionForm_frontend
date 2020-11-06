import React from 'react'

interface IListsProps {
  variants: { text: string }[]
  name: string
  type: 'CHECK' | 'CHOOSE'
  onChange: (num: number) => void
}

const Lists: React.FC<IListsProps> = ({ variants, name, type, onChange }) => {
  const inputType =
    (type === 'CHECK' && 'check') || (type === 'CHOOSE' && 'radio') || undefined

  return (
    <div>
      {variants.map((el, index) => (
        <label key={index}>
          <input
            onChange={(e) => {
              const selectValue = variants.findIndex(
                (val) => val.text === e.currentTarget.value
              )
              onChange(selectValue)
            }}
            type={inputType}
            name={name}
            value={el.text}
          />
          {el.text}
        </label>
      ))}
    </div>
  )
}

export default Lists
