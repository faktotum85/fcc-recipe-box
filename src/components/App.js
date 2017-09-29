import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col, Button } from 'react-bootstrap';
import Modal from '../shims/Modal.js'; // TODO: swap out placeholder when react-bootstrap gets fixed
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import sampleRecipes from '../sampleRecipes';

class App extends Component {

  constructor() {
    super();
    this.state = {
      recipes: [],
      showModal: false,
      formData: {}
    }
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
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
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  }

  showModal(){
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  saveRecipe(recipe) {
    const recipes = [...this.state.recipes];
    recipes.push(recipe);
    this.setState({recipes});
    this.closeModal();
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
              <RecipeList recipes={this.state.recipes}/>
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
            <RecipeForm formData={this.state.formData} saveRecipe={this.saveRecipe} closeModal={this.closeModal}></RecipeForm>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default App;
