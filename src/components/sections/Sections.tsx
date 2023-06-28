import React, {useContext} from 'react';
import {Tab, Tabs, Form } from "react-bootstrap";
import UserList from "../userList/Userlist";
import useFetchUsers from "../../hooks/fetchUsers";
import {GlobalContext} from "../../App";

const Sections = () => {
    const { data, error, loading } = useFetchUsers();
    const { blockedList } = useContext(GlobalContext);

    return (
        <Tabs
            defaultActiveKey="people"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="people" title="People">
                <UserList users={data} loading={loading} error={error}>
                    <Form.Group className="mb-3" controlId="search">
                        <Form.Control type="text" placeholder="Search" />
                    </Form.Group>
                </UserList>
            </Tab>
            <Tab eventKey="blocked" title="Blocked">
                <UserList users={blockedList} loading={loading} error={error}>
                    <Form.Group className="mb-3" controlId="search">
                        <Form.Control type="text" placeholder="Search" />
                    </Form.Group>
                </UserList>
            </Tab>
        </Tabs>
    );
}

export default Sections;
