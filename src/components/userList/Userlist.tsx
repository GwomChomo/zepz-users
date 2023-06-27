import React from 'react';
import {Accordion, Col, Row} from "react-bootstrap";
import UserListItem from "../UserlistItem.component";
import './Userlist.css';

interface UserListProps {
    data?: any[];
    children?: React.ReactNode;
}

const UserList: React.FC<UserListProps> = (props) => {
    const { children } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Row>
                <Col xs={4} md={5}>
                    {children}
                </Col>
            </Row>
            <Accordion>
                {[1,2,3].map((i, index) => <UserListItem index={index} />)}
            </Accordion>
        </div>
    )
}

export default UserList;
