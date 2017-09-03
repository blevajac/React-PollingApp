var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Whooops404 = React.createClass({
    render() {
        return(
            <div id="not-found">
                <h1>Nažalost stranica ne postoji</h1>
                <p>Stranicu koju ste tražali nalazi se u drugom dvorcu!!!</p>
                <p>Jeli možda jedna od ovih stranica ona koju tražite:</p>
                <ul>
                    <li><Link to="/">       Pridružite se Slušateljima</Link></li>
                    <li><Link to="/speaker">Pokrenite prezentaciju</Link></li>
                    <li><Link to="/board">  Pregledajte Odgovore korisnika</Link></li>
                </ul>
            </div>
        );
    }
});

module.exports = Whooops404;
