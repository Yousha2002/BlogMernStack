// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { URL } from "../Url";
// // Create a context for User
// export const UserContext = createContext({});

// // Provide the context to child components
// export function UserContextProvider({ children }) {
//   const [userr, setUserr] = useState(null);

//   useEffect(() => {
//     getUser();
//   }, []);
//   const getUser = async () => {
//     try {
//       const res = await axios.get(URL + "/api/auth/refetch", {
//         withCredentials: true,
//       });
//       setUserr(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ userr, setUserr }}>
//       {children} {/* Fixed the typo here */}
//     </UserContext.Provider>
//   );
// }

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../Url";

// Create a context for User and Posts
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userr, setUserr] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
    fetchPosts(); // Fetch posts when the context initializes
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", {
        withCredentials: true,
      });
      setUserr(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/");
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ userr, setUserr, posts, loading }}>
      {children}
    </UserContext.Provider>
  );
}
