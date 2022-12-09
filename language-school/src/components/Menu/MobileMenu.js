import React from 'react'
import MenuLinks from "./MenuLinks";
import { useState } from 'react';

 const MobileMenu = () => {

   const [open,setOpen] = useState(false);

   const hamburgerIcon = 
     <span
       className="material-symbols-outlined hamburger"
       onClick={() => setOpen(!open)}
     >
       menu
     </span>
 

   const closeIcon = (
     <span
       className="material-symbols-outlined close"
       onClick={() => setOpen(!open)}
     >
       close
     </span>
   );
    const closeMobileMenu = () => setOpen(false);
    
  return (
    <nav className="mobileMenu">
      {open ? closeIcon : hamburgerIcon}
     {open && <MenuLinks isMobile={true} closeMobileMenu={closeMobileMenu}/>}
    </nav>
  );
}
export default MobileMenu