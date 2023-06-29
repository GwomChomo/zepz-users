import React, {useContext, useState} from 'react';
import {Tab, Tabs, Form, Alert} from "react-bootstrap";
import UserList from "../userList/Userlist";
import useFetchUsers from "../../hooks/fetchUsers";
import {GlobalContext} from "../../App";
import useScrollToBottom from "../../hooks/scrollToBottom";

const Sections = () => {
    const [page, setPage] = useState(1);
    const { data, error, loading } = useFetchUsers(page);
    const { blockedList } = useContext(GlobalContext);

    const handleUpdatePage = () => {
        setPage(page + 1);
    }

    useScrollToBottom(handleUpdatePage);

    return (
        <Tabs
            defaultActiveKey="people"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="people" title="People">
                {error && <Alert variant="danger">
                    An error occurred. Could not fetch data!
                </Alert>}
                {!error && (
                    <UserList users={data} loading={loading}>
                        <Form.Group className="mb-3" controlId="search">
                            <Form.Control type="text" placeholder="Search" />
                        </Form.Group>
                    </UserList>
                )}
            </Tab>
            <Tab eventKey="blocked" title="Blocked">
                <UserList users={blockedList} loading={loading}>
                    <Form.Group className="mb-3" controlId="search">
                        <Form.Control type="text" placeholder="Search" />
                    </Form.Group>
                </UserList>
            </Tab>
        </Tabs>
    );
}

export default Sections;
