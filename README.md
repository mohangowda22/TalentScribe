# TalentScribe

TalentScribe is an AI-powered job search and auto-application system designed to streamline the job application process. Built with React for the frontend and Node.js for the backend, this application allows users to upload resumes, search for jobs, and automate the application process.

## Features

- **Resume Uploading**: Users can upload their resumes in PDF or DOCX format, which are then parsed to extract relevant skills and experience.
- **Job Searching**: The application automatically searches for job listings from various sources and displays them to the user.
- **Application Automation**: Users can apply for jobs automatically using their uploaded resume and customized cover letters.
- **Customization Options**: Users can customize their applications with different cover letters, role preferences, and filters such as location, CTC, and remote work options.
- **Status Tracking**: The application provides a status tracking feature to monitor the progress of job applications (applied, pending, interviewed).
- **Responsive Design**: The UI is clean, responsive, and mobile-friendly, ensuring a smooth user experience across devices.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: (Optional) MongoDB or any other preferred database
- **Libraries**: 
  - PDF/DOCX parsing: `pdf-parse`, `mammoth`
  - Web scraping: `axios`, `cheerio`
  - Automation: `puppeteer`
  - State management: `redux` (optional)

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Usage

1. Upload your resume using the Resume Upload component.
2. Search for jobs using the job search feature.
3. Customize your applications and apply for jobs with a single click.
4. Track the status of your applications in real-time.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is open-source and available under the MIT License.