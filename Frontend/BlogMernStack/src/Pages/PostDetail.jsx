// import { useNavigate, useParams } from "react-router-dom";
// import Comment from "../components/Comment";
// import Nav from "../Components/Nav";
// import { BiEdit } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";
// import axios from "axios";
// import { IF, URL } from "../Url";
// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../Context/UserContext";
// import Loader from "../Components/Loader";

// const PostDetail = () => {
//   const postId = useParams().id;
//   const [post, setPost] = useState({});
//   const { userr } = useContext(UserContext);
//   const [comments, setComments] = useState([]);
//   const [comment, setComment] = useState("");
//   const [loader, setLoader] = useState(false);
//   const navigate = useNavigate();

//   const fetchPost = async () => {
//     setLoader(true);
//     try {
//       const res = await axios.get(URL + "/api/posts/" + postId);
//       setPost(res.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoader(false);
//     }
//   };

//   const handleDeletePost = async () => {
//     try {
//       await axios.delete(URL + "/api/posts/" + postId, {
//         withCredentials: true,
//       });
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchPostComments = async () => {
//     setLoader(true);
//     try {
//       const res = await axios.get(URL + "/api/comments/post/" + postId);
//       setComments(res.data);
//       setLoader(false);
//     } catch (err) {
//       setLoader(true);
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchPostComments();
//   }, [postId]);

//   const postComment = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         URL + "/api/comments/create",
//         {
//           comment: comment,
//           author: userr.username,
//           postId: postId,
//           userId: userr._id,
//         },
//         { withCredentials: true }
//       );

//       // fetchPostComments()
//       // setComment("")
//       window.location.reload(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       <Nav />
//       {loader ? (
//         <div className="h-[80vh] flex justify-center items-center w-full">
//           <Loader />
//         </div>
//       ) : (
//         <div className="px-8 md:px-[200px] mt-8">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold text-black md:text-3xl">
//               {post.title}
//             </h1>
//             {userr?._id === post?.userId && (
//               <div className="flex items-center justify-center space-x-2">
//                 <p
//                   className="cursor-pointer"
//                   onClick={() => navigate("/edit/" + postId)}
//                 >
//                   <BiEdit />
//                 </p>
//                 <p className="cursor-pointer" onClick={handleDeletePost}>
//                   <MdDelete />
//                 </p>
//               </div>
//             )}
//           </div>
//           <div className="flex items-center justify-between mt-2 md:mt-4">
//             <p>@{post.username}</p>
//             <div className="flex space-x-2">
//               <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
//               <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
//             </div>
//           </div>
//           {post.photo && (
//             <img
//               src={IF + post.photo}
//               className="w-full mx-auto mt-8"
//               alt={post.title}
//             />
//           )}
//           <p className="mx-auto mt-8">{post.desc}</p>
//           <div className="flex items-center mt-8 space-x-4 font-semibold">
//             <p>Categories:</p>
//             <div className="flex justify-center items-center space-x-2">
//               {post.categories?.map((c, i) => (
//                 <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
//                   {c}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="flex flex-col mt-4">
//             <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
//             {comments?.map((c) => (
//               <Comment key={c._id} c={c} post={post} />
//             ))}
//           </div>
//           {/* write a comment */}
//           <div className="w-full flex flex-col mt-4 md:flex-row">
//             <input
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               type="text"
//               placeholder="Write a comment"
//               className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
//             />
//             <button
//               onClick={postComment}
//               className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
//             >
//               Add Comment
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostDetail;

import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Nav from "../Components/Nav";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { IF, URL } from "../Url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import Loader from "../Components/Loader";

const PostDetail = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { userr } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // Fetch post details
  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  // Delete post handler
  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch comments for the post
  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  // Post a comment
  const postComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return; // Prevent empty comments
    try {
      const res = await axios.post(
        `${URL}/api/comments/create`,
        {
          comment,
          author: userr.username,
          postId,
          userId: userr._id,
        },
        { withCredentials: true }
      );
      setComments((prev) => [...prev, res.data]); // Append new comment
      setComment(""); // Clear input
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [postId]);

  return (
    <div>
      <Nav />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            {userr?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              {post.updatedAt && (
                <>
                  <p>{new Date(post.updatedAt).toDateString()}</p>
                  <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
                </>
              )}
            </div>
          </div>
          {post.photo && (
            <img
              src={IF + post.photo}
              className="w-full mx-auto mt-8"
              alt={post.title}
            />
          )}
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* write a comment */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
            />
            <button
              onClick={postComment}
              className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
