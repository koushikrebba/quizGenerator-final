import { useContext, useEffect, useState } from "react";
import { CounterContext } from "./CounterContext";
import { jwtDecode } from "jwt-decode";

function Store({ children }) {
  let [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    //   const session= jwtDecode(token)
    //   const user = localStorage.getItem('user');

    //   console.log("from store token",token)
    //   console.log("from store session",session)
    //   console.log("from store user",user)
    //   setUser(user)
        const decodedToken = jwtDecode(token);
        // console.log("from store decodedToken",decodedToken)
        setUser(decodedToken); 
    } 
  }, []);

  return (
    <CounterContext.Provider value={{ user, setUser}}>
      {children}
    </CounterContext.Provider>
  );
}

export default Store;