import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

export const NavButton = ({ label, variant = "default" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate(); 

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mouse handlers with delay
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    if (variant === "outlined" && label === "Sign Up") {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // 200ms delay
  };

  // Handle navigation based on the selected role
  const handleNavigation = (option) => {
    setIsDropdownOpen(false); // Close the dropdown
    switch (option) {
      case "Sign Up as Student":
        navigate("/auth/signup/student"); // Navigate to the student signup page
        break;
      case "Sign Up as Tutor":
        navigate("/auth/signup/trainer"); // Navigate to the tutor signup page
        break;
      case "Sign Up as Company":
        navigate("/auth/signup/company"); // Navigate to the company signup page
        break;
      default:
        break;
    }
  };

  // Handle login button click
  const handleLoginClick = () => {
    if (label === "Login") {
      console.log("Navigating to /login"); // Debugging
      navigate("/auth/login"); // Navigate to the login page
    }
  };

  // Base classes
  const baseClasses =
    "flex justify-center items-center p-3 my-auto cursor-pointer text-base max-md:text-sm max-md:p-1.5 transition-all duration-200";

  // Variant classes
  const variantClasses =
    variant === "outlined"
      ? "rounded-lg border-2 border-solid border-slate-900 hover:bg-gray-700 hover:text-white hover:shadow-lg max-md:border-[1px]"
      : "cursor-pointer hover:bg-gray-100 rounded-lg";

  // Dropdown options
  const dropdownOptions = [
    "Sign Up as Student",
    "Sign Up as Tutor",
    "Sign Up as Company",
  ];

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
<button
  className={`${baseClasses} ${variantClasses}`}
  aria-label={label}
  aria-expanded={isDropdownOpen}
  onClick={(event) => {
    event.stopPropagation();
    if (variant === "outlined" && label === "Sign Up") {
      setIsDropdownOpen(!isDropdownOpen);
    } else if (label === "Login") {
      handleLoginClick();
    }
  }}
>
  <span className=" self-stretch px-4 my-auto max-md:px-2 whitespace-nowrap ">
    {label}
  </span>
</button>

      {variant === "outlined" &&
        label === "Sign Up" &&
        isDropdownOpen && (
          <div 
            className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transform transition-all duration-200 ease-in-out"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {dropdownOptions.map((option) => (
              <button
                key={option}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm transition-colors rounded-lg m-1 hover:shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out"
                onClick={() => handleNavigation(option)} // Call handleNavigation on click
              >
                {option}
              </button>
            ))}
          </div>
        )}
    </div>
  );
};