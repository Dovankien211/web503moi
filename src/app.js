import express from "express";
<<<<<<< HEAD
// import Joi from "joi";
import mongoose from "mongoose";
import postRouter from "./routers/post.js";
import authorRouter from "./routers/author.js";

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/nodejs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Model Author
app.use("/api/posts", postRouter);

app.use("/api/authors", authorRouter);

// const authorSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       minlength: 2,
//       maxlength: 100,
//     },
//     bio: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const Author = mongoose.model("Author", authorSchema);

// // ---------Validate JOI ------
// const createSchema = Joi.object({
//   name: Joi.string().required().min(2).max(100),
//   bio: Joi.string().optional().max(500),
// });

// //---------- CRUD Author ------
// // GET api/authors
// app.get("/api/authors", async (req, res) => {
//   try {
//     const authors = await Author.find();
//     res.json(authors);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// // GET api/authors/:id
// app.get("/api/authors/:id", async (req, res) => {
//   try {
//     const author = await Author.findById(req.params.id);
//     res.json(author);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// // POST api/authors
// app.post("/api/authors", async (req, res) => {
//   try {
//     const { error } = createSchema.validate(req.body, { abortEarly: false });
//     if (error) {
//       return res.json({ errors: error.details.map((err) => err.message) });
//     }
//     const newAuthor = await Author.create(req.body);
//     res.json(newAuthor);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// // PUT api/authors/:id
// app.put("/api/authors/:id", async (req, res) => {
//   try {
//     const updateAuthor = await Author.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//       }
//     );

//     res.json(updateAuthor);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// // DELETE // api/authors/:id
// app.delete("/api/authors/:id", async (req, res) => {
//   try {
//     await Author.findByIdAndDelete(req.params.id);

//     res.json({ success: true });
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

// -----------------------------

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
=======
import morgan from "morgan";
import mongoose from "mongoose";
import postRouter from "./routers/post.js";
import productRouter from "./routers/product.js";

const app = express();

app.use(morgan("dev"));        // Log requests
app.use(express.json());       // Parse JSON body

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/kien072")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.get("/", (req, res) => {
  res.send(`
    🚀 API Server đang chạy! 
    📝 API Posts: /api/posts
    🛍️ API Products: /api/products
  `);
});

app.use("/api/posts", postRouter);
app.use("/api/products", productRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại: http://localhost:${PORT}`);
  console.log(`📝 API Posts: http://localhost:${PORT}/api/posts`);
  console.log(`🛍️ API Products: http://localhost:${PORT}/api/products`);
>>>>>>> 3041184eb43c278195e07d673609e6874d7b5944
});
