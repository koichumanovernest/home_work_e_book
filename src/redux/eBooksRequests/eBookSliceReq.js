import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { toast } from "react-toastify";
import { setError } from "../slices/errorSlice";

export const getRequestBook = createAsyncThunk(
	"eBook/getRequestBook",

	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(`${BASE_URL}/eBook.json`);
			if (!response.ok) return;
			const data = await response.json();
			const transform = [];

			for (const key in data) {
				transform.push({
					id: key,
					title: data[key].title,
					author: data[key].author,
					isFavorite: data[key].isFavorite,
				});
			}
			return transform;
		} catch (error) {
			setError(error);
			return rejectWithValue(error);
		}
	}
);

export const postRequestBook = createAsyncThunk(
	"eBook/postRequestBook",

	async (data, { rejectWithValue, dispatch }) => {
		try {
			await fetch(`${BASE_URL}/eBook.json`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(data),
			});
			dispatch(getRequestBook());
			toast.success("Успешно добавлено 🦄");
		} catch (error) {
			toast.error("Не добавлено❌");
			return rejectWithValue(error);
		}
	}
);

export const deleteRequestBook = createAsyncThunk(
	"eBook/deleteRequestBook",

	async (id, { rejectWithValue, dispatch }) => {
		try {
			const res = await fetch(`${BASE_URL}/eBook/${id}.json`, {
				method: "DELETE",
			});
			dispatch(getRequestBook());
			toast.success("Успешно удалено🦄");
			return res;
		} catch (error) {
			toast.error("Не удалос удалит ❌");
			return rejectWithValue(error);
		}
	}
);

export const favoriteRequestBook = createAsyncThunk(
	"eBook/favoriteRequestBook",
	async (data, { rejectWithValue, dispatch }) => {
		try {
			console.log(data, "ali");
			const res = await fetch(`${BASE_URL}/eBook/${data.id}.json`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ ...data, isFavorite: !data.isFavorite }),
			});
			dispatch(getRequestBook());
			return res;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const ALL_REQUESTS = {
	getRequestBook,
	postRequestBook,
	deleteRequestBook,
	favoriteRequestBook,
};
