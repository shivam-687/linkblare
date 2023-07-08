import * as cheerio from 'cheerio';

export async function getLinkInfo(url: string){
    const res = await fetch(url, {
        headers: {'Access-Control-Allow-Origin': '*'}
    });
    const htmlStr = await res.text();
    const $ = cheerio.load(htmlStr);
    console.log(htmlStr);
}