import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from './ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';
import Cart from '../Cart/Cart';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
       history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pdt => pdt.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://secure-citadel-89769.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))

    }, []);

    let thankyou;
    if(orderPlaced) {
        thankyou = <img src={happyImage} alt=""/>

    }
    return (
        <div className="twin-container">
           <div className="product-container">
           {
                cart.map(pdt => <ReviewItem
                    key={pdt.key}
                    removeProduct={removeProduct}
                    product={pdt}></ReviewItem>)
            }
           
           { thankyou }
           </div>
           <div className="cart-container">
            <Cart cart={cart}>
               <button onClick={handleProceedCheckout} className="btn btn-success">Proceed  Checkout</button>
            </Cart>
           </div>
        </div>
    );
};

export default Review;