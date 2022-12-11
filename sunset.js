// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;

async function getSunData(date, LAT, LONG) {
	let sunData = {};

	let dateYear = date.getFullYear();
	let dateMonth = date.getMonth() + 1;
	let dateDate = date.getDate();
	let posURL = "lat=" + LAT + "&lng=" + LONG + "&";
	let dateURL = "date=" + dateYear + "-" + dateMonth + "-" + dateDate;
	let fullURL = baseURL + posURL + dateURL;

	let req = new Request(fullURL).loadJSON();	
	let raw = await req;

	sunData.sunrise = raw.results.sunrise;	
	sunData.sunset = raw.results.sunset;
	sunData.daylength = raw.results.day_length;

	return sunData;
}

async function getLocation() {
	try {
		Location.setAccuracyToThreeKilometers()
		return await Location.current()
	} catch (e) {
		return null;
	}
}

const baseURL = "https://api.sunrise-sunset.org/json?formatted=0&"

let today = new Date();
let tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

let act_location = await getLocation();
let tmp = await Location.reverseGeocode(act_location.latitude, act_location.longitude)
let district = tmp[0].subAdministrativeArea

let sunToday = await getSunData(today, act_location.latitude, act_location.longitude);
let sunTomorrow = await getSunData(tomorrow, act_location.latitude, act_location.longitude);


console.log(`${district}:\n${JSON.stringify(sunToday)}\n${JSON.stringify(sunTomorrow)}`);