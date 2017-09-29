import React from 'react';
import {FormGroup, ControlLabel, FormControl, ButtonToolbar, Button} from 'react-bootstrap';

class RecipeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      ingredients: []
    }
    this.saveRecipe = this.saveRecipe.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      title: this.props.formData.title || '',
      ingredients: this.props.formData.ingredients || []
    });
  }

  saveRecipe() {
    if (!this.state.title || !this.state.ingredients.length) {
      return alert('Your recipe must have a title and at least one ingredient');
    };
    this.props.saveRecipe(this.state);
  }

  handleChange(e) {
    const val = e.target.id === 'ingredients' ?
      e.target.value.split(",").map((ing) => ing.trim()) :
      e.target.value
    this.setState({
      [e.target.id]: val
    });
  }

  render() {
    return (
      <form>
        <FormGroup controlId="title">
          <ControlLabel>Recipe Title</ControlLabel>
          <FormControl
            type="text"
            placeholder="Give your recipe a name"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="ingredients">
          <ControlLabel>Ingredients</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Ingredients, separated, by, Commas"
            onChange={this.handleChange}
          />
        </FormGroup>

        <ButtonToolbar>
          <Button
            onClick={this.saveRecipe}
            bsStyle="success"
            disabled={!this.state.title || !this.state.ingredients.length}
          >
            Save
          </Button>
          <Button onClick={this.props.closeModal} bsStyle="danger">Cancel</Button>
        </ButtonToolbar>

      </form>
    )
  }
}

export default RecipeForm;
