// import React, { useState } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

// const EditProfile = () => {
//   const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
//   const navigate = useNavigate();

//   // Define state variables for user information
//   const [name, setName] = useState(user.name || '');
//   const [email, setEmail] = useState(user.email || '');
//   const [username, setUsername] = useState(user.username || '');
//   const [password, setPassword] = useState(user.password || '');

//   const handleSaveChanges = async (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     // Create an object with the updated user data
//     const updatedUserData = {
//       name,
//       email,
//       username,
//       password, 
//     };

//     try {
//       // Make an API request to your backend to update the user data
//       const response = await fetch('/update-profile', {
//         method: 'PUT', // Use the appropriate HTTP method for updating data
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedUserData),
//       });
//       console.log(response);
//       if (response.ok) {
//         // If the update was successful, navigate back to the profile page
//         navigate('/profile');
//       } else {
//         // Handle errors here (e.g., display an error message to the user)
//         console.error('Failed to update user profile.');
//       }
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//     }
//   };

//   return (
//     <EditProfileWrapper>
//       <EditProfileHeading>Edit User Info</EditProfileHeading>
//       <EditProfileContent>
//         <form onSubmit={handleSaveChanges}> {/* Wrap the form inside a <form> */}
//           {isAuthenticated ? (
//             <>
//               <FormField>
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </FormField>
//               <FormField>
//                 <label>Username:</label>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </FormField>
//               <FormField>
//                 <label>Email:</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </FormField>
//               <FormField>
//                 <label>Password:</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </FormField>
//               <Button type="submit">Save Changes</Button> 
//             </>
//           ) : (
//             <>
//               <p>Please log in to edit your profile.</p>
//               <Button onClick={loginWithRedirect}>Log In</Button>
//             </>
//           )}
//         </form>
//       </EditProfileContent>
//     </EditProfileWrapper>
//   );
// };

// const EditProfileWrapper = styled.div`
//   text-align: center;
//   padding: 20px;
// `;

// const EditProfileHeading = styled.h2`
//   font-size: 24px;
//   color: #333;
//   margin-bottom: 20px;
// `;

// const EditProfileContent = styled.div`
//   background-color: #fff;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   padding: 20px;
// `;

// const FormField = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 20px;
//   align-items: center;

//   label {
//     font-size: 16px;
//     margin-bottom: 5px;
//   }

//   input {
//     padding: 10px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     font-size: 16px;
//     width: 30vw;
//     text-align: center;
//   }
// `;

// const Button = styled.button`
//   background-color: #ff9800;
//   color: #fff;
//   border: none;
//   padding: 10px 20px;
//   cursor: pointer;
//   font-size: 16px;
//   border-radius: 5px;
//   transition: background-color 0.3s ease-in-out;
//   margin-top: 10px;

//   &:hover {
//     background-color: #ff5722;
//   }
// `;

// export default EditProfile;