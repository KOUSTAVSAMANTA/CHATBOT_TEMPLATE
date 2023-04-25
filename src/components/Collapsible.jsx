import React, { useState } from 'react';
import "./collapsable.css"

const Collapsible = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(title)
  return (
    
    <div className="collapsible">
      <div className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{"title"}</h3>
        <span className={`icon ${isOpen ? 'icon-open' : 'icon-closed'}`}>&#x25BC;</span>
      </div>
      {isOpen && <div className="collapsible-body">{"children"}</div>}
    </div>
  );
};

export default Collapsible;
