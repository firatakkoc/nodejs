// Import modules
var http = require("http");

const routes = require("./routes");

var server = http.createServer(routes);


server.listen(3000, () => {
  console.log("Node.js server is running on port 3000");
});
