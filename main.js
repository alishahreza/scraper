const fs = require('fs');
const inquirer = require('inquirer');
const ObjectsToCsv = require('objects-to-csv');
const path = require('path');
const object = require('./functions');
const { mainFunc, allData } = object;

inquirer
	.prompt([
		{
			type: 'confirm',
			name: 'toBeSaved',
			message: 'Do you want to save the output as a file?',
			default: false,
		},
	])
	.then((answers) => {
		if (answers.toBeSaved) {
			inquirer.prompt(questions).then((answers) => {
				buildConfig(answers);
			});
		} else {
			console.log('Bye 🖐🏽');
		}
	});

var questions = [
	{
		type: 'list',
		name: 'fileFormat',
		message: 'What format u want to save the file?',
		choices: ['Csv', 'Json'],
		filter: function (val) {
			return val.toLowerCase();
		},
	},
	{
		type: 'input',
		name: 'filename',
		message: 'what is yor output file name?',
		default: path.basename(process.cwd()),
	},
	{
		type: 'input',
		name: 'pathToSave',
		message: 'where do u want to save the file?',
		default: process.cwd(),
	},
];

const buildConfig = (answers) => {
	const { fileFormat, filename, pathToSave } = answers;
	switch (fileFormat) {
		case 'json':
			toJson(filename, pathToSave);
			break;
		case 'csv':
			toCsv(filename, pathToSave);
			break;
		default:
			console.log('Nice To Meet You ...');
	}
};
const toJson = async (filename, pathToSave) => {
	await mainFunc();
	try {
		let fileNameToSave, pathJson;
		filename
			? (fileNameToSave = filename)
			: (fileNameToSave = path.basename(process.cwd()));
		pathToSave ? (pathJson = pathToSave) : (pathJson = process.cwd());
		await fs.writeFileSync(
			`${pathJson}/${fileNameToSave}.json`,
			JSON.stringify(allData)
			// { flag: 'a' }
		);
		console.log(`Json file is created successfully`);
	} catch (err) {
		console.error(err);
	}
};

const toCsv = async (filename, pathToSave) => {
	await mainFunc();
	try {
		let fileNameToSave, pathCsv;
		filename
			? (fileNameToSave = filename)
			: (fileNameToSave = path.basename(process.cwd()));
		pathToSave ? (pathCsv = pathToSave) : (pathCsv = process.cwd());
		for (let i = 0; i < allData.length; i++) {
			const csv = new ObjectsToCsv(allData[i]);
			await csv.toDisk(`${pathCsv}/${fileNameToSave}.csv`, { append: true });
		}
		console.log(`Csv file is created successfully`);
	} catch (err) {
		console.error(err);
	}
};
