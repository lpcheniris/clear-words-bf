import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
    query: { type: String, required: true, unique: true},
    translation: {type: Array, required:true },
    l: {type: String, require: true },
    explains: {type: Array, require: true},
    phonetic: {type: String, require: true}
})

export const Word = mongoose.model("Word", WordSchema)