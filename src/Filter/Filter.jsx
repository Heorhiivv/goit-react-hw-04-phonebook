import React from "react"
export const Filter = ({ onChange, filter }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <input
        onChange={(e) => onChange(e.currentTarget.value)}
        value={filter}
        name="filter"
        type="search"
      />
    </>
  )
}
