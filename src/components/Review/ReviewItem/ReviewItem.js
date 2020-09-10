import React from 'react';

const ReviewItem = (props) => {

    const {name,quantity,key,price} = props.product;

    const reviewStyle = {
        borderBottom:'1px solid gray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'100px'
    };
    return (
        <div style={reviewStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>$ {price}</small></p>
            <br/>
            <button
             className="btn btn-danger"
             onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;