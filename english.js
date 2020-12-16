const axios = require('axios');
const cheerio = require('cheerio');

exports.cnnScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('h1.pg-headline').text();
				const published = new Date(
					$('div.metadata__info')
						.find('p.update-time')
						.text()
						.split(',')
						.splice(1, 2)
						.join()
				).toDateString();
				const author = $('div.metadata__info')
					.find('span.metadata__byline__author')
					.text();
				$('div.l-container').find('img').remove();
				const script = $('div.l-container')
					.find('div[itemprop="articleBody"]')
					.text();

				return {
					source: 'cnn.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.huffpostScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('div.headline .headline__title ').text().trim();
				const published = new Date(
					$('div.timestamp > span > span[aria-hidden="true"]')
						.text()
						.split(' ')[0]
				).toDateString();
				const author = $('div.byline__authors').text().trim();
				$('div.entry__body')
					.find('div.entry__text')
					.find('div[dir="ltr"]')
					.remove();
				$('div.entry__body').find('div.entry__text').find('.hidden').remove();
				const script = $('div.entry__body')
					.find('div.entry__text')
					// .html();
					.text()
					.trim()
					.replace(/\s\s+/g, '')
					.replace(/\n/g, '');
				return {
					source: 'huffpost.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.foxScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('header > h1.headline').text();
				const author = $('div.article-meta > div.author-byline > span > span ')
					.text()
					.trim()
					.replace('by', '')
					.replace(/\s\s+/g, '');
				const published = $('div.article-date > time').text().trim();
				$('div.article-body').find('.add-container').remove();
				$('div.article-body').find('.caption').remove();
				$('div.article-body').find('blockquote').remove();
				$('div.article-body').find('p').find('strong').remove();
				const script = $('div.article-body')
					.find('p')
					.text()
					.replace(/\n/g, '');
				return {
					source: 'fox.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.usatodayScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('article > h1[elementtiming="ar-headline"]').text();
				const author = $('div.gnt_ar_by').find('a').text();
				const published = new Date(
					$('div.gnt_ar_dt')
						.attr('aria-label')
						.split(' ')
						.splice(4, 3)
						.join()
						.replace(',', '')
						.replace(',', '')
				).toDateString();
				$('div.gnt_ar_b').find('aside').remove();
				$('div.gnt_ar_b').find('div.message').remove();
				$('div.gnt_ar_b').find('strong').siblings().remove();
				$('div.gnt_ar_b').find('strong').remove();
				const script = $('div.gnt_ar_b').find('p').text();
				return {
					source: 'usatoday.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.politicoScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('section > div > h2.headline').text();
				const info = $('div.story-meta__details')
					.map((index, element) => {
						let author = $(element).find('p.story-meta__authors').text().trim();
						let published = new Date(
							$(element).find('.story-meta__timestamp').text().split(' ')[0]
						).toDateString();
						$('div.story-text').find('div.story-meta').remove();
						let script = $('div.story-text').find('p').text();
						return { author, published, script };
					})
					.get();
				info.map((i) => {
					author = i.author;
					published = i.published;
					script = i.script;
				});

				return {
					source: 'politico.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.nprScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('div.storytitle > h1').text();
				const author = $('div.bucketwrap')
					.find('p > a')
					.text()
					.trim()
					.replace(/\s\s+/g, ' , ');
				const published = new Date(
					$('div.story-meta').find('div.dateblock').find('span.date').text()
				).toDateString();
				$('div#storytext').find('div.bucketwrap').remove();
				const script = $('div#storytext')
					.find('p')
					.text()
					.replace(/\s\s+/g, '')
					.replace(/\n/g, '');
				return {
					source: 'npr.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.breitbartScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('header > h1').text();
				const author = $('div.header_byline').find('a').text();
				const published = new Date(
					$('div.header_byline').find('time').text()
				).toDateString();
				// $('article').find('div.entry-content > p').find('em').remove();
				const script = $('article').find('div.entry-content > p').text();
				return {
					source: 'breitbart.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.nypostScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('div.article-header > h1').text().trim();
				const author = $('div#author-byline > p.byline ').text();
				const published = new Date(
					$('div.article-header > p.byline-date').text().trim().split('|')[0]
				).toDateString();
				const script = $('div.article-header')
					.find('div.entry-content')
					.find('p')
					.text();
				return {
					source: 'nypost.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.abcnewsScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('div.Article__Headline > h1').text();
				const author = $('div.Byline__Content')
					.find('span.Byline__Author ')
					.text();
				const published = new Date(
					$('div.Byline__TimestampWrapper').children().first().text()
				).toDateString();
				const script = $('article.Article__Wrapper')
					.find('section.Article__Content p')
					.text();
				return {
					source: 'abcnews.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.nbcnewsScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('header > div h1').text();
				const author = $('section.mb7').children().last().text();
				const published = $('section.mb7')
					.children()
					.first()
					.text()
					.split('/')[0];
				// console.log(
				// 	$('div.article-body__section').find('div.article-body').find('div.mt2')
				// 		.length
				// );
				$('div.article-body__section')
					.find('div.article-body')
					.find('strong')
					.remove();
				const script = $('div.article-body__section')
					.find('div.article-body')
					.find('p')
					.text();
				return {
					source: 'nbcnews.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.cbsnewsScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('header h1.content__title').text();
				const author = $('header').find('p.content__meta-byline').text().trim();
				const published = new Date(
					$('header').find('p.content__meta-timestamp > time').text().trim()
				).toDateString();
				const script = $('article.content')
					.find('section.content__body')
					.find('p')
					.text();
				return {
					source: 'cbsnews.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.yahooScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('header > h1[data-test-locator="headline"]').text();
				$('div.caas-attr-meta > div').find('span').remove();
				const published = new Date(
					$('div.caas-attr-meta > div').text()
				).toDateString();
				$('div.caas-attr-meta').find('div').remove();
				const author = $('div.caas-attr-meta').text()
					? $('div.caas-attr-meta').text()
					: 'no Author';
				$('div.caas-content-wrapper').find('.caas-body').find('ul').remove();
				$('div.caas-content-wrapper')
					.find('.caas-body')
					.find('strong')
					.remove();
				$('div.caas-content-wrapper')
					.find('.caas-body')
					.find('strong')
					.remove();
				$('div.caas-content-wrapper')
					.find('.caas-body')
					.find('div.twitter-tweet-wrapper')
					.remove();
				const script = $('div.caas-content-wrapper')
					.find('.caas-body p')
					.text();
				return {
					source: 'yahoo.com',
					title,
					// url,
					published,
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};

exports.reutersScraper = async (urls) => {
	const data = await Promise.all(
		urls.map(async (url) => {
			try {
				const { data } = await axios.get(url);
				const $ = await cheerio.load(data);
				const title = $('div > h1.Headline-headline-2FXIq').text();
				const published = $(
					'div.ArticleHeader-info-container-3-6YG > div.ArticleHeader-date-line-3oc3Y > time '
				)
					.children() ////////////////////////////////////publish o dar biar
					.first()
					.text();
				const author = $('div > p.Byline-byline-1sVmo').text();
				$('div.ArticleBodyWrapper').children().first().remove();
				// console.log($('div.Attribution-attribution-Y5JpY').parent().remove());
				const script = $('div.ArticleBodyWrapper p').text();
				return {
					source: 'reuter.com',
					title,
					// url,
					published: published ? published : '',
					author,
					subtitle: '',
					// script,
				};
			} catch (err) {
				console.error(err.message); //error handling
				err.message === 'Request failed with status code 404' &&
					console.log({ error: `${url} is not valid ... - 404` });
				return;
			}
		})
	);
	return data;
};
