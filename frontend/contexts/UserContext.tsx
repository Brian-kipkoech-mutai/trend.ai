   "use client"
import { getUser } from "@/services/auth-service";
import {  useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";

interface User {
  email: string;
  name: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType | null>(null);
//we  are  catching the user data from the server and storing it in the user context
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const user = data ? data.data : null;

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
