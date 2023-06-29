import React from 'react';
import {render, fireEvent, RenderResult} from '@testing-library/react';
import UserListItem from './UserListItem';
import {User} from "../../hooks/fetchUsers";
import {GlobalContext} from "../../App";

const renderUserListItem = (user: User, setFollowingUserToStorage: jest.Mock, setBlockedUserToStorage: jest.Mock) => {
    return (
        <GlobalContext.Provider value={{
            setFollowingUserToStorage,
            setBlockedUserToStorage,
            followingList: [],
            blockedList: [],
            followingCount: 0,
            blockedCount: 0
        }}>
            <UserListItem index={0} user={user} />
        </GlobalContext.Provider>
    );
}

describe('UserListItem', () => {
    let renderResult: RenderResult;
    const user: User = {
        user_id: 1,
        profile_image: 'user.jpg',
        display_name: 'John Doe',
        reputation: 100,
        location: 'Johannesburg'
    };
    const setFollowingUserToStorage = jest.fn();
    const setBlockedUserToStorage = jest.fn();

    beforeEach(() => {
        renderResult = render(renderUserListItem(user,setFollowingUserToStorage, setBlockedUserToStorage ));
    });

    test('renders user information correctly', () => {
        const { getByText} = renderResult;

        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByText('100')).toBeInTheDocument();
    });

    test('follows/unfollows a user correctly', () => {
        const { getByTestId, getByText } = renderResult;

        const followButton = getByTestId('follow-button');
        fireEvent.click(followButton);

        expect(setFollowingUserToStorage).toHaveBeenCalledWith(user, 0);
        expect(getByText('Unfollow')).toBeInTheDocument();

        fireEvent.click(followButton);
        expect(setFollowingUserToStorage).toHaveBeenCalledWith(user, 1);
        expect(getByText('Follow')).toBeInTheDocument();
    });

    test('blocks a user correctly', () => {
        const { getByTestId, getByText } = renderResult;

        const blockButton = getByTestId('block-button');
        fireEvent.click(blockButton);

        expect(setBlockedUserToStorage).toHaveBeenCalledWith(user, 0);
        expect(getByText('Blocked')).toBeInTheDocument();
    });
});
