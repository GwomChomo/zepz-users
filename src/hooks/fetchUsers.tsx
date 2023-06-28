import React, {useEffect, useState} from 'react';
import axios from "axios";

const url = 'http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow';

export interface User {
    user_id: string;
    location: string;
    profile_image: string;
    display_name: string;
    reputation: number;
}

interface FetchUsersState {
    data: User[];
    error: any;
    loading: boolean;
}
const useFetchUsers = () => {
    const [state, setState] = useState<FetchUsersState>({ data: [], error: null, loading: false});
    const { data, error, loading } = state;

    const prepData = (responseData: User[]) => {
        setState(oldState => ({...oldState, data: responseData}));
    }

    useEffect(() => {
        (
            async function () {
                try {
                    setState( oldState => ({...oldState, loading: true }));
                    const response = await axios.get(url);
                    prepData(response.data.items as User[]);
                } catch (e) {
                    console.log({e});
                    setState(oldState => ({...oldState, error: e}));
                } finally {
                    setState(oldState => ({ ...oldState, loading: false }));
                }
            }
        )()
    }, [url]);

    return { data, error, loading };
}

export default useFetchUsers;
