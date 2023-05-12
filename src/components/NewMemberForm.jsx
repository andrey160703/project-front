import React, {useContext, useMemo, useState} from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { UsersContext } from "../context";
import './NewMemberForm.css';

const NewMemberForm = ({ projectId, projectUsers, onMemberAdded, cancelCallBackFunction }) => {
    const { allUsers } = useContext(UsersContext);
    const [selectedUser, setSelectedUser] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleUserChange = (event) => {
        const userId = parseInt(event.target.value);
        setSelectedUser(userId);
    };

    const handleUserClick = (userId) => {
        setSelectedUser(userId);
    };

    const getUserInfo = (userId) => {
        const user = filteredUsers.find((user) => user.id === userId);
        if (user) {
            return {
                name: user.name,
                login: user.login,
                email: user.email
            };
        }
        return null;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedUser !== '') {
            const userInfo = getUserInfo(selectedUser);
            if (userInfo) {
                const newUser = {
                    projId: projectId,
                    userId: selectedUser,
                    name: userInfo.name,
                    login: userInfo.login,
                    email: userInfo.email
                };
                onMemberAdded(newUser);
                setSelectedUser('');
            } else {
                console.log('User not found');
            }
        }
    };

    const handleCancel = () => {
        cancelCallBackFunction(null);
    }

    const uniqueUsers = allUsers.filter((user) => {
        return !projectUsers.some((projectUser) => projectUser.id === user.id);
    });

    const filteredUsers = useMemo(() => {
        if (!searchQuery) {
            return uniqueUsers;
        } else {
            return uniqueUsers.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
    }, [allUsers, projectUsers, searchQuery]);

    return (
        <div className="form-overlay">
            <div className="form-container">
                <Form>
                    <Form.Group controlId="formUser">
                        <Form.Group controlId="formSearch" className="form-search">
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search user"
                                />
                            </InputGroup>
                        </Form.Group>
                        <div className="user-list">
                            {!filteredUsers.length &&
                                <div className="no-users">No users found</div>
                            }
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className={`user-item ${selectedUser === user.id ? 'selected' : ''}`}
                                    onClick={() => handleUserClick(user.id)}
                                >
                                    <input
                                        type="radio"
                                        name="user"
                                        id={`user-${user.id}`}
                                        value={user.id}
                                        checked={selectedUser === user.id}
                                        onChange={handleUserChange}
                                    />
                                    <label htmlFor={`user-${user.id}`}>
                                        <div className="user-details">
                                            <div className="user-name">{user.name}</div>
                                            <div className="user-info">
                                                <span className="user-login">{user.login}</span>
                                                <span className="user-email">{user.email}</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                </Form>
            </div>
            <div className="button-container">
                <Button variant="primary" type="submit" onClick={handleSubmit} disabled={selectedUser === ''} className="custom-button">
                    Add to project
                </Button>
                <Button variant="secondary" onClick={handleCancel} className="custom-button">
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default NewMemberForm;
