import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import IngredientDetails from "../Component/IngredientDetails";

class IngredientList extends Component {

  state = {
      toggleMenu: this.props.toggleMenu,
      ingredients: null,
  }  

  componentDidMount() {
      this.getAll()
  }

  getAll() {
      axios.get('http://10.0.1.212:8080/api/v1/ingredients').then(
          result => {
              let tab = result.data;
              this.setState({ingredients: tab})
          }
      )
  }

  render() {
    return (
        <Dropdown isOpen={this.props.dropDown} toggle={this.toggleMenu}>
        <DropdownToggle caret>
          Select Ingredients
        </DropdownToggle>
        <DropdownMenu right>
        {
            this.state.ingredients && this.state.ingredients.map(ingredient =>{
                return <IngredientDetails key={ingredient.id} ingredient={ingredient}/>
            })
        }
        </DropdownMenu>
      </Dropdown> 
    )
    }
}

export default IngredientList;
