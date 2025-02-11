# Reportify

### Setup .env

```
MONGO_PASS=0TGpmCXGFVb1S9DJ
MONGO=mongodb+srv://23201128:0TGpmCXGFVb1S9DJ@reportify.qztzb.mongodb.net/?retryWrites=true&w=majority&appName=Reportify
ACCESS_TOKEN_SECRET=reportify
REFRESH_TOKEN_SECRET=hackathon
```

## API Documentation

### User Registration

- **Route**: `http://localhost:3000/api/register`
- **Method**: POST
- **Body** :

```bash
{
    "email": "23201128@uap-bd.edu",
    "password": "23201128",
    "phone": "01756187125"
}
```

- **Sample Response**:

```json
{
  "message": "User registered.",
  "user_id": "67aad11c707c852704e01996"
}
```

### User Login

- **Route**: `http://localhost:3000/api/login`
- **Method**: POST
- **Body** :

```bash
{

  "email": "23201128@uap-bd.edu",
  "password": "23201128"

}
```

- **Sample Response**:

```json
{
  "message": "Logged in successfully!",
  "user_id": "67aad11c707c852704e01996",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdhYWQxMWM3MDdjODUyNzA0ZTAxOTk2IiwiZW1haWwiOiIyMzIwMTEyOEB1YXAtYmQuZWR1IiwiaWF0IjoxNzM5MjUzNTY4LCJleHAiOjE3Mzk4NTgzNjh9.3FtDHa-T9pzQmzti_6CzScQylowyzdaBOmX0PgCP4rM",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdhYWQxMWM3MDdjODUyNzA0ZTAxOTk2IiwiaWF0IjoxNzM5MjUzNTY4LCJleHAiOjE3NDE4NDU1Njh9.0V1HDBqAtAd1b3ZXVPFNU0Y2B_gdGRMPkZST58jpydA",
  "status": "success"
}
```

### Generate New Access Token

- **Route**: `http://localhost:3000/api/refresh-token`
- **Method**: POST
- **Body** :

```bash
{

  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdhYWQxMWM3MDdjODUyNzA0ZTAxOTk2IiwiaWF0IjoxNzM5MjUzNTY4LCJleHAiOjE3NDE4NDU1Njh9.0V1HDBqAtAd1b3ZXVPFNU0Y2B_gdGRMPkZST58jpydA"

}
```

- **Sample Response**:

```json
{
  "message": "New access token generated successfully!",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdhYWQxMWM3MDdjODUyNzA0ZTAxOTk2IiwiaWF0IjoxNzM5MjU1NDI5LCJleHAiOjE3Mzk4NjAyMjl9.j8v_97IFe4ar2tzsKMzYuLD960UNlg-plpYiIpwPV4Y",
  "status": "success"
}
```

### Forgot Password

- **Route**: `http://localhost:3000/api/forgot-password`
- **Method**: POST
- **Body** :

```bash
{
    "email_or_phone": "23201128@uap-bd.edu"
}
```

- **Sample Response**:

```json
{
  "status": "success",
  "message": "Password reset link sent to your email."
}
```
