import { createSlice } from "@reduxjs/toolkit";
import { ALL_REQUESTS } from "../eBooksRequests/eBookSliceReq";
const initialState = {
	books: [],
	isLoading: false,
	error: null,
};
const bookSlice = createSlice({
	name: "eBook",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(ALL_REQUESTS.getRequestBook.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			ALL_REQUESTS.getRequestBook.fulfilled,
			(state, { payload }) => {
				state.books = payload;
				state.isLoading = false;
			}
		);
		builder.addCase(
			ALL_REQUESTS.getRequestBook.rejected,
			(state, { payload }) => {
				state.error = payload;
				state.isLoading = false;
			}
		);
		// post
		builder.addCase(ALL_REQUESTS.postRequestBook.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(ALL_REQUESTS.postRequestBook.fulfilled, (state) => {
			state.isLoading = false;
		});

		builder.addCase(
			ALL_REQUESTS.postRequestBook.rejected,
			(state, { payload }) => {
				state.isLoading = false;
				state.error = payload;
			}
		);
		builder.addCase(ALL_REQUESTS.deleteRequestBook.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(
			ALL_REQUESTS.deleteRequestBook.fulfilled,
			(state, action) => {
				state.isLoading = false;
			}
		);
		builder.addCase(
			ALL_REQUESTS.deleteRequestBook.rejected,
			(state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			}
		);
	},
});

export const { deleteBook, toggleFavoriteBook } = bookSlice.actions;
export const selectBooks = (state) => state.ebook.books;
export const selectIsLoading = (state) => state.ebook.isLoading;
export default bookSlice.reducer;
