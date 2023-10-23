import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styles from "../NavBar/NavBar.module.css";

const NavBar = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" style={{position:"sticky", top:"0px", zIndex:"1"}}>
        <Container>
          <Navbar.Brand href="#home" style={{padding:"0px"}}>
            <img
              width="40"
              height="40"
              src="https://img.icons8.com/external-becris-lineal-color-becris/64/external-recipe-kitchen-cooking-becris-lineal-color-becris-1.png"
              alt="external-recipe-kitchen-cooking-becris-lineal-color-becris-1"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className={styles.links} to="/">
              Recipes
            </NavLink>
            |
            <NavLink
              style={{ width: "10vw" }}
              className={styles.links}
              to="/savedrecipe"
            >
              Saved Recipes
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
