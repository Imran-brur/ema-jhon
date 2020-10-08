
import React from 'react';
import logo from '../../images/logo.png'
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className="header">
            <img src={logo} alt=""/> 
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/orders">Order History</Link>
                <h3 style={{color: 'white'}}>WelCome! {loggedInUser.name}</h3>
                <button onClick={() => setLoggedInUser({})} class="btn btn-success">Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;
