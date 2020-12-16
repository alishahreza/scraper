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

let allData = [];
async function germanyMain() {
	const spiegel = filterasion('.spiegel.de');
	if (spiegel) {
		const spiegelData = await spiegelScraper(spiegel);
		allData.push(spiegelData);
	}

	const cicero = filterasion('.cicero.de');
	if (cicero) {
		const ciceroData = await ciceroScraper(cicero);
		allData.push(ciceroData);
	}

	const bild = filterasion('.bild.de');
	if (bild) {
		const bildData = await bildScraper(bild);
		allData.push(bildData);
	}

	const tichy = filterasion('.tichyseinblick.de');
	if (tichy) {
		const tichyData = await tichyseinblickScrapper(tichy);
		allData.push(tichyData);
	}

	const junge = filterasion('jungefreiheit.de');
	if (junge) {
		const jungeData = await jungefreiheitScrapper(junge);
		allData.push(jungeData);
	}

	const welt = filterasion('.welt.de');
	if (welt) {
		const weltData = await weltScrapper(welt);
		allData.push(weltData);
	}

	const stern = filterasion('.stern.de');
	if (stern) {
		const sternData = await sternScrapper(stern);
		allData.push(sternData);
	}

	const tages = filterasion('.tagesschau.de');
	if (tages) {
		const tagesData = await tagesschauScrapper(tages);
		allData.push(tagesData);
	}

	const handel = filterasion('.handelsblatt.com');
	if (handel) {
		const handelData = await handelsblattScrapper(handel);
		allData.push(handelData);
	}

	const allgeme = filterasion('.allgemeine-zeitung.de');
	if (allgeme) {
		const allgemeData = await allgemeineScrapper(allgeme);
		allData.push(allgemeData);
	}

	const cnn = filterasion('us.cnn.com');
	if (cnn) {
		const cnnData = await cnnScraper(cnn);
		allData.push(cnnData);
	}

	const huffpost = filterasion('huffpost.com');
	if (huffpost) {
		const huffpostData = await huffpostScraper(huffpost);
		allData.push(huffpostData);
	}

	const fox = filterasion('foxnews.com');
	if (fox) {
		const foxData = await foxScraper(fox);
		allData.push(foxData);
	}

	const npr = filterasion('npr.org');
	if (npr) {
		const nprData = await nprScraper(npr);
		allData.push(nprData);
	}

	const abc = filterasion('abcnews.go.com');
	if (abc) {
		const abcData = await abcnewsScraper(abc);
		allData.push(abcData);
	}

	const nbc = filterasion('nbcnews.com');
	if (nbc) {
		const nbcData = await nbcnewsScraper(nbc);
		allData.push(nbcData);
	}

	const cbs = filterasion('cbsnews.com');
	if (cbs) {
		const cbsData = await cbsnewsScraper(cbs);
		allData.push(cbsData);
	}

	const usatoday = filterasion('usatoday.com');
	if (usatoday) {
		const usatodayData = await usatodayScraper(usatoday);
		allData.push(usatodayData);
	}

	const politico = filterasion('politico.com');
	if (politico) {
		const politicoData = await politicoScraper(politico);
		allData.push(politicoData);
	}

	const breitbart = filterasion('breitbart.com');
	if (breitbart) {
		const breitbartData = await breitbartScraper(breitbart);
		allData.push(breitbartData);
	}

	const nypost = filterasion('nypost.com');
	if (nypost) {
		const nypostData = await nypostScraper(nypost);
		allData.push(nypostData);
	}

	const yahoo = filterasion('yahoo.com');
	if (yahoo) {
		const yahooData = await yahooScraper(yahoo);
		allData.push(yahooData);
	}

	const reuter = filterasion('reuters.com');
	if (reuter) {
		const reuterData = await reutersScraper(reuter);
		allData.push(reuterData);
	}
	await fs.writeFileSync(
		'data.json',
		JSON.stringify(allData),
		{ flag: 'a' },
		() => console.log('Done')
	);
}
germanyMain();
