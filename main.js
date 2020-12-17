const fs = require('fs');
const path = require('path');
const ObjectsToCsv = require('objects-to-csv');
const object = require('./functions');
const yargs = require('yargs');
const { mainFunc, allData } = object;

const toJson = async () => {
	await mainFunc();
	try {
		let pathJson;
		filepath.trim() === ''
			? (pathJson = 'data')
			: (pathJson = filepath.split('.')[0]);
		console.log(filepath);
		await fs.writeFileSync(
			`${pathJson}.json`,
			JSON.stringify(allData)
			// { flag: 'a' }
		);
		console.log(`Json file is created successfully`);
	} catch (err) {
		console.error(err);
	}
};

const toCsv = async () => {
	await mainFunc();
	for (let i = 0; i < allData.length; i++) {
		const csv = new ObjectsToCsv(allData[i]);
		let pathCsv;
		filepath.trim() === ''
			? (pathCsv = 'data')
			: (pathCsv = filepath.split('.')[0]);
		await csv.toDisk(`${pathCsv}.csv`, { append: true });
	}
	console.log(`Csv file is created successfully`);
};

const { argv } = yargs
	.command('save', 'save the file in local machine', { alias: 's' })
	.option('path', {
		alias: 'p',
		demandOption: true,
		desc: 'path to save the file',
		default: 'data',
	})
	.option('format', {
		alias: 'f',
		demandOption: true,
		desc: 'format to save the file',
		choices: ['json', 'csv'],
	});

let params = yargs.argv;
let { path: filepath, format } = params;

if (format === 'json') {
	toJson();
} else if (format === 'csv') {
	toCsv();
}
