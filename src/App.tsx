import React from 'react';
import {Container, Row, Col, Image, Card, Badge} from "react-bootstrap";
import profilePic from './profile_picture.jpeg'
import './App.css';
import Sections from "./components/sections/Sections";

const App = () => {
  return (
      <Container>
        <Row>
          <Col xs={2} className="p-3">
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <div>
                      <Row>
                          <Col xs={10} md={5}>
                              <Image className="profile-image" src={profilePic} roundedCircle/>
                          </Col>
                      </Row>
                      <Row>
                          <Col xs={8} md={8}>
                              <p>Chomo Gwom </p>
                              </Col>
                      </Row>
                      <Row>
                          <Col>
                              <Badge bg="info">2</Badge><p>Followers</p>
                          </Col>
                        <Col>
                            <Badge bg="info">100</Badge><p>Following</p>
                        </Col>
                    </Row>
                  </div>
              </div>
          </Col>
          <Col>
              <Card
                bg="Light"
                className="mb-3 mt-3"
              >
                <Card.Body>
                    <Sections />
                </Card.Body>
              </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default App;
