const fs = require('fs');
const {
	cnnScraper,
	huffpostScraper,
	foxScraper,
	usatodayScraper,
	politicoScraper,
	nprScraper,
	breitbartScraper,
	nypostScraper,
	abcnewsScraper,
	nbcnewsScraper,
	cbsnewsScraper,
	yahooScraper,
	reutersScraper,
} = require('./functions');

const {
	spiegelScraper,
	ciceroScraper,
	bildScraper,
	tichyseinblickScrapper,
	jungefreiheitScrapper,
	weltScrapper,
	sternScrapper,
	tagesschauScrapper,
	handelsblattScrapper,
	allgemeineScrapper,
} = require('./germany');

const text = fs.readFileSync('./test.csv', 'utf-8');
let urlsArray = text.split('\n');
urlsArray = urlsArray.map((url) => url.trim());

const filterasion = (sign) => {
	return urlsArray.filter((a) => a.includes(sign));
};

async function germanyMain() {
	const spiegel = filterasion('.spiegel.de');
	spiegel && (await spiegelScraper(spiegel));

	const cicero = filterasion('.cicero.de');
	cicero && (await ciceroScraper(cicero));

	const bild = filterasion('.bild.de');
	bild && (await bildScraper(bild));

	const tichy = filterasion('.tichyseinblick.de');
	tichy && (await tichyseinblickScrapper(tichy)); ////

	const junge = filterasion('jungefreiheit.de');
	junge && (await jungefreiheitScrapper(junge));

	const welt = filterasion('.welt.de');
	welt && (await weltScrapper(welt));

	const stern = filterasion('.stern.de');
	stern && (await sternScrapper(stern));

	const tages = filterasion('.tagesschau.de');
	// tages && (await tagesschauScrapper(tages));

	const handel = filterasion('.handelsblatt.com');
	handel && (await handelsblattScrapper(handel));

	const allgeme = filterasion('.allgemeine-zeitung.de');
	allgeme && (await allgemeineScrapper(allgeme));
}
germanyMain();

async function englishMain() {
	const cnn = filterasion('us.cnn.com');
	cnn && (await cnnScraper(cnn));
	const huffpost = filterasion('huffpost.com');
	huffpost && (await huffpostScraper(huffpost));
	const fox = filterasion('foxnews.com');
	fox && (await foxScraper(fox));
	const usatoday = filterasion('usatoday.com');
	usatoday && (await usatodayScraper(usatoday));
	const politico = filterasion('politico.com');
	politico && (await politicoScraper(politico));
	const npr = filterasion('npr.org');
	npr && (await nprScraper(npr));
	const breitbart = filterasion('breitbart.com');
	breitbart && (await breitbartScraper(breitbart));
	const nypost = filterasion('nypost.com');
	nypost && (await nypostScraper(nypost));
	const abc = filterasion('abcnews.go.com');
	abc && (await abcnewsScraper(abc));
	const nbc = filterasion('nbcnews.com');
	nbc && (await nbcnewsScraper(nbc));
	const cbs = filterasion('cbsnews.com');
	cbs && (await cbsnewsScraper(cbs));
	const yahoo = filterasion('yahoo.com');
	yahoo && (await yahooScraper(yahoo));
	const reuter = filterasion('reuters.com');
	reuter && (await reutersScraper(reuter));
}
// englishMain();
