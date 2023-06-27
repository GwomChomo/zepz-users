import React from 'react';
import {Col, Row, Image, Badge, Card, Accordion, useAccordionButton} from "react-bootstrap";
import profilePic from "../profile_picture.jpeg";
import './userList/Userlist.css';

interface UserListItemProps {
    index: number;
}
const UserListItem: React.FC<UserListItemProps> = (props) => {
    const { index } = props;

    const onSub = useAccordionButton(`${index}`);

    return (
        <Card className="mb-2 mt-2">
           <Row onClick={onSub} className="p-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               <Col xs={4} sm={3} md={3} lg={3}>
                   <div style={{ height: '25%', width: '25%'}}>
                       <Image className="profile-image" src={profilePic} roundedCircle/>
                   </div>
               </Col>
               <Col xs={4} sm={6} md={6} lg={6}>
                   Sebastian Gabriel
               </Col>
               <Col xs={4} sm={3} md={3} lg={3}>
                   <h6>
                       <Badge bg="dark">Reputation</Badge>
                   </h6>
               </Col>
           </Row>
            <Accordion.Collapse eventKey={`${index}`}>
                <Card.Body>
                    <Row sm={8} md={6}>
                        <Col><Badge bg="dark" pill>Follow</Badge></Col>
                        <Col><Badge bg="danger" pill>Block</Badge></Col>
                    </Row>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

export default UserListItem;
