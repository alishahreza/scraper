const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');
const object = require('./functions');
const { mainFunc, allData } = object;

const toJson = async () => {
	await mainFunc();
	try {
		const pathJson = `${process.argv[3]}.json` && `${process.argv[3]}`;
		await fs.writeFileSync(
			`${pathJson}.json`,
			JSON.stringify(allData)
			// { flag: 'a' }
		);
	} catch (err) {
		console.error(err);
	}
};

const toCsv = async () => {
	await mainFunc();

	for (let i = 0; i < allData.length; i++) {
		const csv = new ObjectsToCsv(allData[i]);
		const pathCsv = `${process.argv[3]}.csv` && `${process.argv[3]}`;
		await csv.toDisk(`${pathCsv}.csv`, { append: true });
	}
};

if (process.argv[2] === '--json') {
	toJson();
} else if (process.argv[2] === '--csv') {
	toCsv();
}
