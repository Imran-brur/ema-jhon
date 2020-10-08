import React from 'react';
import {CardElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCartForm from './SimpleCartForm';
import SplitCardForm from './SplitCardForm';


const stripePromise = loadStripe('pk_test_51HZqz4HomUgYNXhv4Yie52YOaLzGkepPjEElHKl1Bcl3jObmfsFPBGWiODlFEyqbw6Cd56TLQIXxwq3ydbBgZ98C00ciLxKPxT');

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCartForm handlePayment={handlePayment}></SimpleCartForm>
    </Elements>
  );
};

export default ProcessPayment;