import {  useReducer, useState } from 'react'

import './App.css'

function App() {

  // Types -- START
  type Task = {
    id: number
    text: string
    completed: boolean
  }

  type State = {
    tasks: Task[]
    nextId: number;
  }

  type Action =
    | { type: 'ADD_TASK'; payload: string }
    | { type: 'TOGGLE_TASK'; payload: number }
    | { type: 'DELETE_TASK'; payload: number };

  type Filter = 'Toutes' | 'Terminées' | 'En cours';

// Types -- END

// State initial -- START

  const initialState: State = {
    tasks: [],
    nextId: 1,
  }
// State initial -- END

// Reducer -- START



// Reducer -- END

  return (
    <>
    <header>
<h1>Gestionnaire de Tâches</h1>
</header>
<main>

</main>
<footer>
<p>CDA 2025</p>
</footer>
    </>
  )
}

export default App
