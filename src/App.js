// THIS IS FOR USING CREATEBROWSERROUTER
import './App.css';
import AppRoute from './config/route';

function App() {
  return <AppRoute />;
}

export default App;
// END HERE

//-------------------------------------------//

// THIS IS FOR USING COMMON ROUTING
// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import { useState } from 'react';
// import Dashboard from './pages/Dashboard';
// import ProtectedRoute from './pages/ProtectedRoute';
// import PageNotFound from './pages/PageNotFound';
// import Overview from './pages/Overview';
// import Stats from './pages/Stats';
// import Users from './pages/Users';
// import UserDetails from './pages/UserDetails';

// function App() {
//   const [isLoggedIn, setisLoggedIn] = useState(false);

//   const handleAuth = () => {
//     setisLoggedIn(!isLoggedIn);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <button onClick={handleAuth}>{isLoggedIn ? 'Logout' : 'Login'}</button>

//         <Routes>
//           <Route path="*" element={<PageNotFound />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route
//             path="/dashboard/*"
//             element={
//               <ProtectedRoute
//                 element={<Dashboard />}
//                 isAuthenticated={isLoggedIn}
//               />
//             }
//           >
//             <Route path="overview" element={<Overview />} />
//             <Route path="stats" element={<Stats />} />
//           </Route>
//           <Route
//             path="/about"
//             element={
//               <ProtectedRoute
//                 element={<About />}
//                 isAuthenticated={isLoggedIn}
//               />
//             }
//           />
//           <Route
//             path="/user/*"
//             element={
//               <ProtectedRoute
//                 element={<Users />}
//                 isAuthenticated={isLoggedIn}
//               />
//             }
//           >
//             {/* <Route path="details/:userId/*" element={<UserDetails />} /> */}
//           </Route>

//           <Route
//             path="/user/details/:userId/*"
//             element={
//               <ProtectedRoute
//                 element={<UserDetails />}
//                 isAuthenticated={isLoggedIn}
//               />
//             }
//           ></Route>
//           {/* Tambahkan rute login jika perlu */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// END HERE
