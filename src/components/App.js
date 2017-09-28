import React, { Component } from 'react';
import { PageHeader, Grid, Row, Col, Button } from 'react-bootstrap';
import RecipeList from './RecipeList';
import sampleRecipes from '../sampleRecipes';

class App extends Component {

  constructor() {
    super();
    this.state = {
      recipes: [],
      showModal: false
    }
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

  render() {
    return (
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
            <Button >Add Recipe</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
