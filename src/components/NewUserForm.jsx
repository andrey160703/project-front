import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './NewUserForm.css';

const NewUserForm = ({ handleCreateUser }) => {
    const [login, setLogin] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const generateUserId = () => {
        // Генерируем случайное число от 1 до 1000
        const userId = Math.floor(Math.random() * 1000) + 10;
        return userId;
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Создаем объект с данными нового пользователя
        const userData = {
            user_id: generateUserId(),
            login,
            fullName,
            password,
            email,
        };

        // Вызываем функцию handleCreateUser и передаем данные нового пользователя
        handleCreateUser(userData);

        // Сбрасываем значения полей формы
        setLogin('');
        setFullName('');
        setPassword('');
        setEmail('');
    };

    return (
        <div className="new-user-form">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="login">
                    <Form.Label>Login*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="fullName">
                    <Form.Label>Full Name*</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create User
                </Button>
            </Form>
        </div>
    );
};

export default NewUserForm;
