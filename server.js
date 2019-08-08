const express = require("express");
const server = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
server.use(cors());
server.use(express.json());
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

let autoIncrementId = 0;

const posts = [
    {
        id: autoIncrementId++,
        title: 'The Evolution of Async JavaScript: From Callbacks, to Promises, to Async/Await',
        url: 'https://medium.freecodecamp.org/the-evolution-of-async-javascript-from-callbacks-to-promises-to-async-await-e73b047f2f40',
        kissed: 1920,
        comments: [
            {
                id: autoIncrementId++,
                content: 'Good to consulting.',
                author: 'An Duong Vuong',
                kissed: 17
            },
            {
                id: autoIncrementId++,
                content: 'So how the evolution of multi-shot bow?',
                author: 'My Chau',
                kissed: 11
            },
            {
                id: autoIncrementId++,
                content: 'Greate question!',
                author: 'Trong Thuy',
                kissed: 3
            },
        ]
    },
    {
        id: autoIncrementId++,
        title: 'Game of Life',
        url: 'https://thefullsnack.com/posts/game-of-life.html',
        kissed: 1280
    },
    {
        id: autoIncrementId++,
        title: 'Nguyên tắc thiết kế REST API',
        url: 'https://medium.com/eway/nguyên-tắc-thiết-kế-rest-api-23add16968d7',
        kissed: 1024
    },
    {
        id: autoIncrementId++,
        title: 'Why You Only Need to Test with 5 Users',
        url: 'https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/',
        kissed: 800
    },
    {
        id: autoIncrementId++,
        title: 'Let’s Build A Web Server. Part 1.',
        url: 'https://ruslanspivak.com/lsbaws-part1/',
        kissed: 640
    }
];

server.get("/posts", (req, res, next) => {
    res.json(posts);
});

server.get("/posts/:id", (req, res, next) => {
    const id = +req.params.id;
    const found = find(id);
    if (!!found) {
        res.json(found.value);
    } else {
        res.sendStatus(404);
    }
});

server.post("/posts", (req, res, next) => {
    const post = {
        id: autoIncrementId++,
        title: req.body.title,
        url: req.body.url,
        kissed: req.body.kissed,
        comments: req.body.comments
    };
    post.push(post);
    res.location(`/posts/${post.id}`);
});

server.delete("/posts/:id", (req, res, next) => {
    const id = +req.params.id;
    const found = find(id);
    if (!!found) {
        posts.splice(found.index, 1);
        res.json(found.value);
    } else {
        res.sendStatus(404);
    }
});

server.put("/posts/:id", (req, res, next) => {
    const id = +req.params.id;
    const found = find(id);
    if (!!found) {
        const origin = found.value;
        origin.title = req.body.title;
        origin.url = req.body.url;
        origin.kissed = req.body.url;
        origin.comments = req.body.comments;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

function find(id) {
    let index = findIndex(id);
    return index === -1 ? null : {
        index: index,
        value: posts[index]
    };
}

function findIndex(id) {
    return posts.findIndex(p => p.id === id);
}
