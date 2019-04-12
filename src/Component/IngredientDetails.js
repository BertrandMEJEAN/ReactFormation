import React, { Component } from 'react';
import { DropdownItem} from 'reactstrap';

class IngredientDetails extends Component {

    state ={
        ingredient: this.props.ingredient
    }

  render() {

    let {ingredient} = this.state;

    return (
        <DropdownItem>{ingredient.name}</DropdownItem>
    )}
}

export default IngredientDetails;