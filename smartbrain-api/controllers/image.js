const Clarifai = require('clarifai')
const app = new Clarifai.App({
 apiKey: 'd70729ff88e6452b90a462d7eccf94ed'
});

const handleApiCall = (req, res) => {
app.models.predict(Clarifai.FOOD_MODEL, req.body.input)
.then(data=> {
	res.json(data);
})
.catch(err => res.status(400).json('unable to work with api'))

}

const handleImage = (req,res,db) => {
	const { id } = req.body;
	
db('users').where({ id: id })
  .increment('entries',1)
  .returning('entries')
  .then(entries => {
  	res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get the entries'))

};


module.exports = {
	handleImage: handleImage, 
	handleApiCall: handleApiCall
}