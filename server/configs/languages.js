const languages = [
	{
		label: 'English',
		value: 'en',
	},
	{
		label: 'Russian',
		value: 'ru',
	},
];

module.exports = {
	languages,
	langCodes: languages.map(item => item.value),
	defaultLang: 'en',
}
