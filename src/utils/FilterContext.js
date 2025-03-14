import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [showOil, setShowOil] = useState(true);
  const [showFilter, setShowFilter] = useState(true);
  const [showTires, setShowTires] = useState(true);

  return (
    <FilterContext.Provider
      value={{ showOil, setShowOil, showFilter, setShowFilter, showTires, setShowTires }}
    >
      {children}
    </FilterContext.Provider>
  );
}