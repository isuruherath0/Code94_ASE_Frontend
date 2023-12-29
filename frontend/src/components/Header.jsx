import React from 'react';
import '../css/Header.css';

function Header() {
  return (
    <div className="header">
      <p className="admin-text">ADMIN</p>
      <p className="white-text">ab</p>
      <div className="avatar-container">
        {/* You can replace the src with the actual image URL for the avatar */}
        <img
          src="/avatar.jpg" // Placeholder URL, replace with your avatar URL
          alt="Avatar"
          className="avatar"
        />
      </div>
    </div>
  );
}

export default Header;