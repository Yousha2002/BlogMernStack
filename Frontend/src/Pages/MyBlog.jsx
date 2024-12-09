import { Link, useLocation } from "react-router-dom";

import Nav from "../Components/Nav";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { URL } from "../Url";
import HomePost from "../Components/HomePost";
import Loader from "../Components/Loader";

const MyBlog = () => {
  const { search } = useLocation();
  // console.log(search)
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { userr } = useContext(UserContext);
  // console.log(user)

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + userr._id);
      // console.log(res.data)
      setPosts(res.data);
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

  return (
    <div>
      <Nav />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
              <Link to={userr ? `/posts/post/${post._id}` : "/login"}>
                <HomePost key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
    </div>
  );
};

export default MyBlog;
