import React from 'react';
import {Accordion, Alert, Col, Row, Spinner} from "react-bootstrap";
import UserListItem from "../userListItem/UserListItem";
import './Userlist.css';
import {User} from "../../hooks/fetchUsers";

interface UserListProps {
    users: User[];
    loading: boolean;
    children?: React.ReactNode;
    emptyUserMessage?: string;
}

const UserList: React.FC<UserListProps> = (props) => {
    const { users, loading, children, emptyUserMessage } = props;

    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Row>
                <Col md={6}>
                    {children}
                </Col>
            </Row>
            <Accordion>
                {users && users.map((user, index) => <UserListItem key={user.user_id} index={index} user={user} />)}
                {!users.length && !loading && <Alert variant="info">
                    {emptyUserMessage}!
                </Alert>}
            </Accordion>
            <div style={{ alignSelf: 'center'}}>{loading && <Spinner animation="grow" />}</div>
        </div>
    )
}

export default UserList;
