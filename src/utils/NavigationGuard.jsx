import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { isAuthenticated } from "../utils/authHelpers";

function NavigationGuard() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const handleNavigationChange = () => {
        if (!isAuthenticated() && window.location.pathname !== "/LoginPage") {
          window.location.replace("/LoginPage");
        }
      };
      
      window.addEventListener('popstate', handleNavigationChange);
      return () => {
        window.removeEventListener('popstate', handleNavigationChange);
      };
    }, []);
    
}

export default NavigationGuard;
