// starting the mongodb server by:
mongod

//starting the shell by:
mongo

//creating and using db:
//use mongo_practice

//inserting docs inside a collection in db:
>db.movies.insertMany(
	[   
        {
            title: "Fight Club",
            writer: "Chuck Palahniuko",
            year: "1999",
            actors: [
                "Brad Pitt",
                "Edward Norton"
            ]
        },
        {
            title: "Pulp Fiction",
            writer: "Quentin Tarantino",
            year: "1994",
            actors: [
                "John Travolta",
                "Uma Tharmon"
            ]
        },
        {
            title: "Inglorious Bastards",
            writer: "Quentin Tarantino",
            year: "2009",
            actors: [
                "Brad Pitt",
                "Diane Kruger",
                "Eli Roth"
            ]
        },
        {
            title: "The Hobbit: An unexpected Journey",
            writer: "J.R.R. Tolkein",
            year: "2012",
            franchise: "The Hobbit"
        },
        {
            title: "The Hobbit: The Desolation of Smoug",
            writer: "J.R.R. Tolkein",
            year: "2013",
            franchise: "The Hobbit"
        },
        {
            title: "The Hobbit: The Battle of Five Armies",
            writer: "J.R.R. Tolkein",
            year: "2013",
            franchise: "The Hobbit",
            synopsis: "Bilbo and company are forced to engage in a war against an array of combatants and keep the Lonely Mountains from falling into the hands of the rising darkness."
        },
        {
            title: "Pee Wee Herman's Big Adventure"
        },
        {
            title: "Avatar"
        }
    ]
)

//----Find Documents-------

// query to get all docs:
> db.movies.find().pretty()

//all docs with writer set to Quentine Tarantino:
> db.movies.find( { writer: "Quentin Tarantino" } ).pretty()

//all docs with actors include Brad Pitt:
> db.movies.find({actors:"Brad Pitt"}).pretty()

//get all documents with franchise set to "The Hobbit":
> db.movies.find({franchise:"The Hobbit"}).pretty()

// get all movies released in the 90s:
> db.movies.find({year:{$gt:"1990", $lt:"2000"}}).pretty()

//get all movies released before the year 2000 or after 2010
> db.movies.find({$or:[{year:{$gt:"2010"}},{year: {$lt:"2000"}}]}).pretty()


//-----Update Documents-------

// add a synopsis to "The Hobbit: An Unexpected Journey" : "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."
> db.movies.update({_id:ObjectId("5feebe6fede4c61eb6c266c7")}, {$set:{synopsis:"A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."}})

//add a synopsis to "The Hobbit: The Desolation of Smaug" : "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
> db.movies.update({_id:ObjectId("5feebe6fede4c61eb6c266c8")}, {$set:{synopsis:"The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."}})

//add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"
> db.movies.update({_id:ObjectId("5feebe6fede4c61eb6c266c5")}, {$push:{actors:"Samuel L. Jackson"}})


//-----------Text Search-------

//find all movies that have a synopsis that contains the word "Bilbo"
> db.movies.find({synopsis:{$regex:"Bilbo"}}).pretty()

//find all movies that have a synopsis that contains the word "Gandalf"
> db.movies.find({synopsis:{$regex:"Gandalf"}}).pretty()

//find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"
> db.movies.find({$and:[{synopsis:{$regex:"Bilbo"}}, {synopsis:{$not:/Gandalf/}}]}).pretty()

//find all movies that have a synopsis that contains the word "dwarves" or "hobbit"
> db.movies.find({$or:[{synopsis:{$regex:"dwarves"}}, {synopsis:{$regex:"hobbit"}}]}).pretty()

//find all movies that have a synopsis that contains the word "gold" and "dragon"
> db.movies.find({$and:[{synopsis:{$regex:"gold"}}, {synopsis:{$regex:"dragon"}}]}).pretty()


//-------Delete Documents----

//delete the movie "Pee Wee Herman's Big Adventure"
> db.movies.remove({_id:ObjectId("5feebe6fede4c61eb6c266ca")})

//delete the movie "Avatar"
> db.movies.remove({_id:ObjectId("5feebe6fede4c61eb6c266cb")})


//--------Relationships---------
db.comments.insert({ username:"GoodGuyGreg", comment:"Hope you got a good deal!", post:ObjectId("5ff2bd753d7744d60feadd1c")})
//Insert the documents into a users collection
> db.users.insert({_id:1,username:"GoodGuyGreg", first_name:"Good Guy", last_name:"Greg"})

> db.users.insert({_id:2, username:"ScumbagSteve", fullname:{first: "Scumbag", last:"Steve"}})

//Insert the documents into a posts collection

> db.posts.insert({username:"GoodGuyGreg", title:"Passes out at Party", body:"Raises your credit score"})

> db.posts.insert({ username:"GoodGuyGreg", title:"Steals your identity", body:"Raises your credit score"})

> db.posts.insert({username:"GoodGuyGreg", title:"Reports a bug in your code", body:"Sends you a pull request"})

> db.posts.insert({ username:"ScumbagSteve", title:"Borrows something", body:"Sells it"})

> db.posts.insert({ username:"ScumbagSteve", title:"Borrows everything", body:"The end"})

> db.posts.insert({username:"ScumbagSteve", title:"Forks your repo on github", body:"Sets to private"})

//Insert the  documents into a comments collection

> db.comments.insert({ username:"GoodGuyGreg", comment:"Hope you got a good deal!", post:ObjectId("5ff2bd753d7744d60feadd1c")})

> db.comments.insert({username:"GoodGuyGreg", comment:"What's mine is yours!", post:ObjectId("5ff2bd903d7744d60feadd1d")})

> db.comments.insert({username:"GoodGuyGreg", comment:"Don't violate the licensing agreement!", post:ObjectId("5ff2bdb23d7744d60feadd1e")})

> db.comments.insert({username:"ScumbagSteve", comment:"It still isn't clean", post:ObjectId("5ff2bd0e3d7744d60feadd19")})

> db.comments.insert({username:"ScumbagSteve", comment:"Denied your PR cause I found a hack", post:ObjectId("5ff2bd4b3d7744d60feadd1b")})


//------Querying related collections-----------

//find all users
> db.users.find().pretty()

//find all posts
> db.posts.find().pretty()

//find all posts that was authored by "GoodGuyGreg"
> db.posts.find({username:"GoodGuyGreg"}).pretty()

//find all posts that was authored by "ScumbagSteve"
> db.posts.find({username:"ScumbagSteve"}).pretty()

//find all comments
> db.comments.find().pretty()

//find all comments that was authored by "GoodGuyGreg"
> db.comments.find({username:"GoodGuyGreg"}).pretty()

//find all comments that was authored by "ScumbagSteve"
> db.comments.find({username:"ScumbagSteve"}).pretty()

//find all comments belonging to the post "Reports a bug in your code"
> db.posts.aggregate([
    {
    $match: { title: 'Reports a bug in your code' }
    },
    {
    $lookup: {
    from: 'comments',
    localField: '_id',
    foreignField: 'post',
    as: 'comments'
    }
    }
    ]).pretty();