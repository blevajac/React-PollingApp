var express = require ('express');
var _  = require ('underscore');
var app = express();

//sprema socket connections u polje
var connections = [];
var title = 'Neimenova Prezentacija';
var audience = [];
var speaker = {};
var questions = require('./app-questions');
var currentQuestion = false;
var results = {
  	a: 0,
  	b: 0,
  	c: 0,
  	d: 0
};

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

//event handler kada se socet poveze
io.sockets.on('connection', function(socket){

  //pazi kada je socket disconected i vodi brigu o otvorenim soctima
    socket.once('disconnect', function() {
        var member = _.findWhere(audience, { id: this.id });

        if (member) {
            audience.splice(audience.indexOf(member), 1);
            io.sockets.emit('audience', audience);
            console.log("Prezentaciju napustio: %s (%s gledatelja preostalo)", member.name, audience.length);
        } else if (this.id === speaker.id) {
            console.log("%s je gotov s predavanjem. '%s' prezentacija je gotova.", speaker.name, title);
  			    speaker = {};
            title = "Neimenova Prezentacija";
            io.sockets.emit('end', { title: title, speaker: '' });
        }

        //briše socket u connections polju
        connections.splice(connections.indexOf(socket), 1);
  		  socket.disconnect();
        console.log("Disconnected: preostalo %s sockets", connections.length);
    });


//soceket za membera
    socket.on('join', function(payload) {
          var newMember = {
              id: this.id,
              name: payload.name,
              type: 'audience'
          };
          this.emit('joined', newMember);
          audience.push(newMember);
          io.sockets.emit('audience', audience);

          console.log("Gledatelja prisutno: %s", payload.name);
    });

//socket za speakera
    socket.on('start', function(payload) {
        speaker.name = payload.name
        speaker.id = this.id;
        speaker.type = 'speaker';
        title = payload.title;

        this.emit('joined', speaker);
        io.sockets.emit('start', { title: title, speaker: speaker.name });

        console.log("Prezentacija započela: '%s' od %s", title, speaker.name);
    });

    socket.on('ask', function(question) {
        currentQuestion = question;
    		results = {a:0, b:0, c:0, d:0};
    		io.sockets.emit('ask', currentQuestion);

        console.log("Pitanje postavljeno: '%s' ", question.q);
    });

    socket.on('answer', function(payload) {
		    results[payload.choice]++;
        io.sockets.emit('results', results);
        console.log("Odgovor: '%s' - %j", payload.choice, results);
    });

    socket.emit('welcome', {
    		title: title,
    		audience: audience,
    		speaker: speaker.name,
    		questions: questions,
    		currentQuestion: currentQuestion,
        results: results
	});

  //sprema spojene konekcije u connectens polje (vodi brigu koliko ih ima otvoreno)
    connections.push(socket);
    console.log("Connected: spojenih sockets je %s", connections.length);
});

console.log("PollingApp server radi na 'https://localhost:3000'");
