import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Button, CardTitle, CardSubtitle, Col, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

class RecipeDetails extends Component {

    state = {
        recipe: this.props.recipe || null,
        editMode: !this.props.recipe || false
    };

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode })
        this.props.addRecipe && this.props.addRecipe(this.state.recipe)
    };

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
                <Card>
                    {editMode && <Input value={recipe && recipe.picture} onChange={this.onChangePicture} />}
                    <CardImg top width="100%" src={recipe && recipe.picture} />
                    <CardBody>
                        <CardSubtitle></CardSubtitle>
                        {editMode ? <Input value={recipe && recipe.name} onChange={this.onChangeName} /> : <CardTitle>{recipe.name}</CardTitle>}
                        {editMode ? <textarea value={recipe && recipe.description} onChange={this.onChangeDescription} /> : <CardText>{recipe.description}</CardText>}
                        <Button>
                        {editMode ?                        
                            <FontAwesomeIcon icon={faCheck} onClick = {this.toggleEditMode} />
                        :
                            <FontAwesomeIcon icon={faPen} onClick={this.toggleEditMode} />
                        }
                        </Button>
                        {this.props.recipe
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