import React from 'react';
import Recipe from './Recipe';

import { PanelGroup, Panel, ButtonToolbar, Button } from 'react-bootstrap';

class RecipeList extends React.Component {
  constructor() {
    super();
    this.state = {
      activeKey: -1
    }
  }

  handleSelect(activeKey) {
    if (this.state.activeKey === activeKey) {
      activeKey = -1;
    }
    this.setState({
      activeKey
    })
  }

  render() {
    const recipes = this.props.recipes;
    return(
      <PanelGroup accordion activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
        {recipes.map((recipe, index) => {
          return(
            <Panel key={index} header={recipe.title} eventKey={index}
            >
              <Recipe recipe={recipe}></Recipe>
              <ButtonToolbar>
                <Button onClick={() => {this.props.deleteRecipe(index);this.handleSelect(-1);}}>Delete</Button>
                <Button onClick={() => {this.props.editRecipe(recipe, index)}}>Edit</Button>
              </ButtonToolbar>
            </Panel>
          )
        })}
      </PanelGroup>
    )
  }
}

export default RecipeList;
