import Resume from '../models/Resume.js';
import multer from 'multer';
import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import mammoth from 'mammoth';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
export const upload = multer({ storage });

export const uploadResume = async (req, res) => {
  try {
    const file = req.file;
    console.log('[INFO] Resume upload request received:', file?.originalname);
    let parsedText = '';
    if (file) {
      const filePath = `uploads/${file.filename}`;
      if (!fs.existsSync(filePath)) {
        throw new Error(`Resume file not found at path: ${filePath}`);
      }
      if (file.mimetype === 'application/pdf') {
        try {
          const dataBuffer = fs.readFileSync(filePath);
          // pdfjs-dist expects Uint8Array, not Buffer
          const uint8Array = new Uint8Array(dataBuffer);
          const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
          const pdfDocument = await loadingTask.promise;
          let textContent = '';
          for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum);
            const content = await page.getTextContent();
            textContent += content.items.map(item => item.str).join(' ') + '\n';
          }
          parsedText = textContent;
        } catch (pdfErr) {
          console.error('[ERROR] PDF parsing failed:', pdfErr.message);
          parsedText = '[PDF parsing failed]';
        }
      } else if (
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/msword'
      ) {
        const docData = await mammoth.extractRawText({ path: filePath });
        parsedText = docData.value;
      } else {
        parsedText = '[Unsupported file type]';
      }
    }
    // Basic skill extraction (example: extract words like 'JavaScript', 'Python', etc.)
      // Expanded skill extraction
      const skillKeywords = [
        'javascript', 'typescript', 'python', 'node', 'react', 'angular', 'vue', 'mongodb', 'express', 'java', 'c++', 'c#', 'sql', 'mysql', 'postgres', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'graphql', 'rest', 'sass', 'less', 'html', 'css', 'git', 'jenkins', 'linux', 'unix', 'bash', 'shell', 'redis', 'rabbitmq', 'spring', 'flask', 'django', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'keras', 'matplotlib', 'powerbi', 'tableau', 'jira', 'confluence', 'agile', 'scrum', 'webpack', 'babel', 'nextjs', 'nestjs', 'fastapi', 'elasticsearch', 'firebase', 'heroku', 'netlify', 'vercel', 'php', 'go', 'rust', 'swift', 'objective-c', 'perl', 'ruby', 'scala', 'hadoop', 'spark', 'hive', 'bigquery', 'snowflake', 'airflow', 'terraform', 'ansible', 'puppet', 'chef', 'salesforce', 'servicenow', 'sap', 'oracle', 'pl/sql', 'r', 'matlab', 'sas', 'statistical analysis', 'machine learning', 'deep learning', 'nlp', 'data science', 'data engineering', 'devops', 'cloud', 'microservices', 'restful', 'api', 'test automation', 'selenium', 'cypress', 'playwright', 'appium', 'jira', 'confluence', 'figma', 'adobe xd', 'photoshop', 'illustrator', 'invision', 'ux', 'ui', 'product management', 'project management', 'leadership', 'communication', 'problem solving', 'teamwork', 'collaboration', 'presentation', 'public speaking', 'negotiation', 'conflict resolution', 'time management', 'critical thinking', 'creativity', 'adaptability', 'organization', 'attention to detail', 'customer service', 'sales', 'marketing', 'business analysis', 'financial analysis', 'accounting', 'excel', 'powerpoint', 'word', 'outlook', 'office', 'google workspace', 'slack', 'zoom', 'teams', 'trello', 'asana', 'notion', 'monday', 'clickup', 'github', 'gitlab', 'bitbucket', 'svn', 'mercurial', 'jira', 'confluence'
      ];
      // Normalize resume text
      const normalizedText = parsedText.toLowerCase();
      // Extract skills
      const skills = Array.from(new Set(skillKeywords.filter(skill => normalizedText.includes(skill))));
    const resume = new Resume({
      filename: file.filename,
      originalname: file.originalname,
      parsedData: {
        text: parsedText,
        skills,
      },
    });
    await resume.save();
    console.log('[DEBUG] Resume saved to DB:', resume._id);

    // Async job scraping and socket notification
    import('../utils/scrapeJobs.js').then(async ({ scrapeJobs }) => {
      const jobs = await scrapeJobs(skills);
      if (jobs.length) {
        const { getIO } = await import('../socket.js');
        getIO().emit('jobsUpdated', jobs);
      }
    });

    res.status(201).json({ message: 'Resume uploaded', resume });
  } catch (err) {
    console.error('[ERROR] Resume upload failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};
