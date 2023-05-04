import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { LoginContext } from '../context';
import { AdministratorContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate(); // инициализируем хук useNavigate

    const { globalLogin } = useContext(LoginContext);
    const { isAdministrator } = useContext(AdministratorContext);

    const handleButtonClick = () => {
        console.log('Button clicked!');
    };

    const goToManagersPage = () => {
        navigate('/managers');
    }

    const goToWorkersPage = () => {
        navigate('/workers'); // используем хук useNavigate для перехода на страницу workers
    };

    const goToProjectsPage = () => {
        navigate('/projects');
    };

    return (
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
                            className="mr-3 border-dark bg-dark"
                            onClick={goToProjectsPage}
                        >
                            Projects
                        </Button>
                        {isAdministrator &&
                            <Button
                                className="ml-auto border-dark bg-dark"
                                onClick={goToManagersPage}
                            >
                                Managers
                            </Button>
                        }
                        {isAdministrator &&
                            <Button
                                className="ml-auto border-dark bg-dark"
                                onClick={goToWorkersPage}
                            >
                                Workers
                            </Button>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
