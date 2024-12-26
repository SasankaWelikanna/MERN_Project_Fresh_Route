import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import "./navbar.css";
import { getCart } from "../../features/user/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [initialScroll, setInitialScroll] = useState(true);
  const [totalAmount, setTotalAmount] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index]?.quantity) * Number(cartState[index]?.price);
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);

      if (initialScroll && scrollTop > 0) {
        setInitialScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialScroll]);

  // Handle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogIn = () => {
    navigate("/login");
    closeMobileMenu();
  };

  const handleLogout = () => {
    localStorage.clear();
    closeMobileMenu();
    window.location.reload();
  };

  const isUserLoggedIn = localStorage.getItem("token");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={`main-header ${
        isScrolled && !initialScroll ? "stricky-header" : ""
      }`}
    >
      <nav className="nav">
        <div className="nav-logo">
          <a href="/">FreshRoute.</a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div 
          className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Overlay */}
        <div 
          className={`nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobileMenu}
        ></div>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-list">
            <a href="/" onClick={closeMobileMenu}>Home</a>
          </li>
          <li className="nav-list">
            <a href="/about" onClick={closeMobileMenu}>About</a>
          </li>
          <li className="nav-list">
            <a href="/shop" onClick={closeMobileMenu}>Shop</a>
          </li>
          <li className="nav-list">
            <a href="/contact" onClick={closeMobileMenu}>Contact</a>
          </li>
          <li className="nav-list">
            {isUserLoggedIn ? (
              <div className="user-menu">
                <Link to="" className="me-2">
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Avatar
                      alt={authState?.user?.name}
                      src="/static/images/avatar/1.jpg"
                    />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={() => { handleClose(); closeMobileMenu(); }}>Profile</MenuItem>
                    <MenuItem onClick={() => { handleClose(); closeMobileMenu(); }}>My Dashboard</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Link>
                <Link to="/cart" onClick={closeMobileMenu}>
                  <Badge 
                    className="cart-badge"
                    badgeContent={cartState?.length ? cartState?.length : 0}
                    color="primary"
                  >
                    <i className="fa fa-shopping-cart shopping-cart-icon"></i>
                  </Badge>
                </Link>
              </div>
            ) : (
              <button onClick={handleLogIn} className="nav-login">
                Log In
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;