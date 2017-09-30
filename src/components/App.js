import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import sampleRecipes from '../sampleRecipes';

class App extends Component {

  constructor() {
    super();
    this.state = {
      recipes: [],
      showModal: false,
      formData: {},
      index: null
    }
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentWillMount() {
    const localStorageRef = localStorage.getItem('recipes');
    if (localStorageRef) {
      this.setState({
        recipes: JSON.parse(localStorageRef)
      });
    } else {
      this.setState({
        recipes: sampleRecipes
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('recipes', JSON.stringify(nextState.recipes));
  }

  showModal(){
    this.setState({
      showModal: true,
      formData: {},
      index: null
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  saveRecipe(recipe, index) {
    const recipes = [...this.state.recipes];
    if (index) {
      recipes[index] = recipe;
    } else {
      recipes.push(recipe);
    }
    this.setState({recipes});
    this.closeModal();
  }

  deleteRecipe(index) {
    const recipes = [...this.state.recipes];
    recipes.splice(index, 1);
    this.setState({recipes});
  }

  editRecipe(recipe, index) {
    this.setState({
      showModal: true,
      formData: recipe,
      index
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <PageHeader>Recipe Box</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <RecipeList
                recipes={this.state.recipes}
                deleteRecipe={this.deleteRecipe}
                editRecipe={this.editRecipe}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button onClick={this.showModal}>Add Recipe</Button>
            </Col>
          </Row>
        </Grid>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.formData.title || 'Add a recipe'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RecipeForm index={this.state.index} formData={this.state.formData} saveRecipe={this.saveRecipe} closeModal={this.closeModal}></RecipeForm>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default App;
