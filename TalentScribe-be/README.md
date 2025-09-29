# TalentScribe Backend

This is the Node.js + Express backend for TalentScribe, using MongoDB.

## Features
- Resume upload and parsing
- Job search
- Application automation
- Status tracking

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up MongoDB (local or Atlas) and update `MONGO_URI` in `.env` or use default.
3. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints
- `POST /api/upload` — Upload resume
- `GET /api/jobs` — Search jobs
- `POST /api/apply` — Automate applications
- `GET /api/status` — Get application status
