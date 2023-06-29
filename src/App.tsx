import React, {createContext, useEffect, useState} from 'react';
import {Container, Row, Col, Image, Card, Badge} from "react-bootstrap";
import profilePic from './profile_picture.jpeg'
import './App.css';
import Sections from "./components/sections/Sections";
import {User} from "./hooks/fetchUsers";

export enum OPERATIONS {
    'add',
    'remove'
}
export interface GlobalContent {
    followingCount: number;
    blockedCount: number
    followingList: User[];
    blockedList: User[];
    setFollowingUserToStorage: (user: User, operation: OPERATIONS) => void;
    setBlockedUserToStorage: (user: User, operation: OPERATIONS) => void;
}
export const GlobalContext = createContext<GlobalContent>({
    followingCount: 0,
    blockedCount: 0,
    followingList: [],
    blockedList: [],
    setFollowingUserToStorage: () => {},
    setBlockedUserToStorage: () => {},
});

const App = () => {
    const [followingCount, setFollowingCount] = useState(0);
    const [blockedCount, setBlockedCount] = useState(0);
    const [blockedList, setBlockedList] = useState<User[]>([]);
    const [followingList, setFollowingList] = useState<User[]>([]);

    const getFollowingFromStorage = () => {
        const items = JSON.parse(localStorage.getItem('followingList') || "false");
        if (items) {
            const userList: User[] = Object.values(items);
            setFollowingList(userList);
            setFollowingCount(userList.length);
        }
    }

    const getBlockedFromStorage = () => {
        const items = JSON.parse(localStorage.getItem('blockedList') || "false");
        if (items) {
            const userList: User[] = Object.values(items);
            setBlockedList(userList);
            setBlockedCount(userList.length);
        }
    }

    const setBlockedUserToStorage = (user: User, operation: OPERATIONS) => {
        const items = JSON.parse(localStorage.getItem('blockedList') || "false");
        let item = null;
        if (operation === OPERATIONS.add) {
            if (items) {
                item = {
                    ...items,
                    [user.user_id]: user,
                }
            } else {
                item = {
                    [user.user_id]: user,
                }
            }
            localStorage.setItem('blockedList', JSON.stringify(item));
            setBlockedList([...blockedList, user]);
            setBlockedCount(blockedCount + 1)
        }
    }

    const setFollowingUserToStorage = (user: User, operation: OPERATIONS) => {
        const items = JSON.parse(localStorage.getItem('followingList') || "false");
        let item = null;
        if (operation === OPERATIONS.add) {
            if (items) {
                item = {
                    ...items,
                    [user.user_id]: user,
                }
            } else {
                item = {
                    [user.user_id]: user,
                }
            }
            localStorage.setItem('followingList', JSON.stringify(item));
            setFollowingList([...followingList, user]);
            setFollowingCount(followingCount + 1)
        } else {
           if (items && followingCount) {
               const { [user.user_id]: toRemove, ...rest } = items;
               localStorage.setItem('followingList', JSON.stringify(rest));

               setFollowingList(Object.values(rest));
               setFollowingCount(followingCount - 1);
           }
        }
    }

    useEffect(() => {
        getBlockedFromStorage();
    }, []);

    useEffect(() => {
        getFollowingFromStorage();
    }, []);

  return (
      <GlobalContext.Provider value={{
          blockedCount, followingCount, followingList, blockedList, setFollowingUserToStorage, setBlockedUserToStorage
      }}>
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
                                      <Badge bg="info">{followingCount}</Badge><p>Following</p>
                                  </Col>
                                  <Col>
                                      <Badge bg="info">{blockedCount}</Badge><p>Blocked</p>
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
      </GlobalContext.Provider>
  );
}

export default App;
