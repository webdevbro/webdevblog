import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    /* useCreateIndex: true, */
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch(() => {
    console.log("Error connecting to DB!!");
  });

/* USING ASYNC AWAIT */
/* mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "Successfully connected to the database 'webdevblog'",
      );
    }
  },
);
 */
/* MODELS */
/* USER */
const User = mongoose.model(
  "user",
  new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    website: String,
  }),
);
/* POST */
const Post = mongoose.model(
  "posts",
  new mongoose.Schema(
    {
      id: Number,
      title: String,
      body: String,
      userId: Number,
    },
    {
      timestamps: true,
    },
  ),
);
/************************/
/******* APIs ***********/
/************************/
/* POSTS */
/* get all posts */
app.get("/api/posts", async (req, res) => {
  const { userId } = req.query;
  const posts = await Post.find(userId ? { userId } : {});
  res.send(posts);
});
/* get one post by id */
app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ id });
  if (post) {
    res.send(post);
  } else {
    res.statys(404).send({ message: "Post not found" });
  }
});
/* create post */
app.post("/api/posts", async (req, res) => {
  if (!req.body.title || !req.body.body) {
    return res.send({ message: "Data is required." });
  }
  const post = new Post(req.body);
  const createdPost = await post.save();
  res.send(createdPost);
});

/* USERS */
/* get all users */
app.get("/api/users", async (req, res) => {
  const { email, password } = req.query;
  const users = await User.find(
    email && password ? { email, password } : {},
  );
  res.send(users);
});
/* get one user by id */
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ id });
  if (user) {
    res.send(user);
  } else {
    res.statys(404).send({ message: "User not found" });
  }
});
/* create user */
app.post("/api/users", async (req, res) => {
  if (
    !req.body.name ||
    !res.body.email ||
    !req.body.password
  ) {
    return res.send({ message: "Data is required." });
  }
  const user = new User(req.body);
  const createdUser = await user.save();
  res.send(createdUser);
});
/* edit user */
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, name, phone, password, website } =
    req.body;
  const user = await User.findOne(id);
  if (user) {
    user.email = email;
    user.name = name;
    user.phone = phone;
    user.password = password;
    user.website = website;
    const updatedUser = await user.save();
    res.send(updatedUser);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

/* SEEDER */
app.get("/api/seed", async (req, res) => {
  await User.deleteMany();
  await User.insertMany([
    {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      password: "123",
      phone: "1-770-736-8031 x56442",
      website: "mywebsite.com",
    },
  ]);
  await Post.deleteMany();
  await Post.insertMany([
    {
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      userId: "1",
    },
    {
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
      userId: "1",
    },
    {
      id: 3,
      title:
        "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
      userId: "1",
    },
    {
      id: 4,
      title: "eum et est occaecati",
      body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
      userId: "1",
    },
  ]);
  res.send({ message: "Seeded successfully" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});
