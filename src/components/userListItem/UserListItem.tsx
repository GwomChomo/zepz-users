import React, {useContext, useEffect, useState} from "react";
import {Accordion, Badge, Card, Col, Image, Row, useAccordionButton} from "react-bootstrap";
import {User} from "../../hooks/fetchUsers";
import '../../App.css';
import {GlobalContext, OPERATIONS} from "../../App";

interface UserListItemProps {
    index: number;
    user: User;
}
const UserListItem: React.FC<UserListItemProps> = (props) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const { setFollowingUserToStorage, setBlockedUserToStorage } = useContext(GlobalContext);
    const { index, user } = props;
    const { profile_image, display_name, reputation } = user;

    const onSub = useAccordionButton(`${index}`);

    const toggleFollowUser = () => {
        setFollowingUserToStorage(user, isFollowing ? OPERATIONS.remove : OPERATIONS.add);
        setIsFollowing(!isFollowing);
    }

    const blockUser = () => {
        setBlockedUserToStorage(user, OPERATIONS.add);
        setIsBlocked(!isBlocked);
        setFollowingUserToStorage(user, OPERATIONS.remove);
        setIsFollowing(false);
        // @ts-ignore
        onSub(() => (null));
    }

    useEffect(() => {
        const checkIsBlocked = () => {
            const items = JSON.parse(localStorage.getItem('blockedList') || "false");
            if (items) {
                if (items[user.user_id]) setIsBlocked(true);
            }
        }
        checkIsBlocked();
    }, [user.user_id]);

    useEffect(() => {
        const checkIsFollowing = () => {
            const items = JSON.parse(localStorage.getItem('followingList') || "false");
            if (items) {
                if (items[user.user_id]) setIsFollowing(true);
            }
        }

        checkIsFollowing();
    }, [user.user_id]);

    return (
        <Card data-testid="user-list-item" bg={isBlocked ? "secondary" : undefined} className="mb-2 mt-2 right-shadow">
           <Row onClick={!isBlocked ? onSub : undefined} className="p-3 clickable"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               <Col xs={3} sm={3} md={3} lg={3}>
                   <div style={{ height: '25%', width: '25%'}}>
                       <Image className="profile-image" src={profile_image} roundedCircle/>
                   </div>
               </Col>
               <Col xs={3} sm={4} md={4} lg={4}>
                   {display_name}
               </Col>
               <Col xs={3} sm={3} md={3} lg={3}>
                   <Badge bg="dark">{reputation}</Badge>
               </Col>

               <Col xs={3} sm={2} md={2} lg={2}>
                   {isFollowing && <Badge bg="success">Following</Badge>}
                   {isBlocked && <Badge bg="secondary">Blocked</Badge>}
               </Col>
           </Row>
            <Accordion.Collapse eventKey={`${index}`}>
                <Card.Body>
                    <Row sm={8} md={6}>
                        <Col>
                            <Badge data-testid="follow-button"
                                   onClick={toggleFollowUser} className="clickable" bg="dark" pill>
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </Badge>
                        </Col>
                        <Col>
                            <Badge data-testid="block-button"
                                   onClick={blockUser} className="clickable" bg="danger" pill>
                                Block
                            </Badge>
                        </Col>
                    </Row>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

export default UserListItem;
