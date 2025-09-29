import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Scrape Google Jobs using a search term and location.
 * Returns an array of job objects: { title, company, location, url, datePosted, description }
 */
export async function scrapeGoogleJobs({ searchTerm, location, resultsWanted = 10 }) {
  // Build Google search query
  let query = `${searchTerm} jobs`;
  if (location) query += ` near ${location}`;
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  // Google blocks bots, so set a browser-like User-Agent
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
  };

  const jobs = [];
  try {
    const { data: html } = await axios.get(url, { headers });
    const $ = cheerio.load(html);
    // Google Jobs are in .BjJfJf (job card)
    $('.ZNyqGc').each((i, el) => {
      if (i >= resultsWanted) return false;
      const jobTitle = $(el).find('.PUpOsf').text().trim();
      const company = $(el).find('.MKCbgd').first().text().trim();
      const location = $(el).find('.FqK3wc').text().trim();
      const jobLink = $(el).find('a.MQUd2b').attr('href') || '';
      const datePosted = $(el).find('.pMhGee').text().trim();
      const description = $(el).find('.HBvzbc').text().trim();
      jobs.push({ title: jobTitle, company, location, url: jobLink, datePosted, description });
    });
  } catch (err) {
    console.error('[ERROR] Google Jobs scraping failed:', err.message);
  }
  return jobs;
}
