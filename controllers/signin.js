const handleSignIn = (req, res, db, bcrypt) => {
    // When we want to sign in, we want to first grab our users from the smartbrain Database
    // so we do db.select('email', 'hash').from('login') and then we get a promise which we make use of by doing (.then())
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400).json('Invalid username or password')
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(pass => {
        const isValid = bcrypt.compareSync(password, pass[0].hash); /*this returns true/false*/
        if (isValid) {
           return db.select('*').from('users')
            .where('email', '=', email)
            .returning('*')
            .then(users => {
                res.json(users[0])
            })
            .catch(err => res.status(400).res("Error in logging in"))
        } else {
            res.status(400).json('Wrong-Credentials')
        }
    })
    .catch(err => res.status(400).json('Wrong Credentials'))
    // To use req.body, you have define app.use(express.json())
    // at the top of your code after defining the app(const app = express())
}

module.exports = {
    handleSignIn: handleSignIn
}