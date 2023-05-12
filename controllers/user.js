const handleUserGet = (req, res) => {
    // when a website/app sends a request with the '/user/:id' url
    // the lines of code gets run and then a response is sent back to the website/app
    // write a note on req.params
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if(user.length){
            res.json(user[0]);
        } else {
            res.status(400).json('User Not Found')
        }
    }).catch(err => res.status(400).json('User Not Found'))
    // 
    // 
}

module.exports = {
    handleUserGet: handleUserGet
}