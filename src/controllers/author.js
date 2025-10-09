import Author from "../models/Author.js";
import Joi from "joi";

// Joi schemas (create vs update)
const createAuthorSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  bio: Joi.string().max(500).optional(),
});

const updateAuthorSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(), // optional nhưng nếu có thì không rỗng
  bio: Joi.string().max(500).optional(),
});

export async function getAuthors(req, res) {
  // Author.find()
  try {
    const authors = await Author.find();
    return res.json(authors);
  } catch (error) {
    return res.json({ error: error.message });
  }
}

export async function getAuthorById(req, res) {
  // Author.findById()
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Ko tim thay" });
    }
    return res.json(author);
  } catch (error) {
    return res.json({ error: error.message });
  }
}

export async function addAuthor(req, res) {
  try {
    const { error } = createAuthorSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errors: error.details.map((e) => e.message) });
    }
    // Model.create(data) : data = req.body, Model = Author
    const newAuthor = await Author.create(req.body);
    return res.status(201).json(newAuthor);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function updateAuthor(req, res) {
  // Author.findByIdAndUpdate()
  try {
    const { error } = updateAuthorSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errors: error.details.map((e) => e.message) });
    }
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!author) {
      return res.status(404).json({ error: "Ko tim thay" });
    }
    return res.json(author);
  } catch (error) {
    return res.json({ error: error.message });
  }
}
export async function deleteAuthor(req, res) {
  // Author.findByIdAndDelete()
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ error: "Ko tim thay" });
    }
    return res.json({ success: true });
  } catch (error) {
    return res.json({ error: error.message });
  }
}
