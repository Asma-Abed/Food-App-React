import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

const App = () => {
  return (
    <>
      <Cart />
      <Header></Header>
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
