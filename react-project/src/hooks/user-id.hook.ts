import { Dispatch, SetStateAction, useContext } from "react";
import UserIdContext from "../context/user-id-context";

interface UserIdHookInterface {
    userId: number;
    setUserId: Dispatch<SetStateAction<number>>;
}

export default function useUserId(): UserIdHookInterface {
    const { userId, setUserId } = useContext(UserIdContext);

    return {
        userId,
        setUserId,
    };
}