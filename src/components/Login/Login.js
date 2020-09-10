import React, { useState, useContext } from 'react';
import { userContext } from '../../App.js';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbLogin, createUserWithEmailAndPassword, signInWithEmailAndPassword} from './logInManager'

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: ''
})

    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn= () => {
      handleGoogleSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    const fbSignIn = () => {
      handleFbLogin()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    const signOut=() => {
      handleSignOut()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
      })
    }

  const handleBlur= (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

    }
    if (e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 8;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit= (e) => {
  //console.log(user.email, user.password)
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name ,user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

   if(!newUser && user.email && user.password){
   signInWithEmailAndPassword(user.email, user.password)
   .then(res => {
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
  }) 
   }
    
    e.preventDefault();
  }


  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ?<button onClick={signOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign In</button>
      }   
      <br/>
      <button onClick={fbSignIn}>sign in using Facebook</button>  
      {
       user.isSignedIn && <div>
         <p>Welcome! {user.name}</p>
         <p>Your email: {user.email}</p>
         <img src={user.photo} alt=""/>
         </div>
     }

    <h1>Our Own Authentication</h1>
    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
    <label htmlFor="newUser">New User Sign Up</label>
    <form onSubmit={handleSubmit}>    
    {newUser && <input name="name" type="text" onChange={handleBlur} placeholder="Your Name"/>}
     <br/>
    <input type="text" name="email" onChange={handleBlur} placeholder="Your Email address" required/> 
     <br/>
     <input type="password" name="password" onChange={handleBlur} placeholder="Your password" required id=""/> 
     <br/>
     <input type="submit" value="submit"/>
    </form>
    <p style= {{color: 'red'}}>{user.error}</p>
    {
      user.success && <p style= {{color: 'green'}}>User { newUser ? 'Created' : 'Logged in'} successfully</p>

    }
    </div>
  );
}

export default Login;
