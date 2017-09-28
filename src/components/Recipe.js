import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Recipe extends React.Component {

  render() {
    const recipe = this.props.recipe;
    return (
      <ListGroup>
        {recipe.ingredients.map((ingredient, index) => {
          return(
            <ListGroupItem key={index}>{ingredient}</ListGroupItem>
          )
        })}
      </ListGroup>
    )
  }
}

export default Recipe;
