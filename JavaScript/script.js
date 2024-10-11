
/*
const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

/*const { createServer } = require('node:http');
const fs = require('fs').promises;

const requestListener = function (req, res) {
    fs.readFile(javascript + "/template.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
};
*/
const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'items.json');
const port = 3000;


            const data = fs.readFileSync('items.json', 'utf-8');
            const items = JSON.parse(data);

const getItem = () => {

    const data = fs.readFileSync('items.json', 'utf8');
    return JSON.parse(data);
};

const saveItem = (item) => {
    fs.writeFileSync(filePath, JSON.stringify(item, null, 2));
};

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (url === '/item' && method === 'GET') {
        const item = getItem();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(item));

    }
    else if (req.url === '/item' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
    
        req.on('end', () => {
            const updatedData = JSON.parse(body);
    

            items.push(updatedData);
    
           
            fs.writeFileSync('items.json', JSON.stringify(items, null, 2));
    
       
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedData));
        });
    }
    
         else if (url === '/item' && method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const updatedData = JSON.parse(body);

          
            const item = getItem();

           
            item.name = updatedData.name || item.name;
            item.surname = updatedData.surname || item.surname;
            item["id-no"] = updatedData["id-no"] || item["id-no"];

            saveItem(item); 

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(item));
        });

   
    } else if (url === '/item' && method === 'DELETE') {
        const defaultItem = {
            name: "",
            surname: "",
            "id-no": ""
        };
        
        saveItem(defaultItem); 

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Item reset' }));

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/item`);
});
