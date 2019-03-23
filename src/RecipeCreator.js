import { Box, Button, Form, FormField, TextArea, TextInput } from 'grommet';
import { Add } from 'grommet-icons';
import React from 'react';
import { db } from "./firebase";

export const RecipeCreator = () => {
const [error, setError] = React.useState({});
  const [description, setDescription] = React.useState('');
  const [ingredients, setIngredients] = React.useState([
    { ingredient: '', value: '' }
  ]);
  // notes on dynamic field updates           
  // https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
  const update = (ingredients, index, type, value) => {
    let newIngredients = [...ingredients];
    newIngredients[index][type] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (ingredient) => {
      const newIngredients = ingredients.filter( item => item.ingredient !== ingredient)
      setIngredients(newIngredients);
  }

  const handleSubmit = async (e) => {
    
      if (!e.value.name ) {
        setError({...error, name: 'Please add a name'})
        return
      }


      if (!description) {
        setError({...error, description: 'Please add a description'})
        return
      }
    

const newRecipe = await db.collection('recipes').doc()
db.doc(`recipes/${newRecipe.id}`).set({
    name:e.value.name,
    description,
    ingredients
})
.then( () => console.log('hey!'))
.catch(error => console.error('Error adding ingredient', error))  
}
console.log(ingredients)
  return (
  <Form onSubmit={handleSubmit} errors={error}>
    <FormField name="name" label="Name"  />
    <FormField label="description" name="description">
      <TextArea  value={description} onChange={e => setDescription(e.target.value)} />
    </FormField>
    <FormField label="ingredients" name="ingredients">
    {ingredients && ingredients.map((val, idx) => {
      return (
      <Box key={idx} pad={{ vertical: 'small' }} flex>
      <Button  alignSelf='end'  onClick={() => removeIngredient(val.ingredient)}>Remove</Button>
        <TextInput placeholder="value" width="xsmall" value={val.value} onChange={e => update(ingredients, idx, 'value', e.target.value)} />
        <TextInput placeholder="ingredient" value={val.ingredient} onChange={e => update(ingredients, idx, 'ingredient', e.target.value)} />
      </Box>);
    })}
    </FormField>
    <Button icon={<Add />}  onClick={() => setIngredients([...ingredients, { ingredient: '', value: '' }])} />
    <div className='pt4'>
      <Button type="submit" primary label="Submit" />
    </div>
  </Form>
  );
};
