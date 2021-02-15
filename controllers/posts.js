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
  console.log("the post body", post)
  const newPost = new PostMessage(post);
  console.log(newPost)
  try {
    await newPost.save()
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).send({ message: error.message })
  }
}