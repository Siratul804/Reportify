# Reportify

### Setup .env

```
MONGO_PASS=0TGpmCXGFVb1S9DJ
MONGO=mongodb+srv://23201128:0TGpmCXGFVb1S9DJ@reportify.qztzb.mongodb.net/?retryWrites=true&w=majority&appName=Reportify
ACCESS_TOKEN_SECRET=reportify
REFRESH_TOKEN_SECRET=hackathon
JWT_SECRET=reportify123
EMAIL_USER=
EMAIL_PASS=
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
  "message": "User registered successfully.",
  "user_id": "67aaf172ac934afba76f9b59",
  "status": "success"
}
```

### User Login

- **Route**: `http://localhost:3000/api/login`
- **Method**: POST
- **Body** :

```bash
{
  "email": "23201106@uap-bd.edu",
  "password": "23201106"

}
```

- **Sample Response**:

```json
{
  "message": "Logged in successfully!",
  "user_id": "67ab1293607a99dd433aeffc",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdhYjEyOTM2MDdhOTlkZDQzM2FlZmZjIiwiZW1haWwiOiIyMzIwMTEwNkB1YXAtYmQuZWR1IiwiaWF0IjoxNzM5MjY0Njc0LCJleHAiOjE3Mzk4Njk0NzR9.dB6M-XcudkA9d0HWa0ZL4U_oJTe03IQMfM_8htPShd0",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdhYjEyOTM2MDdhOTlkZDQzM2FlZmZjIiwiaWF0IjoxNzM5MjY0Njc0LCJleHAiOjE3NDE4NTY2NzR9.fmpT__OxoPSq1YXir45IUzY83W-tag8ZbLZ4ReYOD1Y",
  "expiredAt": "2025-02-18T09:04:34.374Z",
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

### Change Password

- **Route**: `http://localhost:3000/api/change-password`
- **Method**: POST
- **Body** :

```bash
{
  "current_password": "23201128",
  "new_password": "23201106"
}

```

- **Sample Response**:

```json
{
  "status": "success",
  "message": "Password updated successfully"
}
```

### Admin Ban User

- **Route**: `http://localhost:3000/api/admin/ban-user`
- **Method**: POST
- **Body** :

- **Headers**:
```bash
Authorization: Bearer <admin_access_token>
```

```bash
  {
  "user_id": "67aad11c707c852704e01996"
}

```

- **Sample Response**:

```json
{
  "status": "success",
  "message": "User has been banned successfully."
}
```
