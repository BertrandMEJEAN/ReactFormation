import React, { Component } from 'react';
import IngredientList from '../Container/IngredientList';
import { Card, CardImg, CardText, CardBody, Button, CardTitle, CardSubtitle, Col, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

class RecipeDetails extends Component {

    state = {
        recipe: this.props.recipes || {},
        editMode: !this.props.recipes || false,
        dropDownMenu: false
    };

    toggleMenu = () => {
        this.setState({dropDownMenu: !this.state.dropDownMenu });
    };

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode });
    };

    toggleCreateMode = () => {
        this.setState({ editMode: !this.state.editMode });
        this.props.addRecipe && this.props.addRecipe(this.state.recipe)
    }

    toggleUpdateMode = () => {
        this.setState({ editMode: !this.state.editMode});
        this.props.upRecipe && this.props.upRecipe(this.state.recipe)
    }

    toggleItemMode = () => {
        this.props.recipes ? this.toggleUpdateMode() : this.toggleCreateMode();
    }

    onChangePicture = (event) => {
        this.setState({ recipe: { ...this.state.recipe, picture: event.target.value } })
    }

    onChangeName = (event) => {
        this.setState({ recipe: { ...this.state.recipe, name: event.target.value } })
    }

    onChangeDescription = (event) => {
        this.setState({ recipe: { ...this.state.recipe, description: event.target.value } })
    }

    render() {

        let { recipe, editMode } = this.state;

        return (
            <Col md={3}>
                <Card >
                    {editMode && <Input value={recipe && recipe.picture} onChange={this.onChangePicture} />}
                    <CardImg top width="100%" src={recipe && recipe.picture} />
                    <CardBody>
                        <CardSubtitle></CardSubtitle>
                        {editMode ? <Input value={recipe && recipe.name} onChange={this.onChangeName} /> : <CardTitle>{recipe.name}</CardTitle>}
                        {editMode ? <textarea value={recipe && recipe.description} onChange={this.onChangeDescription} /> : <CardText>{recipe.description}</CardText>}
                        {editMode ? 
                        <IngredientList toggleMenu={this.toggleMenu} dropDown={this.state.dropDownMenu}/>
                        : 
                        <CardText>{recipe.ingredients.map(result =>  <p>{result.ingredient.name} {result.ingredient.unit} {result.ingredient.quantity}</p> )}
                        </CardText>}
                        <Button>
                        { editMode ?                        
                            <FontAwesomeIcon icon={faCheck} onClick = { this.toggleItemMode } />
                        :
                            <FontAwesomeIcon icon={faPen} onClick={ this.toggleEditMode } />
                        }
                        </Button>
                        {this.props.recipes
                            && 
                        <Button>
                            <FontAwesomeIcon icon={faTimes} onClick={this.props.onDelete(recipe)} />
                        </Button>}                       
                    </CardBody>
                </Card>
            </Col>
        );
    };
}

export default RecipeDetails;