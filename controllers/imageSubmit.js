const returnClarifaiRequestOption = (imageURL) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '4115039d463b4da7bb839832c857793f';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'danny007';       
    const APP_ID = 'face';
    // Change these to whatever model and image URL you want to use
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;
}


const handleImageSubmit = (req, res, db) => {
    // write a note on req.body
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('Unable Tog Get Entries'))
}

const handleApiCall = async (req, res) => {
    const response = await fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOption(req.body.input))
    const data = await response.json();
    return res.json(data)
}

module.exports = {
    handleImageSubmit,
    handleApiCall
}