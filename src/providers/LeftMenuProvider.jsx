import { useState, useEffect, createContext } from "react";

const STORAGE_KEY = "leftMenuIsOpen";

const LeftMenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem(STORAGE_KEY) === null
      ? true
      : localStorage.getItem(STORAGE_KEY) === "true"
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, isOpen);
  }, [isOpen]);

  return (
    <LeftMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </LeftMenuContext.Provider>
  );
};

export const LeftMenuContext = createContext({});
export default LeftMenuProvider;
