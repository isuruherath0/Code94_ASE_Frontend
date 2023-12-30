import React from 'react';
import '../css/Header.css';

function Header() {
  return (
    <div className="header">
      <p className="admin-text">ADMIN</p>
      <p className="white-text">ab</p>
      <div className="avatar-container">
        <img
          src="/avatar.jpg" 
          alt="Avatar"
          className="avatar"
        />
      </div>
    </div>
  );
}

export default Header;