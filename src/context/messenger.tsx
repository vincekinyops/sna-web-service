import { useState, createContext } from "react"

interface IContext {
  data: any
  setCurrentConvo: (value: string) => void 
  setCurrentUser: (value: string) => void 
}
export const MessengerContext = createContext<IContext | null>(null);

export const MessengerProvider = ({ children }: { children: any }) => {
  const [currentConvo, setConvoId] = useState<string>("");
  const [user, setUser] = useState<any>(null)

  const setCurrentConvo = (value: string) => {
    if (value) {
      setConvoId(value);
    } else {
      setConvoId("");
    }
  };

  const setCurrentUser = (value: string) => {
    if (value) {
      setUser(value);
    } else {
      setUser(null);
    }
  };

  return (
    <>
      <MessengerContext.Provider value={{ data: { currentConvo, user }, setCurrentConvo, setCurrentUser }}>
        {children}
      </MessengerContext.Provider>
    </>
  );
};
