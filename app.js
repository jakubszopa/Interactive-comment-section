const express = require('express');
const path = require('path');
const fs = require('fs')

app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    const Data = JSON.parse(fs.readFileSync('./data3.json'));
    res.render('index', {data: Data});
});

app.post('/', function (req, res) {

    const Data = JSON.parse(fs.readFileSync('./data3.json'));
    const currentUser = Data.currentUser;
    let lastId
    const lastComment = Data.comments.slice(-1);

    if (lastComment[0].replies.length != 0) {
        lastId = +lastComment[0].replies.slice(-1)[0].id;
    } else {
        lastId = +lastComment[0].id;
    }

    // const commentText = req.body.value;
    // console.log(req.body);
    // console.log(Data);
    const comment = req.body['User-comment'];
    // console.log(Data.comments)

    if (comment) {
        result = Data.comments.push({
            id: lastId + 1,
            content: comment,
            createdAt: '5 days ago',
            score: 0,
            user: currentUser,
            replies: [],
        });
        fs.writeFileSync('./data.json', JSON.stringify(Data));
        // console.log(comment);
        // console.log(result);
        res.render('index', {data: Data});

    } else {
        alert('Something went wrong!');
    }
});

app.post('/delete', (req, res) => {

    const Data = JSON.parse(fs.readFileSync('./data.json'));
    const postID = +req.body.postid;
    let newData = {...Data};

    for (comment of Data.comments) {
       const commentID = comment.id;
       if(comment.replies.length > 0) {
            for (reply of comment.replies) {
                if (reply.id === postID) {
                        const newRepliesToComment = comment.replies.filter(reply => reply.id != postID);
                        const commentIndex = newData.comments.findIndex(comment => {
                            for (reply of comment.replies) {
                                if(reply.id === postID) {
                                    return (reply.id === postID);
                                }
                        }   })
                        newData.comments[commentIndex].replies = newRepliesToComment;
                        console.log(newData);
                        fs.writeFileSync('./data3.json', JSON.stringify(newData));
                        // console.log(commentIndex);
                } else {
                    const newCommentsData = Data.comments.filter(comment => comment.id != postID);
                    // console.log(newCommentsData);
                }
            }
       }        
    }
    res.redirect('/');
})

app.listen(3000);