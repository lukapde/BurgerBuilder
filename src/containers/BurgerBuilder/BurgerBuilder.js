import React, { Component } from 'react';

import Aux from './../../hoc/Auxility';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    salad: 0.2,
    cheese: 0.4,
    bacon: 0.6,
    meat: 1.2
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 2,
            purchasable: false,
            purchasing: false
        };
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(ing => {
            return ingredients[ing];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({
            purchasable: sum > 0
        });

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;


        const newPrice = INGREDIENTS_PRICES[type] + this.state.totalPrice;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        let  updatedCount = 0;

        if(oldCount > 0) {
            updatedCount= oldCount - 1;
        }

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHanlder = () => {
        this.setState({ purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert("You continue!");
    }

    render() {
        const disabledInfos = {
            ...this.state.ingredients
        };

        for(let key in disabledInfos) {
            disabledInfos[key] = disabledInfos[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler} >
                <OrderSummary 
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.state.totalPrice.toFixed(2)}
                    ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfos}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHanlder}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;