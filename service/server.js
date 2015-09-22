var fake = require('fake-api-server');

var users = new fake.Resource("user")
    .add({
        name: "Jefferson Witte",
        email: "jeffereson@mail.com",
        phone: 112
        })
    .add({
        name: "Charlie Barnes",
        email: "cb@mail.com",
        phone: 112
    })
    .add({
        name: "Rodrigo Millett",
        email: "rds@mail.com",
        phone: 112
    })
    .add({
        name: "Yang Husted",
        email: "yh@mail.com",
        phone: 112
    })
    .add({
        name: "Melvin Carney",
        email: "mc@mail.com",
        phone: 112
    })
    .add({
        name: "Kip Edwin",
        email: "kp@mail.com",
        phone: 112
    });

var cats = new fake.Resource("cat").add({
    'name':'Rex',
    'fur' : 'grey',
    'userId' : '1'
}).add({
    'name':'Fiska',
    'fur' : 'tarcata',
    'userId' : '1'
}).add({
    'name':'Archibald',
    'fur' : 'blue',
    'userId' : '1'
}).add({
    'name':'Biscuit',
    'fur' : 'red',
    'userId' : '1'
}).add({
    'name':'Whiskers',
    'fur' : 'brown',
    'userId' : '1'
});

var server = new fake.Server()
    .register(users)
    .register(cats)
    .listen(3000);