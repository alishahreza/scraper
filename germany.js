const axios = require('axios');
const cheerio = require('cheerio');

exports.spiegelScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);

				const title = $('div > h2 >').children().last().text();

				const published = new Date(
					$('header').find('div.font-sansUI time').attr('datetime')
				).toDateString();

				$('header > div > div >').find('.hidden').remove();
				let author = $('header')
					.find('div.font-sansUI  a')
					.map((index, element) => {
						return $(element).attr('title');
					})
					.get();
				author = author.join(',');
				!author && (author = 'No Author');

				$('section.relative').find('aside').remove();
				const script = $('section.relative').find('div.clearfix p').text();

				return {
					source: 'spiegel.de',
					title,
					published,
					author,
					// script,
				};
			} catch (err) {
				// return;
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
			}
		})
	);
	return data;
};

exports.ciceroScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);

				const authorAndDate = $('article')
					.find('p.byline__author')
					.text()
					.trim();

				$('article > div.clearfix').find('p.byline__author').remove();
				$('article > div.clearfix').find('ul').remove();
				$('article > div.clearfix').find('span.cicero-red').remove();
				$('article > div.clearfix').find('span.visually-hidden').remove();

				const title = $('article > div.clearfix span.h1').text().trim();

				const subTitle = $('article').find('p.lead').text().trim();

				$('div.field').find('.author-box').remove();
				const script = $('article')
					.find('div.field-name-field-cc-body')
					.find('p')
					.text()
					.replace(/\n/g, '');
				return {
					source: 'cicero.de',
					title,
					authorAndDate,
					subTitle,
					// script
				};
			} catch (err) {
				// return
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
			}
		})
	);
	return data;
};

exports.bildScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);

				const title = $('header h2').find('span.headline').text().trim();

				$('div.authors').find('span.vh').remove();
				$('div.authors').find('span.u-title-case').remove();

				const published = $('div.authors').find('time').text();

				let author = $('div.authors').find('span.authors__name').text();
				!author && (author = 'No Author');

				$('article').find('div.txt').find('ul').remove();
				const script = $('article').find('div.txt').find('p').text();

				return {
					source: 'bild.de',
					title,
					published,
					author,
					// script
				};
			} catch (err) {
				// return;
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
			}
		})
	);
	return data;
};

exports.tichyseinblickScrapper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('div h1.entry-title').text();
				const subTitle = $('div.entry-content')
					.find('.rty-article-page-excerpt')
					.text()
					.trim();
				const published = $('div.author').find('span.date').text().trim();
				let author = $('div.author').find('strong').text().trim();
				$('.entry-content').find('div.rty-inner-post-box').remove();
				$('.entry-content').find('div.oembed-cached').remove();
				$('.entry-content').find('ul').remove();
				$('.entry-content').find('#reward').remove();
				const script = $('.entry-content')
					.find('div.pf-content')
					.text()
					.replace(/\s\s+/g, '')
					.replace(/\n/g, '');
				return {
					source: 'tichyseinblick',
					// url,
					title,
					published,
					author,
					subTitle,
					// script,
				};
			} catch (err) {
				// return;
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
			}
		})
	);
	return data;
};

exports.jungefreiheitScrapper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);

				const title = $('div.elementor-widget-container').find('h1').text();

				///rahe loop ro test kon baadan
				$('div.elementor-shortcode').find('ul').children().first().remove();
				const published = $('div.elementor-shortcode')
					.find('ul')
					.children()
					.first()
					.text()
					.trim();
				$('div.elementor-shortcode').find('ul').children().first().remove();
				const author = $('div.elementor-shortcode')
					.find('ul')
					.children()
					.first()
					.text()
					.trim();

				$('.entry-content').find('div.rty-inner-post-box').remove();
				$('.entry-content').find('div.oembed-cached').remove();
				$('.entry-content').find('ul').remove();
				$('.entry-content').find('#reward').remove();
				// const script = //matne khabar poli
				return {
					source: 'jungefreiheit',
					url,
					title,
					published,
					author,
					// script,
				};
			} catch (err) {
				// return;
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
			}
		})
	);
	return data;
};

exports.weltScrapper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);

				const title = $('header div.c-container').find('h2.c-headline').text();

				const subTitle = $('div.c-summary div[itemprop="description"]').text();

				const published = new Date(
					$('div.c-container').find('time').attr('datetime')
				).toDateString();

				const author = $('div.c-author').find('a').text().trim();

				$('div.c-inline-element').remove();
				const script = $('div.c-article-text p').text();
				return {
					source: 'welt.de',
					// url,
					title,
					published,
					author,
					subTitle,
					// script,
				};
			} catch (err) {
				// return;
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
			}
		})
	);
	return data;
};

