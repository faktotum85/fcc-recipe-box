import React from 'react';
import Recipe from './Recipe';

import { PanelGroup, Panel } from 'react-bootstrap';

class RecipeList extends React.Component {
  render() {
    const recipes = this.props.recipes;
    return(
      <PanelGroup defaultActiveKey="0" accordion>
        {recipes.map((recipe, index) => {
          return(
            <Panel key={index} header={recipe.title} eventKey={index}>
              <Recipe recipe={recipe}></Recipe>
            </Panel>
          )
        })}
      </PanelGroup>
    )
  }
}

export default RecipeList;
