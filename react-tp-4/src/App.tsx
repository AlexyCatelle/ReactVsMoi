import { useReducer, useState } from "react";
import "./App.css";

// Types -- START
type Task = {
	id: number;
	text: string;
	completed: boolean;
};

type State = {
	tasks: Task[];
	nextId: number;
};

type Action =
	| { type: "ADD_TASK"; payload: string }
	| { type: "TOGGLE_TASK"; payload: number }
	| { type: "DELETE_TASK"; payload: number };

type Filter = "Toutes" | "Terminées" | "En cours";
// Types -- END

// State initial -- START
const initialState: State = {
	tasks: [],
	nextId: 1,
};
// State initial -- END

// Reducer -- START
function taskReducer(state: State, action: Action): State {
	switch (action.type) {
		case "ADD_TASK":
			return {
				...state,
				tasks: [
					...state.tasks,
					{
						id: state.nextId,
						text: action.payload,
						completed: false,
					},
				],
				nextId: state.nextId + 1,
			};

		case "TOGGLE_TASK":
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload
						? { ...task, completed: !task.completed }
						: task
				),
			};

		case "DELETE_TASK":
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};

		default:
			return state;
	}
}
// Reducer -- END

function App() {
	const [state, dispatch] = useReducer(taskReducer, initialState);
	const [inputValue, setInputValue] = useState<string>("");
	const [filter, setFilter] = useState<Filter>("Toutes");

	// Ajout de tâche -- START
	const addTask = (): void => {
		if (inputValue.trim()) {
			dispatch({ type: "ADD_TASK", payload: inputValue.trim() });
			setInputValue("");
		}
	};

	const toggleTask = (id: number): void => {
		dispatch({ type: "TOGGLE_TASK", payload: id });
	};

	const deleteTask = (id: number): void => {
		dispatch({ type: "DELETE_TASK", payload: id });
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") {
			addTask();
		}
	};

	// Ajout de tâche -- END

	// Filtres -- START
	const filteredTasks: Task[] = state.tasks.filter((task) => {
		switch (filter) {
			case "Terminées":
				return task.completed;
			case "En cours":
				return !task.completed;
			default:
				return true;
		}
	});

	// Filtres -- END

	// Compteur -- START
	const totalTasks: number = state.tasks.length;
	const completedTasks: number = state.tasks.filter(
		(task) => task.completed
	).length;
	const pendingTasks: number = totalTasks - completedTasks;

	// Compteur -- END
	return (
		<>
			<header>
				<h1>Gestionnaire de Tâches</h1>
			</header>
			<main>
				<section className="task-input">
					<input
						type="text"
						placeholder="Nouvelle tâche..."
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<button onClick={addTask} disabled={!inputValue.trim()}>
						Ajouter
					</button>
				</section>
				<section className="filters">
					<button
						onClick={() => setFilter("Toutes")}
						disabled={filter === "Toutes"}
					>
						Toutes
					</button>
					<button
						onClick={() => setFilter("Terminées")}
						disabled={filter === "Terminées"}
					>
						Terminées
					</button>
					<button
						onClick={() => setFilter("En cours")}
						disabled={filter === "En cours"}
					>
						En cours
					</button>
				</section>

				<section className="task-count">
					<p>
						Total: {totalTasks} | Terminées: {completedTasks} | En cours:{" "}
						{pendingTasks}
					</p>
				</section>

				<section className="task-list">
					{filteredTasks.length === 0 ? (
						<p>
							{filter === "Toutes"
								? "Aucune tâche"
								: filter === "En cours"
									? "Aucune tâche en cours"
									: "Aucune tâche terminée"}
						</p>
					) : (
						<ul>
							{filteredTasks.map((task) => (
								<li key={task.id}>
									<input
										type="checkbox"
										checked={task.completed}
										onChange={() => toggleTask(task.id)}
									/>
									<span
										style={{
											textDecoration: task.completed ? "line-through" : "none",
											color: task.completed ? "#666" : "#000",
										}}
									>
										{task.text}
									</span>
									<button onClick={() => deleteTask(task.id)}>Supprimer</button>
								</li>
							))}
						</ul>
					)}
				</section>
			</main>
			<footer>
				<p>CDA 2025</p>
			</footer>
		</>
	);
}

export default App;
