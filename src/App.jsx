import { useDispatch, useSelector } from "react-redux";
import BookList from "./components/BookList/BookList";
import BookForm from "./components/BookForm/BookForm";
import Filter from "./components/Filter/Filter";
import Error from "./components/Error/Error";
import "./App.css";
import { useEffect } from "react";
import {
	getRequestBook,
	postRequestBook,
} from "./redux/eBooksRequests/eBookSliceReq";
import { selectIsLoading } from "./redux/slices/eBookSlice";
import { ToastContainer } from "react-toastify";

function App() {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	function onAddNewBook(newBook) {
		dispatch(postRequestBook(newBook));
	}

	useEffect(() => {
		dispatch(getRequestBook());
	}, []);

	return (
		<>   
			<div className="app">
				<header className="app-header">
					<h1>Book Library App</h1>
				</header>
				<main className="app-main">
					<div className="app-left-column">
						<BookForm onSubmit={onAddNewBook} />
					</div>
					<div className="app-right-column">
						<Filter />
						<BookList />
					</div>
				</main>
				<Error />
			</div>
			{isLoading && (
				<div className="blockSpinner">
					<div className="spinners"> </div>
				</div>
			)}
		</>
	);
}

export default App;
