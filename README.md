LessonPlanner

Overview

LessonPlanner is a web application designed to help educators efficiently create, organize, and manage lesson plans. Built using modern web technologies, this tool simplifies the planning process, enabling teachers to focus on delivering high-quality education.

Features

User Authentication: Secure login and registration system.

Lesson Management: Create, edit, and delete lesson plans.

Drag-and-Drop Functionality: Easily reorder lessons and tasks.

Real-time Collaboration: Share lesson plans with other educators.

Cloud Storage Integration: Save and retrieve lesson plans from AWS.

Responsive Design: Fully functional across all devices.

Tech Stack

Frontend: Next.js, React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: PostgreSQL with Prisma ORM

Authentication: AWS Cognito

Deployment: AWS (EC2, S3, RDS)

Installation

Prerequisites

Ensure you have the following installed:

Node.js (latest LTS version)

PostgreSQL database

AWS account with Cognito setup

Steps to Run Locally

Clone the repository

git clone https://github.com/SidW111/LessonPlanner.git
cd LessonPlanner

Install dependencies

npm install

Set up environment variables
Create a .env file in the root directory and add the required configurations:

DATABASE_URL=your_postgresql_url
AWS_COGNITO_CLIENT_ID=your_cognito_client_id
AWS_COGNITO_USER_POOL_ID=your_user_pool_id

Run the development server

npm run dev

Access the application
Open http://localhost:3000 in your browser.

Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

How to Contribute

Fork the repository

Create a new branch (feature-name)

Commit your changes

Push to the branch

Open a Pull Request
