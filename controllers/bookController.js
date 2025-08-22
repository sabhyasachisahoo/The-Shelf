import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import {validateFields} from "../utils/validateFields.js"

export const addBook = catchAsyncErrors(async (req, res, next) => {
  const { title, author, description, price, quantity } = req.body;
  const validateFieldsError = validateFields({
    title,
    author,
    description,
    price,
    quantity,
  });
  if (validateFieldsError) {
    return next(new ErrorHandler(validateFieldsError, 400));
  }
  const book = await Book.create({
    title,
    author,
    description,
    price,
    quantity,
  });
  res.status(201).json({
    success: true,
    message: "Book added successfully.",
    book,
  });
});
export const getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const books = await Book.find().lean();
  res.status(200).json({
    success: true,
    books,
  });
});
export const deleteBook = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const book = await Book.findByIdAndDelete(id);
  if(!book){
    return next(new ErrorHandler("Book not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Book deleted successfully.",
  });
});
