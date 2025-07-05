import React, { useEffect, useRef, useState } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BottomNavBar from "./BottomNavBar";

const Header = ({ handleCart, setNavHeight }) => {
  const { user } = useSelector((state) => state.userInfo);

  const [expanded, setExpanded] = useState(false);

  const navRef = useRef(0);

  const handleInternalChange = () => {
    const isMobile = window.innerWidth < 992;
    if (isMobile) {
      setExpanded(false);
    }
    handleCart();
  };

  useEffect(() => {
    const updateHeight = () => {
      setNavHeight(navRef.current.offsetHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      className="bg-body-tertiary w-100 sticky-top"
      ref={navRef}
    >
      <Container>
        {/* Left-aligned links (Shop, About) - Hidden on mobile */}
        <Navbar.Collapse id="navbar-left" className="order-1 order-lg-0">
          <Nav>
            <a href="/shop" className="px-3 nav-link">
              SHOP
            </a>
            <a href="/about" className="px-3 nav-link">
              ABOUT
            </a>
            <a href="/user/wishlist" className="px-3 nav-link">
              WISHLIST
            </a>
          </Nav>
        </Navbar.Collapse>

        {/* Brand (Centered) */}
        <Navbar.Brand
          onClick={() => (window.location.href = "/")}
          className=" fs-1 fw-bold order-0"
          style={{ cursor: "pointer" }}
        >
          DEV STYLE
        </Navbar.Brand>
        <div id="navbar-search-mobile" className="d-block d-md-none">
          <Nav className="ms-auto border">
            <a href="/search" className="px-3 nav-link ">
              SEARCH
            </a>
          </Nav>
        </div>

        {/* Toggle button (for mobile) */}
        <Navbar.Toggle
          aria-controls="navbar-left navbar-right"
          className="order-0 ms-auto d-none d-md-block d-lg-none"
        />

        {/* Right-aligned links (Wishlist, Search, Cart) - Hidden on mobile */}
        <Navbar.Collapse id="navbar-right" className="order-3 order-lg-0">
          <Nav className="ms-auto">
            <a href="/search" className="px-3 nav-link">
              SEARCH
            </a>

            {user && user.role === "admin" ? (
              <a href="/admin/adminDashboard" className="px-3 nav-link">
                DASHBOARD
              </a>
            ) : (
              <a href="/user/account" className="px-3 nav-link">
                ACCOUNT
              </a>
            )}

            {/*  changed to button as we are expecting the div for cart to be rendered above the current page, as we are not navigating to another separate page acc to the figma design */}
            <button
              className="px-3 text-start nav-link"
              onClick={handleInternalChange}
            >
              CART
            </button>
          </Nav>
        </Navbar.Collapse>

        <BottomNavBar handleCart={handleCart} user={user} />
      </Container>
    </Navbar>
  );
};

export default Header;