exports.sternScrapper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);

				$('header').find('span.title__kicker').remove();
				$('div.ArticleHero-wrapHeadline')
					.find('span.ArticleHero-kicker')
					.remove();
				const title =
					$('div.ArticleHero-wrapHeadline')
						.text()
						.trim()
						.replace(/\s\s+/g, '')
						.replace(/\n/g, '') ||
					$('div.title')
						.find('h2')
						.text()
						.trim()
						.replace(/\s\s+/g, '')
						.replace(/\n/g, '');

				const subTitle = (
					$('header div .ArticleHeader-intro').text() || $('div.intro ').text()
				)
					.replace(/\s\s+/g, '')
					.replace(/\n/g, '');

				const info = $('div.authors__text')
					.map((index, element) => {
						let author = $(element).find('a').text();
						let published = $(element).find('time').attr('datetime');
						return { author, published };
					})
					.get();

				published =
					info.map((i) => i.published).join('') ||
					$('div.ArticleMeta').find('time').attr('datetime');

				author =
					info
						.map((i) => {
							return i.author ? i.author : 'No Author';
						})
						.join(',') || $('header div').find('ul li a').text();

				$(
					'div.ArticleContent-items div.ArticleContent-wrapTeaserList'
				).remove();

				const script = (
					$('div.ArticleContent-items p.TextElement').text() ||
					$('article.article__main .article__body ')
						.find('p.text-element')
						.text()
				)
					.replace(/\s\s+/g, '')
					.replace(/\n/g, '');

				return {
					source: 'stern.de',
					// // url,
					title,
					subTitle,
					published,
					author,
					// script,
				};
			} catch (err) {
				// return;
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
			}
		})
	);
	return data;
};

exports.tagesschauScrapper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);

				const title = $('div.meldungHead').find('span.headline').text();

				let author;
				$('p.autorenzeile ').text()
					? (author = $('p.autorenzeile ').text())
					: (author = 'No Author');

				const published = $('div.meldungHead')
					.find('span.stand')
					.text()
					.split('Stand: ')[1];

				$('span.stand').remove();
				$('p.autorenzeile').remove();
				$('div.mod').find('div.infokasten').remove();
				$('div.mod').find('div.mediaCon').remove();
				const script = $('div.mod p.text')
					.text()
					.replace(/\s\s+/g, '')
					.replace(/\n/g, '');

				return {
					source: 'tagesschau.de',
					// // url,
					title,
					// subTitle,
					published,
					author,
					// script,
				};
			} catch (err) {
				// return;
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
			}
		})
	);
	return data;
};

exports.handelsblattScrapper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);

				const title = $('div.vhb-content')
					.find('h2 span[itemprop="headline"]')
					.text();

				const info = $('div.vhb-article-area--onecolumn')
					.map((i, element) => {
						let published = $(element)
							.find('div.vhb-publish-info')
							.find('span')
							.attr('content');
						let author = $(element).find('span[itemprop="name"]').text();
						return { published, author };
					})
					.get();
				author = info.map((i) => i.author).join();
				published = info.map((i) => i.published).join();

				$('div.vhb-hollow-area').remove();
				const script = $('div[itemprop="articleBody"] p')
					.text()
					.replace(/\s\s+/g, '')
					.replace(/\n/g, '');

				return {
					source: 'handelsblatt.com',
					// // url,
					title,
					// subTitle,
					published,
					author,
					// script,
				};
			} catch (err) {
				// return;
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
			}
		})
	);
	return data;
};
exports.allgemeineScrapper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);

				const title = $('#content').find('.h1').text().trim();

				const author = $('div.vrm-articleDetail__authorInfo')
					.find('span')
					.text();

				const published = $('div.vrm-articleDetail__date')
					.children()
					.last()
					.text()
					.trim();

				$('#js-vrm-articleDetail__content').find('figure').remove();
				$('.hide-for-large').remove();
				const subTitle = $('article.vrm-articleDetail p')
					.text()
					.replace(/\s\s+/g, '')
					.replace(/\n/g, ' ');

				const script = $('#js-vrm-articleDetail__content')
					.find('.vrm-articleDetail__text')
					.text()
					.replace(/\s\s+/g, '')
					.replace(/\n/g, '');

				return {
					source: 'allgemeine-zeitung.de',
					title,
					subTitle,
					published,
					author,
					// script,
					// url,
				};
			} catch (err) {
				// return;
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
			}
		})
	);
	return data;
};
