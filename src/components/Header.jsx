import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LoginContext } from '../context';
import { AdministratorContext } from '../context';
import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {
    const navigate = useNavigate(); // инициализируем хук useNavigate

    const currentPage = () => {
        const page = window.location.pathname.split('/').pop();
        if (/^\d+$/.test(page)) {
            const path = window.location.pathname.split('/').slice(0, -1).join('/');
            return path.split('/').pop() || '/';
        } else {
            return page;
        }
    }

    const { globalLogin } = useContext(LoginContext);
    const { isAdministrator } = useContext(AdministratorContext);

    const handleButtonClick = () => {
        console.log('Button clicked!');
        console.log(currentPage())
    };

    const goToUsersPage = () => {
        navigate('/users');
    }
    const goToProjectsPage = () => {
        navigate('/projects');
    };

    return (
        <div className="sticky-header">
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="navbar-collapse">
                            {isAdministrator && (
                                <Button
                                    className="mr-3 border-dark bg-dark text-danger"
                                    onClick={handleButtonClick}
                                >
                                    {globalLogin}
                                </Button>
                            )}
                            {!isAdministrator && (
                                <Button
                                    className="mr-3 border-dark bg-dark text-info"
                                    onClick={handleButtonClick}
                                >
                                    {globalLogin}
                                </Button>
                            )}
                            <Button
                                className={"mr-3 border-dark bg-dark " + (currentPage() === "projects" ? "text-glow" : "")}
                                onClick={goToProjectsPage}
                            >
                                Projects
                            </Button>
                            {isAdministrator &&
                                <Button
                                    className={"mr-3 border-dark bg-dark " + (currentPage() === "users" ? "text-glow" : "")}
                                    onClick={goToUsersPage}
                                >
                                    Users
                                </Button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
