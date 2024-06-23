"use client";

import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/router";
import { UserType } from "@/types/user.type";
import { createUser, getUserById } from "@/actions/users";
import React, { createContext, useState, useEffect, useContext } from "react";

// Define context type
interface AuthContextType {
    user: UserType | null;
    loading: boolean;
    error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    error: null,
});

// AuthProvider component
export default function AuthProvider({
    children,
}: {
    children: Readonly<React.ReactNode>;
}) {
    // const router = useRouter();
    const clerkUser = useUser();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!clerkUser.user?.id) return;

        const fetchUser = async () => {
            try {
                const userFromDB = await getUserById(clerkUser.user?.id);

                if (userFromDB) setUser(userFromDB);
                else {
                    const userCreated = await createUser({
                        clerkId: clerkUser.user?.id,
                        firstName: clerkUser.user.firstName,
                        lastName: clerkUser.user.lastName,
                        email: clerkUser.user.emailAddresses?.[0].emailAddress,
                    });
                    if (userCreated) {
                        const userFromDB = await getUserById(
                            clerkUser.user?.id
                        );
                        setUser(userFromDB);
                    }
                }
            } catch (error) {
                setError("Failed to fetch user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [clerkUser.user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
