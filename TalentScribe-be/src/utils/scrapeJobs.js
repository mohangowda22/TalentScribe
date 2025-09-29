import axios from 'axios';
import * as cheerio from 'cheerio';



export async function scrapeJobs(skills, location = '', resultsWanted = 10) {
  const allJobs = [];
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
  };
  for (const skill of skills) {
    let query = `${skill} jobs`;
    if (location) query += ` near ${location}`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    try {
      const { data: html } = await axios.get(url, { headers });
      const $ = cheerio.load(html);
      const jobCards = $('.ZNyqGc');
      console.log(`[DEBUG] Google HTML length for skill '${skill}':`, html.length);
      console.log(`[DEBUG] Google .BjJfJf selector matches for skill '${skill}':`, jobCards.length);
      if (jobCards.length === 0) {
        // Optionally log a snippet of the HTML for inspection
        console.log('[DEBUG] Google HTML snippet:', html.slice(0, 1000));
      }
      jobCards.each((i, el) => {
        if (i >= resultsWanted) return false;
        const jobTitle = $(el).find('.PUpOsf').text().trim();
        const company = $(el).find('.MKCbgd').first().text().trim();
        const jobLocation = $(el).find('.FqK3wc').text().trim();
        const jobLink = $(el).find('a.MQUd2b').attr('href') || '';
        const datePosted = $(el).find('.pMhGee').text().trim();
        const description = $(el).find('.HBvzbc').text().trim();
        allJobs.push({ title: jobTitle, company, location: jobLocation, url: jobLink, datePosted, description, skill });
      });
    } catch (err) {
      console.error(`[ERROR] Google Jobs scraping failed for skill ${skill}:`, err.message);
    }
  }
  if (allJobs.length) {
    try {
      const result = await Job.insertMany(allJobs);
      console.log(`[INFO] Total jobs saved to DB: ${result.length}`);
      if (result.length) {
        console.log('[DEBUG] Inserted job IDs:', result.map(j => j._id));
      }
    } catch (dbErr) {
      console.error('[ERROR] Failed to insert jobs into DB:', dbErr);
    }
  } else {
    console.log('[INFO] No jobs found to save.');
  }
  return allJobs;
}
