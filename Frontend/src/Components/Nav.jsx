// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { BsSearch } from "react-icons/bs";
// import { FaBars } from "react-icons/fa";
// import { useContext, useState, useEffect } from "react";
// import Menu from "./Menu";
// import { UserContext } from "../Context/UserContext";

// const Nav = () => {
//   const [prompt, setPrompt] = useState("");
//   const [menu, setMenu] = useState(false);
//   const navigate = useNavigate();
//   const path = useLocation().pathname;
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredPosts, setFilteredPosts] = useState("");

//   // useEffect to filter posts based on search input
//   useEffect(() => {
//     const results = posts.filter((post) =>
//       post.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredPosts(results);
//   }, [searchTerm]); // Runs whenever searchTerm changes

//   const showMenu = () => {
//     setMenu(!menu);
//   };

//   const { userr } = useContext(UserContext); // Access user context properly

//   return (
//     <>
//       <div className="flex items-center justify-between px-6 md:px-[100px] py-4 bg-slate-200">
//         <h1 className="text-lg md:text-xl font-extrabold">
//           <Link to="/">YOUSHA BLOG</Link>
//         </h1>
//         {path === "/" && (
//           <div>
//             <div className="flex justify-center items-center space-x-0 bg-slate-200 px-2 rounded-md">
//               <p className="cursor-pointer">
//                 <BsSearch className="text-gray-400 text-bold" />
//               </p>
//               <input
//                 className="outline-none px-3 py-2 bg-slate-200"
//                 placeholder="Search a post"
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)} // Update search term
//               />
//             </div>

//             {/* Display filtered posts */}
//             <div className="mt-4">
//               {filteredPosts.length > 0 ? (
//                 filteredPosts.map((post) => (
//                   <p
//                     key={post.id}
//                     className="bg-white p-2 rounded-md shadow-md my-2"
//                   >
//                     {post.title}
//                   </p>
//                 ))
//               ) : (
//                 <p>No posts found</p>
//               )}
//             </div>
//           </div>
//         )}
//         <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
//           {userr ? (
//             <h3>
//               <Link
//                 to="/write"
//                 className="inline-block rounded bg-black px-3 py-2 text-sm font-medium text-white "
//               >
//                 Write
//               </Link>
//             </h3>
//           ) : (
//             <h3>
//               <Link
//                 to="/login"
//                 className="inline-block rounded bg-black px-6 py-3 text-sm font-medium text-white "
//               >
//                 Login
//               </Link>
//             </h3>
//           )}
//           {userr ? (
//             <div onClick={showMenu}>
//               <p className="cursor-pointer relative">
//                 <FaBars />
//               </p>
//               {menu && <Menu />}
//             </div>
//           ) : (
//             <h3>
//               <Link
//                 to="/register"
//                 className="inline-block rounded bg-black px-6 py-3 text-sm font-medium text-white "
//               >
//                 Register
//               </Link>
//             </h3>
//           )}
//         </div>
//         <div onClick={showMenu} className="md:hidden text-lg">
//           <p className="cursor-pointer relative">
//             <FaBars />
//           </p>
//           {menu && <Menu />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Nav;

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { BsSearch } from "react-icons/bs";
// import { FaBars } from "react-icons/fa";
// import { useContext, useState, useEffect } from "react";
// import Menu from "./Menu";
// import { UserContext } from "../Context/UserContext";

// const Nav = () => {
//   const [menu, setMenu] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const { posts, userr } = useContext(UserContext); // Access posts and userr from context
//   const navigate = useNavigate();
//   const path = useLocation().pathname;

//   // useEffect to filter posts based on search input
//   useEffect(() => {
//     if (posts.length > 0) {
//       const results = posts.filter((post) =>
//         post.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredPosts(results);
//     }
//   }, [searchTerm, posts]); // Add posts to the dependency array

//   const showMenu = () => {
//     setMenu(!menu);
//   };

//   return (
//     <div className="flex items-center justify-between px-6 md:px-[100px] py-4 bg-slate-200">
//       <h1 className="text-lg md:text-xl font-extrabold">
//         <Link to="/">YOUSHA BLOG</Link>
//       </h1>
//       {path === "/" && posts.length > 0 && (
//         <div>
//           <div className="flex justify-center items-center space-x-0 bg-slate-200 px-2 rounded-md">
//             <p className="cursor-pointer">
//               <BsSearch className="text-gray-400 text-bold" />
//             </p>
//             <input
//               className="outline-none px-3 py-2 bg-slate-200"
//               placeholder="Search a post"
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)} // Update search term
//             />
//           </div>

//           {/* Display filtered posts */}
//           <div className="mt-4">
//             {filteredPosts.length > 0 ? (
//               filteredPosts.map((post) => (
//                 <p
//                   key={post._id}
//                   className="bg-white p-2 rounded-md shadow-md my-2"
//                 >
//                   {post.title}
//                 </p>
//               ))
//             ) : (
//               <p>No posts found</p>
//             )}
//           </div>
//         </div>
//       )}
//       <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
//         {userr ? (
//           <h3>
//             <Link
//               to="/write"
//               className="inline-block rounded bg-black px-3 py-2 text-sm font-medium text-white "
//             >
//               Write
//             </Link>
//           </h3>
//         ) : (
//           <h3>
//             <Link
//               to="/login"
//               className="inline-block rounded bg-black px-6 py-3 text-sm font-medium text-white "
//             >
//               Login
//             </Link>
//           </h3>
//         )}
//         {userr ? (
//           <div onClick={showMenu}>
//             <p className="cursor-pointer relative">
//               <FaBars />
//             </p>
//             {menu && <Menu />}
//           </div>
//         ) : (
//           <h3>
//             <Link
//               to="/register"
//               className="inline-block rounded bg-black px-6 py-3 text-sm font-medium text-white "
//             >
//               Register
//             </Link>
//           </h3>
//         )}
//       </div>
//       <div onClick={showMenu} className="md:hidden text-lg">
//         <p className="cursor-pointer relative">
//           <FaBars />
//         </p>
//         {menu && <Menu />}
//       </div>
//     </div>
//   );
// };

// export default Nav;

import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu";
import { UserContext } from "../Context/UserContext";

const Nav = ({ setSearchTerm }) => {
  const [menu, setMenu] = useState(false);
  const { userr } = useContext(UserContext); // Access userr from context
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-[100px] py-4 bg-slate-200">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">YOUSHA BLOG</Link>
      </h1>
      {path === "/" && (
        <div>
          <div className="flex justify-center items-center space-x-0 bg-slate-200 px-2 rounded-md">
            <p className="cursor-pointer">
              <BsSearch className="text-gray-400 text-bold" />
            </p>
            <input
              className="outline-none px-3 py-2 bg-slate-200"
              placeholder="Search a post"
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term in Home via prop
            />
          </div>
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {userr ? (
          <h3>
            <Link
              to="/write"
              className="inline-block rounded bg-black px-3 py-2 text-sm font-medium text-white "
            >
              Write
            </Link>
          </h3>
        ) : (
          <h3>
            <Link
              to="/login"
              className="inline-block rounded bg-black px-6 py-3 text-sm font-medium text-white "
            >
              Login
            </Link>
          </h3>
        )}
        {userr ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link
              to="/register"
              className="inline-block rounded bg-black px-6 py-3 text-sm font-medium text-white "
            >
              Register
            </Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Nav;
