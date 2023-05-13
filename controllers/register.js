const handleRegister = (req, res, db, bcrypt) => {
    // when a website/app sends a request with the '/register' url
    // the lines of code gets run and then a response is sent back to the website/app
    const {name, email, password} = req.body;
    if (!email || !password || !name) {
       return res.status(400).json('Incorrect Form Submition');
    }
    const hash = bcrypt.hashSync(password);
    // you create a transaction when you have to do more than two things at once and
    // the trx obj instead of the db to do the database operations
    // in this case, we inserted (trx.insert({})) to login, it then returns the email (returning('email'))
    // and then we use the loginEmail(loginEmail comes back as an array) to also
    // return another trx transaction (trx('users')) to insert into the users and responded with json
    // and in order for the (name, email, password) to get added we have to make sure that we
    // commit(.then(trx.commit))
    // and incase anything fails, we...
    // rollback the changes (.catch(trx.rollback))
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
        })
        .into('login')
        .returning('*')
        .then(loginEmail => {
        return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0].email,
                joined: new Date()   
            }).then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(404).json('Unable To Register'))
    // this line of code means db('users'), insert({...})
    // and return (returning('*')) all the the columns
    // .catch(err => res.status(404).json(err)) OR do
    // .catch(err => res.status(404).json('Try another Email adress'))
}

module.exports = {
    handleRegister: handleRegister
}