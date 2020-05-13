import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxility/Auxility';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
/*         axios.get('https://react-my-burger-ff2f4.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            }).catch(error => {
                this.setState({error: true})
            }); */
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(ing => {
            return ingredients[ing];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    purchaseHanlder = () => {
        this.setState({ purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push({pathname: '/checkout',});
    }

    render() {
        const disabledInfos = {
            ...this.props.ings
        };

        for(let key in disabledInfos) {
            disabledInfos[key] = disabledInfos[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

        if(this.props.ings) {
            burger = (<Aux>  
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfos}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHanlder}
                    price={this.props.price}
                />
            </Aux>);
            orderSummary = <OrderSummary 
                            purchaseCancel={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                            price={this.props.price.toFixed(2)}
                            ingredients={this.props.ings} />;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }



        return (
            <Aux>
                <Modal show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler} >
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));