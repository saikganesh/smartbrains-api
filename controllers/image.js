const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '0a35ee2107e7497dae3be4d2faf1c229'
});

const handleAPI = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json("unable to work with API"))
}



const handleImage = (req,res,db) => {
	const {id} = req.body;
	return db('users')
  	.where('id', '=',id)
  	.increment("entries",1).returning('entries')
  	.then(entries => res.json(entries[0]))
  	.catch(err => err.status(400).json("something wrong"))
}

module.exports = {
	handleImage,
	handleAPI
}