//import zip.json file to mongodb
//>mongoimport --db population --collection zipcodes --file E:\zip.json

//-------Atlanta Population------

//use db.zipcodes.find() to filter results to only the results where city is Atlanta and state is GA
db.zipcodes.find({$and: [ {city: "ATLANTA"}, {state: "GA"} ]}).pretty()

//use db.zipcodes.aggregate with $match to do same as above
> db.zipcodes.aggregate({$match: {$and: [ {city: "ATLANTA"}, {state: "GA"} ]}}).pretty()

//use $group to find total population in ATLANTA

> db.zipcodes.aggregate([{$group: {_id: "$city", totalPop: {$sum: "$pop"} }}, {$match: {_id: "ATLANTA"}}])

//----------Populations by State------------

//use aggregate to claculate total population for each state
> db.zipcodes.aggregate( [
    { $group: { _id: "$state", totalPop: { $sum: "$pop" } } }
 ] )
    
//sort the result by population highest first
> db.zipcodes.aggregate([{$group: {_id: "$state", totalPop: {$sum: "$pop"}}}, {$sort: {totalPop: -1}} ]).pretty()

//limit the results to just first 3 results
> db.zipcodes.aggregate([{$group: {_id: "$state", totalPop: {$sum: "$pop"}}}, {$sort: {totalPop: -1}}, {$limit: 3} ]).pretty()


//-------------Populations By City----------------

//use aggregate to calculate total population of each state
> db.zipcodes.aggregate([{$group: {_id: {state: "$state", city: "$city"}, totalPopulation: {$sum: "$pop"}}}]).pretty()

//sort the result by population
> db.zipcodes.aggregate([{$group: {_id: {state: "$state", city: "$city"}, totalPopulation: {$sum: "$pop"}}}, {$sort: {totalPopulation: -1}}]).pretty()

//limit the results to just first 3 results
>  db.zipcodes.aggregate([{$group: {_id: {state: "$state", city: "$city"}, totalPopulation: {$sum: "$pop"}}}, {$sort: {totalPopulation: -1}}, {$limit: 3}]).pretty()

//top 3 cities in population in texas
> db.zipcodes.aggregate([{$group: {_id: {state: "$state", city: "$city"}, totalPopulation: {$sum: "$pop"}}},{$match: {"_id.state": "TX"}}, {$sort: {totalPopulation: -1}}, {$limit: 3} ]).pretty()


//----------Bonus------------------

//Average city population for each state
> db.zipcodes.aggregate( [{ $group: { _id: { state: "$state", city: "$city" }, population: { $sum: "$pop" }}}, { $group: { _id: "$_id.state", avgCityPopulation: { $avg: "$population" }}}]).pretty()


//top 3 states in terms of average population
db.zipcodes.aggregate( [{ $group: { _id: { state: "$state", city: "$city" }, population: { $sum: "$pop" }}}, { $group: { _id: "$_id.state", avgCityPopulation: { $avg: "$population" }}}, {$sort: {avgCityPopulation: -1}}]).pretty()