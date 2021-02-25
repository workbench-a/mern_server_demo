import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.send(404).json({message: error.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  console.log(newPost);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).send({ message: error.message })
  }
}

// export const updatePost = async (req, res) => {
//   const { id: _id } = req.params;
//   const post = req.body;
//   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

//   try {
//     const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// }
  
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
  console.log("hi there")

  try {
    await PostMessage.findByIdAndRemove(_id);
    res.status(200).send(`Successfully deleted post: ${_id}`);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}