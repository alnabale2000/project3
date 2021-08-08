const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const articles = [
    {
        id: 1,
        title: "How I learn coding?",
        description: "Lorem, Quam, mollitia.",
        author: "Jouza",
    },
    {
        id: 2,
        title: "Coding Best Practices",
        description: "Lorem, ipsum dolor sit, Quam, mollitia.",
        author: "Besslan",
    },
    {
        id: 3,
        title: "Debugging",
        description: "Lorem, Quam, mollitia.",
        author: "Jouza",
    },
];

const getAllArticles = app.get("/articles", (req, res) => {
    res.status(200);
    res.json(articles);
});
const getArticlesByAuthor = app.get("/articles/search_1", (req, res) => {
    const author = req.query.author;
    const arr = [];
    articles.forEach((element) => {
        if (element.author === author) arr.push(element);
    });
    res.status(200);
    res.json(arr);
    //res.json("Heloo");
});

const getAnArticleById = (req, res) => {
    const id = req.query.id;
    console.log("id", id);
    articles.forEach((element) => {
        // console.log("element.id", element.id);
        console.log("element", element);
        if (element.id === Number(id)) {
            res.status(200);
            res.json(element);
        }
    });
    res.status(404);
    res.json("Not Found");
};

app.get("/articles/search_2", getAnArticleById);

app.post("/articles", (req, res) => {
    const newArticle = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
    };
    articles.push(newArticle);
    res.status(201);
    res.json(newArticle);
});

const updateAnArticleById = (req, res) => {
    const id = req.params.id;
    const body = req.body;

    articles.forEach((element) => {
        if (element.id === Number(id)) {
            element.title = body.title;
            element.author = body.author;
            element.description = body.description;

            res.json(element);
        }
    });
};

app.put("/articles/:id", updateAnArticleById);

const deleteAnArticleById = (req, res) => {
    const id = req.params.id;

    articles.forEach((element, i) => {
        if (element.id === Number(id)) {
            articles.splice(i, 1);
            res.json({
                sucsses: true,
                message: "ok stuped",
            });
        }
    });
};

app.delete("/articles/:id", deleteAnArticleById);

const deleteAnArticleByAuthor = (req, res) => {
    const body = req.body;
    console.log("body", body);
    console.log("TEST");

    articles.forEach((element, i) => {
        if (element.author === body.author) {
            articles.splice(i, 1);
            res.json({
                sucsses: true,
                message: "ok stuped",
            });
        }
    });
    res.json({
        sucsses: false,
        message: "NO stuped",
    });
};

app.delete("/articles", deleteAnArticleByAuthor);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
