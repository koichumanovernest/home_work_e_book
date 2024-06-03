import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import "./BookForm.css";
import { setError } from "../../redux/slices/errorSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/slices/eBookSlice";

const BookForm = ({ onSubmit }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (title && author) {
			const newBookObject = {
				title: title,
				author: author,
				isFavorite: false,
			};
			onSubmit(newBookObject);
			setTitle("");
			setAuthor("");
		} else {
			dispatch(setError("Не удалос добавит ❗"));
		}
	};

	return (
		<div className="app-block book-form">
			<h2>Add a New Book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title: </label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="author">Author: </label>
					<input
						type="text"
						id="author"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</div>
				<button type="submit">Add Book</button>
				{/* <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button> */}

				<button type="button">
					{isLoading ? (
						<>
							<span>Loading Book...</span>
							<FaSpinner className="spinner" />
						</>
					) : (
						"Add Random via API"
					)}
				</button>
			</form>
		</div>
	);
};

export default BookForm;
