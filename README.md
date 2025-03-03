# Reportify - Crime Reporting Platform with Fake Detection (Backend)

> Created by Team The Mavericks for NSU WebXtreme Hackathon

## 🚀 Features

*   **Crime Report Submission:** Users can post images of crimes, and the platform will generate a description using AI.
*   **Fake Report Detection:** AI algorithms predict the likelihood of a report being fake.
*   **Secure Authentication:**  Authentication is implemented using refresh and access tokens.
*   **Community Moderation:** Users can comment on images to dispute potentially false reports.


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
- **Headers**:

```bash
Authorization: Bearer <admin_access_token>
```

- **Body** :

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

### Send OTP

- **Route**: `http://localhost:3000/api/send-otp`
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
  "message": "OTP sent successfully."
}
```

### Verify User

- **Route**: `http://localhost:3000/api/verify-otp`
- **Method**: POST
- **Body** :

```bash
{
    "otp":"793084",
    "email_or_phone": "23201128@uap-bd.edu"
}
```

- **Sample Response**:

```json
{
  "status": "success",
  "message": "OTP verified successfully! User verified."
}
```

### Ai Desc

- **Route**: `http://localhost:3000/api/ai-des`
- **Method**: POST
- **Body** :

```bash

/ui/AiTest.jsx

```

- **Sample Response**:

```json
{
  "aiResponse": "In a shocking display of brazen thievery, a sly thief was caught on camera snatching a unsuspecting woman's purse, leaving her stunned and helpless on the sidewalk. The swift and silent strike occurred in broad daylight, raising concerns about the safety of pedestrians in the area. Witnesses describe the thief as a quick and agile individual who vanished into the crowd, purse in hand."
}
```

### Report Crime

- **Route**: `http://localhost:3000/api/report-crime`
- **Method**: POST
- **Body** :

```bash

{
  "title": "Robbery at Market Street",
  "description": "A robbery occurred at Market Street around 10 PM.",
  "division": "North",
  "district": "Downtown",
  "crime_time": "2025-02-10T22:00:00Z",
  "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUUFBgVFRUZGRgaGxoYGxsaGBoaGBoaGhgbGxobGxsbIS0kGyEqHxoaJTklKi4xNTQ0GiM6Pzo0Pi0zNDEBCwsLEA8QHxISHzMqIyszMzMz......",
  "video": "https://example.com/video.mp4"
}


```

- **Sample Response**:

```json
{
  "crime_id": "67ab7f798cb221338b583e2a",
  "savedReport": {
    "title": "Robbery at Market Street",
    "description": "A robbery occurred at Market Street around 10 PM.",
    "division": "North",
    "district": "Downtown",
    "crime_time": "2025-02-10T22:00:00.000Z",
    "image": "https://res.cloudinary.com/siratul/image/upload/v1739292535/Reportify/crime_report_1739292533841.jpg",
    "video": "https://example.com/video.mp4",
    "user_id": "67ab37c13e9603fb1c94134b",
    "upvotes": 0,
    "downvotes": 0,
    "verification_score": 0,
    "comments": [],
    "_id": "67ab7f798cb221338b583e2a",
    "post_time": "2025-02-11T16:48:57.097Z",
    "__v": 0
  },
  "status": "success",
  "message": "Crime report submitted successfully!"
}
```


## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.6
- **Database**: MongoDB with Mongoose
- **AI Models** : Grok, Huggingface
- **Media Management** : Cloudinary

## 🚦 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/Siratul804/Reportify.git
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file with the following variables:

```env

# mongodb database
MONGO_PASS=
MONGO=

# tokens
ACCESS_TOKEN_SECRET=reportify
REFRESH_TOKEN_SECRET=hackathon
JWT_SECRET=reportify123

# email ifos
EMAIL_USER=
EMAIL_PASS=

# AI Models
GROQ_API_KEY=
HF_API_KEY=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=siratul
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=



NEXT_PUBLIC_API_URL=http://localhost:3000/api

```

4. **Run the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📜 License

This project is licensed under the MIT License.

---
Created by Team The Mavericks for NSU WebXtreme Hackathon

