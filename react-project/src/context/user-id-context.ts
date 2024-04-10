import { createContext, Dispatch, SetStateAction } from "react";

export interface UserIdContextProps {
    userId: number;
    setUserId: Dispatch<SetStateAction<number>>;
}

const UserIdContext = createContext<UserIdContextProps>({
    userId: 0,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setUserId: () => {
    },
});

export default UserIdContext;