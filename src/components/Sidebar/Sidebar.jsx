import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { iconClass: "fas fa-home", label: "Dashboard", path: "/dashboard" },
  { iconClass: "fas fa-users", label: "Manage Communities", path: "/communities" },
  { iconClass: "fas fa-user-cog", label: "Manage Users", path: "/manage-users" },
  { iconClass: "fas fa-calendar-alt", label: "Manage Events", path: "/manage-events" },
  { iconClass: "fas fa-layer-group", label: "Manage Circles", path: "/manage-circles" },
  { iconClass: "fas fa-gift", label: "Rewards & Coupon", path: "/rewards" },
  { iconClass: "fas fa-chart-line", label: "Reports", path: "/reports" },
  { iconClass: "fas fa-comments", label: "Chat Management", path: "/chat-management" },
  { iconClass: "fas fa-star", label: "Ratings & Feedbacks", path: "/ratings" },
  { iconClass: "fas fa-bell", label: "Notification", path: "/notification" },
];

const Sidebar = ({ children, active }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobile(mobileView);
      if (!mobileView) setShowSidebar(true);
      else setShowSidebar(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <div className="sidebar-main">
        {isMobile && (
          <div className="toggle-btn" onClick={toggleSidebar}>
            {showSidebar ? <FaTimes className="toggleicon" /> : <FaBars className="fabars" />}
          </div>
        )}
      </div>

      <div className={`sidebar ${isMobile ? (showSidebar ? 'show' : 'hide') : ''}`}>
        <ul className="menu">
          
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index} className="sidebar-link">
              <li className={active === index ? 'active' : ''}>
                <i className={`${item.iconClass} iconclass`}></i>
                {item.label}
              </li>
            </Link>
          ))}
          
        </ul>
      </div>

      {isMobile && showSidebar && <div className="overlay" onClick={toggleSidebar}></div>}

      <div className="sidebar-content">{children}</div>
    </div>
  );
};

export default Sidebar;
