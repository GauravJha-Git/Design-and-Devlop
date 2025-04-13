# Design and Develop Website

This is the repository for the Design and Develop website, including both frontend and backend components.

## Project Structure

```
.
├── frontend/           # Frontend static files
│   └── public/        # Public assets and HTML files
├── backend/           # Backend Flask application
│   ├── routes/        # API routes
│   ├── models/        # Database models
│   └── utils/         # Utility functions
├── render.yaml        # Render deployment configuration
└── README.md          # This file
```

## Deployment Instructions

### Prerequisites
- Render account
- MongoDB database
- Gmail account for email service

### Environment Variables
Create a `.env` file in the backend directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
PORT=10000
```

### Deployment Steps

1. Push your code to a GitHub repository
2. Connect your repository to Render
3. Set up the following environment variables in Render:
   - MONGO_URI
   - EMAIL_USER
   - EMAIL_PASS
4. Deploy both services:
   - Backend (Python service)
   - Frontend (Static site)

### Health Check
The backend service includes a health check endpoint at `/api/health` that returns a 200 status when the service is running correctly.

## Development

### Local Setup
1. Install Python dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. Start the backend server:
   ```bash
   python app.py
   ```

3. Serve the frontend:
   ```bash
   cd frontend/public
   python -m http.server 8000
   ```

## Contact

For any questions or issues, please contact the development team. 