import React, { useCallback, useEffect } from 'react'
import s from "./popup.module.css"
import cn from "classnames"

export default function Popup({ popup, setPopup, children }) {
  
  const handleKeyPress = useCallback((event) => {
    if (event.key === "Escape") setPopup(false) 
  }, [setPopup]);
  
  useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);

      return () => {
          document.removeEventListener('keydown', handleKeyPress);
      };
  }, [handleKeyPress]);

  return (
    <div className={cn(s.modal, {[s.active]: popup})} onClick={(e) => setPopup(false)}>
        <div className={cn(s.content, {[s.active]: popup})} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}
