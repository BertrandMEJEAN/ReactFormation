import React,{ Component } from 'react';
import axios from 'axios';
import RecipeDetails from "../Component/RecipeDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Button } from 'reactstrap';

class RecipeList extends Component {

    state = {
        recipes: null,
        addMode: false    
      }

    componentDidMount() {
      this.getAllRecipe();
    }
    
    delete = (recipe) => () => {
        axios.delete('http://10.0.1.212:8080/api/v1/recipes/'+recipe.id).then(res => {
          this.getAllRecipe()
        })
    };
    
    addMode = () => {
        this.setState({addMode: !this.state.addMode})
    };
    
    addRecipe = (recipe) => {
        axios.post('http://10.0.1.212:8080/api/v1/recipes', recipe)
          .then(
            this.addMode(),
            this.getAllRecipe()
          )
    }

    update = (recipe) => {
      axios.patch('http://10.0.1.212:8080/api/v1/recipes', recipe).then(res => {
        this.getAllRecipe();
      })
    }

    getAllRecipe() {
      axios.get('http://10.0.1.212:8080/api/v1/recipes')
        .then(result => {
              let tab = result.data;
              this.setState({recipes: tab})

        }).catch(error => {
          console.log(error);
        })
    }

    render(){
    return(
        <div>
        <Container>
          <Row>
            {
              this.state.recipes && this.state.recipes.map(recipe => {
                return <RecipeDetails key = {recipe.id} recipes={recipe} upRecipe={this.update} onDelete={this.delete}/>
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