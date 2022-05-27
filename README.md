create db users table auto create in first run
if error check folder mydb import in mysql(use Xampp or else) file .sql

In the project directory, you can run:

### `node index.js`

app run in url

http://localhost:8003/api/signup
with postman body raw json
{
    "username" : "hendy",
    "email": "hendyn25@gmail.com",
    "fullname": "hendy nurfrianto",
    "password": "Hendyjawa25?"
}

http://localhost:8003/api/signin
with postman body raw json
{
    "username" : "Hendy",
    "password": "Hendyjawa25?"
}

http://localhost:8003/api/forgotpass
with postman body raw json
{
    "username" : "Hendy",
    "email": "hendyn25@gmail.com"
}

http://localhost:8003/api/updatepassDb
with postman body raw json
{
    "username" : "Hendy",
    "password": "Hendyjawa25?"
}

before run must install 

### `npm i`