// import axios from "axios";
// import Footer from "../Components/Footer";
// import HomePosts from "../Components/HomePost";
// import Nav from "../Components/Nav";
// import { IF,URL } from "../Url";
// import { useContext, useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Loader from "../Components/Loader";
// import { UserContext } from "../Context/UserContext";

// const Home = () => {
//   const { search } = useLocation();
//   // console.log(search)
//   const [posts, setPosts] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const [loader, setLoader] = useState(false);
//   const { userr } = useContext(UserContext);
//   // console.log(user)

//   const fetchPosts = async () => {
//     setLoader(true);
//     try {
//       const res = await axios.get(URL + "/api/posts/" + search);
//       // console.log(res.data)
//       setPosts(res.data);
//       if (res.data.length === 0) {
//         setNoResults(true);
//       } else {
//         setNoResults(false);
//       }
//       setLoader(false);
//     } catch (err) {
//       console.log(err);
//       setLoader(true);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, [search]);

//   return (
//     <>
//       <Nav />
//       <div className="px-8 md:px-[200px] min-h-[80vh]">
//         {loader ? (
//           <div className="h-[40vh] flex justify-center items-center">
//             <Loader />
//           </div>
//         ) : !noResults ? (
//           posts.map((post) => (
//             <>
//               <Link to={userr ? `/posts/post/${post._id}` : "/login"}>
//                 <HomePosts key={post._id} post={post} />
//               </Link>
//             </>
//           ))
//         ) : (
//           <h3 className="text-center font-bold mt-16">No posts available</h3>
//         )}
//       </div>
//     </>
//   );
// };

// export default Home;

import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import HomePost from "../Components/HomePost";
import Nav from "../Components/Nav";
import { UserContext } from "../Context/UserContext";
import { URL } from "../Url";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // Add state for filtered posts
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search term
  const { userr } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      setFilteredPosts(res.data); // Initially, set filtered posts to all posts
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  // Update filtered posts based on searchTerm
  useEffect(() => {
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  return (
    <>
      <Nav setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to Nav */}
      <div className="px-8 md:px-[100px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          filteredPosts.map((post) => (
            <Link
              key={post._id}
              to={userr ? `/posts/post/${post._id}` : "/login"}
            >
              <HomePost post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
    </>
  );
};

export default Home;
