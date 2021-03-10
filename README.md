# Backend API for Movie App
A Node.js API for saving and getting movies data from MongoDB.
Only authenticated users can **add**, **update** and **delete** a movies. The other routes don't require authentication

Routes:
- user
- movie

## User routes

### > /register

| Route     | Method | Requried Fields             | 
|-----------|:------:|:---------------------------:|
|/register  | POST   | email, username, password   |

Pass within request body:

- **email**
- **username**: Minimum Length 3
- **password**: Password must be at least 8 characters, no more than 15 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.

Payload example:

```
{
    "username":"john",
    "email": "john@gmail.com",
    "password":"#67jhgt@erd"
}
```

Responds with status 200 and a payload containing registered user data.

### > /delete/:id

| Route     | Method | Requried Fields | 
|-----------|:------:|:---------------:|
|/delete/:id| DELETE | id              |

Responds with status 200 and a message confirming user deletion.

### > /login

| Route     | Method | Requried Fields | 
|-----------|:------:|:---------------:| 
|/login     | POST   | email, password |

Responds with status 200 and a message confirming user login.

### > /logout 

| Route     | Method | Requried Fields | 
|-----------|:------:|:---------------:|
|/logout    | POST   | N/A             | 

Responds with status 200 and a message confirming user logout.


## Movie routes

### > /add   

| Route     | Method | Requried Fields                                                   | Notes                 |
|-----------|:------:|:-----------------------------------------------------------------:|:---------------------:|
|/add       | POST   | title, year, runtime, genres, director, actors, plot, posterUrl   |Authentication Required|

Pass within request body:

- **title**: String. Min length 4
- **year**: String indicating the year film was released. Required length 4
- **runtime**: String indicating film duration in minutes. Min length 2; Max length 3
- **genres**: Array of strings.
- **director**: String. Min length 6
- **actors**: String. Min length 6
- **plot**: String. Min length 11
- **posterUrl**: String. Min length 6

Payload example:

```
{
    "title": "Apocalypto",
    "year": "2006",
    "runtime": "139",
    "genres": [
        "Action",
        "Adventure",
        "Drama"
    ],
    "director": "Mel Gibson",
    "actors": "Rudy Youngblood, Dalia Hernández, Jonathan Brewer, Morris Birdyellowhead",
    "plot": "As the Mayan kingdom faces its decline, the rulers insist the key to prosperity is to build more temples and offer human sacrifices. Jaguar Paw, a young man captured for sacrifice, flees to avoid his fate.",
    "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM1NjYyNTY5OV5BMl5BanBnXkFtZTcwMjgwNTMzMQ@@._V1_SX300.jpg"
}
```

Responds with status 200 and a payload containing saved movie data.

### > /get/:title  

| Route      | Method | Requried Fields |
|------------|:------:|:---------------:|
|/get/:title | GET    | title           |

Responds with status 200 and a payload containing movie data requested.

### > /update

| Route  | Method | Requried Fields                          | Notes                 |
|--------|:------:|:----------------------------------------:|:---------------------:|
|/update | PUT    | title, "one or more fields to be updated |Authentication Required|

Responds with status 200 and a payload containing updated movie.

### > /delete:title

| Route        | Method  | Requried Fields | Notes                 |
|--------------|:-------:|:---------------:|:---------------------:|
|/delete/:title | delete | title           |Authentication Required|


Responds with status 200 and a payload containing deleted movie.

### > /all  

| Route | Method | Requried Fields |
|-------|:------:|:---------------:|
|/all   | GET    | N/A             |

Responds with status 200 and a payload containing an array of movie objects.


### > /by-genre/:genre  

| Route           | Method | Requried Fields   |
|-----------------|:------:|:-----------------:|
|/by-genre/:genre | GET    | genre             |

Responds with status 200 and a payload containing an array of movie objects that match the requested genre.

### > /by-title/:titleString 

| Route           | Method | Requried Fields   |
|-----------------|:------:|:-----------------:|
|/by-genre/:genre | GET    | titleString       |

Responds with status 200 and a payload containing an array of movie objects with a title that contains the requested titleString.
