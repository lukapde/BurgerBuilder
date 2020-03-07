import React, { Component } from 'react';

import Aux from '../../../hoc/Auxility/Auxility';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log('[OrderSummary WillUpdate]');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {ingKey}
                    </span>: {this.props.ingredients[ingKey]}
                </li>
            );
        });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>Delicious Burger with the followed ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price}</strong></p>
                <p>Continue with checkout?</p>
                <Button clicked={this.props.purchaseCancel} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinue} btnType="Success">CONTINUE</Button>
            </Aux>
        );
    }
    
};

export default OrderSummary;    

