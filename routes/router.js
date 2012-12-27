
var router = module.exports = function(app) {
  // C - post
  // R - get
  // U - put
  // D - delete

  app.get('/', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({message:"Hello World!"});
  });

};