<h1 align="center"> Modern_Blog </h1>

## General info
The goal of this project is to build a website to create and display articles.<br>
In this project, we have two single page applications that are made with reactjs.<br>
The main page of the site is located in the reactjs directory and admin page in reactjs-admin directory and the server is located in the express directory.
	
---  

## Technologies
Project is created with:
* Express version: ~4.16.1
* Express-formidable version: ^1.2.0
* express-session version: ^1.17.1
* mongoose version: ^5.12.1
* bcrypt version: ^5.0.1
* cookie-parser version: ~1.4.4
* mv version: ^2.1.1
* validator version: ^13.5.2
* react version: ^17.0.1
* antd version: ^4.14.0
* axios version: ^0.21.1
* redux version: ^4.0.5
* react-froala-wysiwyg version: ^3.2.6-1
* froala-editor version: ^3.2.6-1
* react-phone-input-2 version: ^2.13.9
* react-avatar-editor version: ^11.1.0
* react-router-dom version: ^5.2.0
* react-dropzone version: ^11.3.2
* material-ui

---

# Installation
```bash
npm run install
```

---

## Usage
```bash
npm run start
```
After running the project, you must first create an admin. To do this, you must send a post request with body in the form below to "localhost:8080/auth/createAdmin".
```json
{
	"username": "admin",
	"firstName": "adminFirstName",
	"lastName": "adminLastName",
	"password": "0000000000",
	"gender": "man",
	"mobileNumber": "989999999999"
}
```
After sending this request, this url only gives 404 error in response to requests.

---

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License
© MohammadReza Mirzade
Licensed under the  [GNU GPLv3](LICENSE)
