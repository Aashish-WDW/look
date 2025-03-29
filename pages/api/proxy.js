import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { tourUrl } = req.query;

  if (!tourUrl) {
    return res.status(400).json({ error: 'Tour URL is required' });
  }

  try {
    const response = await axios.get(tourUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    $('script').remove();

    res.setHeader('Content-Type', 'text/html');
    res.send($.html());
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch tour', details: error.message });
  }
}
