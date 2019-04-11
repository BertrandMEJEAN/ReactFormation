import React,{ Component } from 'react';
import { MOCK } from '../mock';
import RecipeDetails from "../Component/RecipeDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Button } from 'reactstrap';

class RecipeList extends Component {

    state = {
        recipes: MOCK/*'10.0.1.68:8080/api/v1/recipes'*/,
        addMode: false    
      }
    
    delete = (recipe) => () => {
        let newRecipes = this.state.recipes.filter(item => recipe.id !== item.id);
        this.setState({recipes: newRecipes})
    };
    
    addMode = () => {
        this.setState({addMode: !this.state.addMode})
    };
    
    addRecipe = (recipe) => {
        let oldRecipes = this.state.recipes;
        oldRecipes.push(recipe)
        this.setState({
            recipes: oldRecipes,
            addMode: false
        });
    }

    render(){
    return(
        <div>
        <Container>
          <Row>
            {
              this.state.recipes.map(recipe => {
                return <RecipeDetails key = {recipe.id} recipe={recipe} onDelete={this.delete}/>
              })
            }
          </Row>
          {! this.state.addMode ?
          <Button>
            <FontAwesomeIcon icon={faPlus} onClick={this.addMode}/>
          </Button>
          :
          <RecipeDetails addRecipe={this.addRecipe}/>
          }
        </Container>
      </div>
    )}
}

export default RecipeList;