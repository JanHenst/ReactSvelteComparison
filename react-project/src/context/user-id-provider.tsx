import {useEffect, useState} from "react";
import UserIdContext, { UserIdContextProps } from "./user-id-context";

interface UserIdProviderProps {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: UserIdProviderProps) {
    const [userId, setUserId] = useState<number>(!!localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!) : 0);

    const contextValue: UserIdContextProps = {
        userId: userId,
        setUserId: setUserId
    }

    useEffect(() => {
        localStorage.setItem("userId", JSON.stringify(userId));
    }, [userId]);

    return (
        <UserIdContext.Provider value={contextValue}>
            {children}
        </UserIdContext.Provider>
    )
}