const scraperObject = {

    //url: 'https://www.idealista.com/alquiler-viviendas/madrid/zona-sur/con-precio-hasta_750,de-dos-dormitorios,de-tres-dormitorios,de-cuatro-cinco-habitaciones-o-mas,ascensor,garaje/?ordenado-por=precios-asc',
    url: 'https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html',

    async scraper(browser) {
        let page = await browser.newPage();

        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            });
            //   delete navigator.__proto__.webdriver;

        });

        // // set user agent (override the default headless User Agent)
        // await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');


        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        // Wait for the required DOM to be rendered
        await page.waitForSelector('.container');

        // Get the link to all the required listing
        let urls = await page.$$eval('article.item.item-multimedia-container:not(.item-featured)', links => {

            // Extract the links from the data
            links = links.map(el => el.querySelector('a.item-link').href)
            return links;
        });
        console.log(urls);
        console.log(urls.lenght);
    }
}
module.exports = scraperObject;