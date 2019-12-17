import React from 'react';

import Aux from './../../../hoc/Auxility';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
    return (
        <li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}>
                {ingKey}
            </span>: {props.ingredients[ingKey]}
        </li>);
    });

    return (
        <Aux>
            <h3>Your order</h3>
            <p>Delicious Burger with the followed ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price}</strong></p>
            <p>Continue with checkout?</p>
            <Button clicked={props.purchaseCancel} btnType="Danger">CANCEL</Button>
            <Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;