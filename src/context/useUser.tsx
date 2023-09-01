import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
interface User {
  firstname: string;
  lastname: string;
  profile: string;
}
const UserContext = createContext<{
  user: User | undefined;
  setNewUser: (user: User) => void;
} | null>(null);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    setUser((s) => JSON.parse(localStorage.getItem("user") ?? "") as User);
  }, []);
  function setNewUser(userData: User): void {
    if (!userData || userData == undefined) throw "User is null";
    localStorage.setItem("user", JSON.stringify(userData));
    setUser((s) => userData);
  }
  return (
    <>
      <UserContext.Provider value={{ user, setNewUser }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
