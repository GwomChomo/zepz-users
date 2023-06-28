import React from 'react';
import {Accordion, Col, Row, Spinner} from "react-bootstrap";
import UserListItem from "../userListItem/UserListItem";
import './Userlist.css';
import {User} from "../../hooks/fetchUsers";

interface UserListProps {
    users: User[];
    loading: boolean;
    error: any;
    children?: React.ReactNode;
}

const UserList: React.FC<UserListProps> = (props) => {
    const { users, error, loading, children } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Row>
                <Col md={6}>
                    {children}
                </Col>
            </Row>
            <Accordion>
                {users && users.map((user, index) => <UserListItem index={index} user={user} />)}
            </Accordion>
            <div style={{ alignSelf: 'center'}}>{loading && <Spinner animation="grow" />}</div>
        </div>
    )
}

export default UserList;
