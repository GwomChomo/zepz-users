import React from 'react';
import {Tab, Tabs, Form} from "react-bootstrap";
import UserList from "../userList/Userlist";

const Sections = () => {
    //search should be here but input in user list.
    return (
        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="people" title="People">
                <UserList>
                    <Form.Group className="mb-3" controlId="search">
                        <Form.Control type="text" placeholder="Search" />
                    </Form.Group>
                </UserList>
            </Tab>
            <Tab eventKey="following" title="Posts">
                Coming Soon
            </Tab>
        </Tabs>
    );
}

export default Sections;
