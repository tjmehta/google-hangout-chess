
var router = module.exports = function(app) {
  // C - post
  // R - get
  // U - put
  // D - delete

  app.get('/', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({message:"Hello World!"});
  });

  app.get('/app.xml', function(req, res) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.setHeader('Content-Type', 'text/html');
    res.render('app.xml');
  });
};