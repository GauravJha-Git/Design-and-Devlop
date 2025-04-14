# Design and Develop Website

This is the repository for the Design and Develop website, a full-stack web application with Node.js backend and static HTML/CSS/JS frontend.

## Project Structure

```
.
├── frontend/          # Frontend static files
│   └── public/        # Public assets and HTML files
├── backend/           # Backend Node.js application
│   ├── routes/        # API routes
│   ├── models/        # Database models
│   └── server.js      # Main server file
├── render.yaml        # Render deployment configuration
└── README.md          # This file
```

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Email**: Nodemailer with Gmail
- **Deployment**: Render

## Deployment Instructions for Render

### Prerequisites
- Render account
- MongoDB Atlas account (free tier is fine)
- Gmail account with app-specific password

### Environment Variables
Create a `.env` file in the backend directory with the following variables:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
PORT=10000
NODE_ENV=production
```

### Deployment Steps

1. Push your code to GitHub
2. Log in to Render
3. Click "New" and select "Blueprint"
4. Connect your GitHub repository
5. Confirm the deployment configuration from render.yaml
6. Add your environment variables:
   - MONGO_URI
   - EMAIL_USER
   - EMAIL_PASS

Render will automatically deploy both the backend service and the static site frontend.

### Checking Deployment Status

1. Backend: Check the health endpoint at `https://your-backend-service.onrender.com/api/health`
2. Frontend: Visit `https://your-frontend-site.onrender.com`

## Local Development

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
python -m http.server 8000 --directory public
```

The frontend will be available at http://localhost:8000 and the backend at http://localhost:10000.

## Contact

For any questions or issues, please contact the development team. 