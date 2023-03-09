import { useEffect, useState } from 'react';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          'https://react-http-71624-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
        );

        if (!res.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await res.json();

        const loadedMeals = [];
        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setHasError(err.message);
      }
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsIsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className={classes.mealsError}>
        <p>{hasError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
