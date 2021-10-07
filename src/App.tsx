import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";

function App() {
  return (
    <div className="App">
        <AppHeader/>
        <main>
            <div className="container">
                <section className="burgerSection">
                    <BurgerIngredients/>
                </section>
            </div>
        </main>
    </div>
  );
}

export default App;
