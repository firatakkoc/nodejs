var fs = require("fs");
const routeHandler = (request, response) => {
  
  if(request.url === "/") {
    fs.readFile("index.html", (error, html) => {
      if(error) {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not Found");
        response.end();
      } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
      }
    });
  }
  else if (request.url === "/blog") {
    fs.readFile("blog.html", (error, html) => {
      if(error) {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not Found");
        response.end();
      } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
      }
    });
  }
  else if (request.url === "/create" && request.method == "POST") {
    const data = [];
    request.on("data", (chunk) => {
      data.push(chunk);
    });

    request.on("end", () => {
      const result = Buffer.concat(data).toString();
      const parsedDate = result.split("=")[1];
      console.log(parsedDate);

      fs.appendFile("blogs.txt", parsedDate, (err) => { 
        if(err) {
          console.log(err);
        }
        else {
          response.statusCode = 302;
          response.setHeader("Location", "/")
          response.end();
        }
  
      })
    })

    
  }
  else if (request.url === "/create") {
    fs.readFile("create.html", (error, html) => {
      if(error) {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("404 Not Found");
        response.end();
      } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
      }
    });
  }
  
  else {
    fs.readFile("404.html", (error, html) => {
      // Hata olması durumunda sunucu hata mesajı verecek
      if(error) {
        response.writeHead(500, {"Content-Type": "text/html"});
        response.write("500 Internal Server Error");
      } else {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write(html);
      }
      response.end();
    });
  }
  
}

module.exports = routeHandler;