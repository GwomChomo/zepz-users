import {useEffect, useState} from 'react';
import axios, {AxiosError} from "axios";

export interface User {
    user_id: number;
    location: string;
    profile_image: string;
    display_name: string;
    reputation: number;
}

interface FetchUsersState {
    data: User[];
    error: AxiosError | null;
    loading: boolean;
}
const useFetchUsers = (page = 1) => {
    const [state, setState] = useState<FetchUsersState>({ data: [], error: null, loading: false});
    const { data, error, loading} = state;

    const prepData = (responseData: User[]) => {
        setState(oldState => ({...oldState, data: [...data, ...responseData]}));
    };

    useEffect(() => {
        (
            async function () {
                try {
                    setState( oldState => ({...oldState, loading: true }));
                    const url = `http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow&page=${page}`;
                    const response = await axios.get(url);
                    prepData(response.data.items as User[]);
                } catch (e) {
                    setState(oldState => ({...oldState, error: e as AxiosError}));
                } finally {
                    setState(oldState => ({ ...oldState, loading: false }));
                }
            }
        )()
    }, [page]);

    return { data, error, loading };
}

export default useFetchUsers;
