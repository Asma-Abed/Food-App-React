import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValid, setFormInputsValid] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const entredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;

    const entredNameIsValid = !isEmpty(entredName);
    const entredStreetIsValid = !isEmpty(enteredStreet);
    const entredCityIsValid = !isEmpty(enteredCity);
    const entredPostalIsValid = isFiveChar(enteredPostal);

    setFormInputsValid({
      name: entredNameIsValid,
      street: entredStreetIsValid,
      city: entredCityIsValid,
      postalCode: entredPostalIsValid,
    });

    const formIsValid =
      entredNameIsValid &&
      entredCityIsValid &&
      entredPostalIsValid &&
      entredStreetIsValid;

    if (!formIsValid) {
      return;
    }
  };

  const nameClasses = formInputsValid.name
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const streetClasses = formInputsValid.street
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const cityClasses = formInputsValid.city
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const postalClasses = formInputsValid.postalCode
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
        {!formInputsValid.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
        {!formInputsValid.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalRef} />
        {!formInputsValid.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} />
        {!formInputsValid.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
