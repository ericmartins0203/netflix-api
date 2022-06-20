# Netflix API

## Documentação

http://localhost:3000/api-docs/



## User 

### Post /user

Route to create user.


Input 

```json
{
	"email": "John@mail.com",
	"password": "123456"
}
```

Output(201 - Created)

```json
{
  "id": "c685f321-b330-4edd-a908-adbd5bb2c18d",
  "email": "eric2@mail.com"
}
```

### Post /auth

Route to login user.


Input 

```json
{
	"email": "John@mail.com",
	"password": "123456"
}
```

Output(200 - Ok)

token


### Get /me

Route to receive user info, need Bearer Token .


Input 


Output(200 - OK)

```json
{
  "id": "c685f321-b330-4edd-a908-adbd5bb2c18d",
  "email": "eric2@mail.com"
}
```


## Shows 

### Post /shows

Route to create show, need Bearer Token.


Input 

```json
{
	"title":"Spider-Man: No Way Home",
	"director": "Jon Watts",
	"actors":"Tom Holland",
	"description":"Spider man",
	"cover":"www.google.com",
	"category":"MOVIE"
}
```

Output(201 - Created)

```json
{
  "title": "Spider-Man: No Way Home",
  "director": "Jon Watts",
  "actors": "Tom Holland",
  "description": "Spider man",
  "cover": "www.google.com",
  "category": "MOVIE",
  "id": 5
}
```

### Get /shows

Route to get all shows, need Bearer Token.


Input 


Output(200 - Ok)

```json
[
  {
    "id": 5,
    "title": "Spider-Man: No Way Home",
    "director": "Jon Watts",
    "actors": "Tom Holland",
    "description": "Spider man",
    "cover": "www.google.com",
    "category": "MOVIE",
    "episodes": []
  }
]
```


### Get /shows/:id

Route to get show by id, need Bearer Token.


Input 

Output(200 - Ok)

```json
[
  {
    "id": 5,
    "title": "Spider-Man: No Way Home",
    "director": "Jon Watts",
    "actors": "Tom Holland",
    "description": "Spider man",
    "cover": "www.google.com",
    "category": "MOVIE",
    "episodes": []
  }
]
```


### Delete /shows/:id

Route to delete show by id, need Bearer Token.


Input 

Output(200 - Ok)

```json
{
  "raw": [],
  "affected": 1
}
```


### Get /shows/:id/episodes

Route to get the episodes of a show, need Bearer Token.


Input 

Output(200 - Ok)

```json
[
  {
    "id": 1,
    "title": "first episode",
    "description": "A good day",
    "cover": "www.google.com",
    "duration": 30
  }
]
```


## Episodes 

### Post /episodes

Route to create episode, need bearer token.


Input 

```json
{
	"id": 1,
  "title": "first episode",
  "description": "A good day",
  "cover": "www.google.com",
  "duration": 30,
	"showId": 1
}
```

Output(200 - OK)

```json
{
  "createEpisode": {
    "id": 1,
    "title": "first episode",
    "description": "A good day",
    "cover": "www.google.com",
    "duration": 30,
    "showId": 1
  }
}
```

## List 

### Get /list

Route to get user list, need bearer token.


Input 



Output(201 - Created)

```json
[
  {
    "id": 5,
    "title": "Spider-Man: No Way Home",
    "director": "Jon Watts",
    "actors": "Tom Holland",
    "description": "Spider man",
    "cover": "www.google.com",
    "category": "MOVIE",
    "episodes": []
  }
]
```

### Post /list/:id

Route to add a show to user list, need bearer token.


Input 


Output(200 - Ok)

```json
[
  {
    "id": 5,
    "title": "Spider-Man: No Way Home",
    "director": "Jon Watts",
    "actors": "Tom Holland",
    "description": "Spider man",
    "cover": "www.google.com",
    "category": "MOVIE",
    "episodes": []
  }
]
```


### Delete /list

Route to remove show from user list, need Bearer Token .


Input 


Output(204 - No content)


