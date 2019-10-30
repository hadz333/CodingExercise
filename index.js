// Exercise 1
// storing JSON file
var myData = require('./test-data.json')
// sorting the data in ascending order by time created
myData.sort((a, b) => Date.parse(a.created_date) - Date.parse(b.created_date));
console.log(myData);


// Exercise 2
console.log("~~~~~~Exercise 2~~~~~~");
myData = require('./test-data.json')
// bucket for each hour in the day
var hourBuckets = new Array(24);
// each bucket will hold potentially multiple values, so we create 2D array
for (i = 0; i < hourBuckets.length; i++) hourBuckets[i] = new Array(0);

// get the hour of each date and store the summary in its hour bucket
for (i = 0; i < myData.length; i++) {
	var date = new Date(myData[i].created_date);
	hourBuckets[date.getHours()].push(myData[i].created_date, myData[i].summary, myData[i].status);
}
//console.log(hourBuckets);
var myRange = range("2019-09-03T01:17:02.600-0700", "2019-09-04T05:00:06.804-0700");

console.log(myRange);

// this function will return a specified range of data entries utilzing the hour buckets
function range(start, end) {
	var startDate = new Date(start);
	var endDate = new Date(end);
	// retrieve a subarray of the hour buckets within the hour range
	var slicedBuckets = hourBuckets.slice(startDate.getHours(), endDate.getHours() + 1);
	var result = new Array(0);
	// make sure they are within the dates
	for (i = 0; i < slicedBuckets.length; i++) {
		for (j = 0; j < slicedBuckets[i].length; j+= 3) {
			var currDate = new Date(slicedBuckets[i][j]);
			if ((currDate.getTime() >= startDate.getTime()) && (currDate.getTime() <= endDate.getTime())) {
				result.push(slicedBuckets[i][j], slicedBuckets[i][j+1], slicedBuckets[i][j+2]);
			}
		}
	}
	return result;
}