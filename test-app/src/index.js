import React from 'react';
import ReactDOM from 'react-dom';

function formatName(user){
	return user.firstName + ' ' + user.lastName;
}

function getGreeting(user){
	if (user){
		return 'Hello ' + formatName(user) + '!';
	} else {
		return 'Hello, Stranger';
	}
}

//Always start component names with a capital letter.
//All React components must act like pure functions(no change on inputs) wrt their props.
//Function component
function Welcome1(props) {
	return <h1 key='wel1'>Welcome1, {props.name}</h1>;
}

//Class component
class Welcome2 extends React.Component {
	render(){
		return <h1 key='wel2'>Welcome2, {this.props.name}</h1>;
	}
}

//state is similar to props, but
//it is private and fully controlled by the component
class Clock extends React.Component {
	// assign state only in constructor
	constructor(props) {
		super(props);
		this.state = {date: new Date()};
	}

	//Clock is rendered to DOM the first time
	componentDidMount() {
		// call tick function every one second
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	//DOM produced by Clock is removed
	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	//Do not modify state directly, use setState instead
	tick() {
		this.setState({
			date: new Date()
		});
	}

	render() {
		return (
			<h1 key='date'> Date: {this.state.date.toLocaleTimeString()}.</h1>
		);
	}
}

class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggleOn: true};

		// This binding is necessary to make 'this' work in the callback,
		// otherwise, 'this' will be undefined when the function is actually called.
		this.handClick = this.handClick.bind(this);
	}
	handClick() {
		this.setState(state => ({
			isToggleOn: !state.isToggleOn
		}));
	}
	render() {
		return (
			<button onClick={this.handClick}>
				{this.state.isToggleOn ? 'ON' : 'OFF'}
			</button>
		);
	}
}

function UserGreeting(props) {
	return <h1>Welcome back !</h1>;
} 

function GuestGreeting(props) {
	return <h1>Please sign up.</h1>;
}

function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <UserGreeting />;
	} else {
		return <GuestGreeting />;
	}
}

function LoginButton(props) {
	return (
		<button onClick={props.onClick}>
			Login
		</button>
	);
}

function LogoutButton(props) {
	return (
		<button onClick={props.onClick}>
			Logout
		</button>
	);
}

//Stateful component
class LoginControl extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		
		this.state = {isLogin: false};
	}

	handleLoginClick() {
		this.setState({isLogin: true});
	}

	handleLogoutClick() {
		this.setState({isLogin: false});
	}

	render() {
		const isLoggedIn = this.state.isLogin;
		let button;
		if (isLoggedIn) {
			button = <LogoutButton onClick={this.handleLogoutClick} />;
		} else {
			button = <LoginButton onClick={this.handleLoginClick} />;
		}
		return (
			<div>
				<Greeting isLoggedIn={isLoggedIn} />
				{button}
			</div>
		);
	}
}

//{} represents struct in JS
const user = {
	firstName: 'Weilin',
	lastName: 'Liu'
};

const name = 'Weilin Liu';
const element1 = <h1 key="e1">Hello, world</h1>;

//JSX, {x} x is the JavaScript Expression
const element2 = <h1 key="e2">Hello, {name}</h1>;
const element3 = <h1 key="e3">Hello, {formatName(user)}</h1>;
const element4 = <h1 key="e4">{getGreeting(user)}</h1>;

//JSX, class becomes className, tabindex becomes tabIndex
//JSX, quotes to specify string literals
const element5 = <div tabIndex="0" key="e5"></div>;

//JSX, use React.createElement()
const element6 = React.createElement(
	'h1',
	{key: "e6"},
	'Hello World6'
);

const element7 = <Welcome1 key='Wel1' name='liuweilin1'/>;
const element8 = <Welcome2 key='Wel2' name='liuweilin2'/>;

// list
// elements inside the map() call need keys
// Keys used within arrays should be unique among their siblings.
// However they don’t need to be globally unique.
function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number)=>
		<li key={number.toString()}>
			{number}
		</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}

//HTML Listener, use lowercase. eg, <button onclick="activateLasers()">
//React Listener, use camelCase. eg, <button onClick={activateLasers}>
//Another difference: 
//cannot return false to prevent default behavior in React. call preventDefault explicitly instead. 

//controlled react component: 
//renders a form also controls what happens in that form on subsequent user input.
//Input Example
class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<input type='text' value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type='submit' value="Submit"/>
			</form>
		);
	}
}

//textarea example
class EssayForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 'Please write an essay about your favourite DOM element'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('An essay was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Essay:
					<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

//Select: use value attribute on select instead of selected attribute
class FlavorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 'coconut'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('Your favourite flavour is: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Pick your favourite flavour:
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="grapefruit">GrapeFruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
					</select>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

//Handling multiple inputs
//add a name attribute to each element and
//let the handler function choose what to do based on the value of event.target.name
class Revervation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGoing: true,
			numberOfGuests: 2
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name] : value
		});
	}

	render() {
		return (
			<form>
				<label>
					Is going:
					<input name="isGoing" type="checkbox" 
						checked={this.state.isGoing} onChange={this.handleInputChange} />
				</label> <br />
				<label>
					Number of Guests:
					<input name="numberOfGuests" type="number"
						value={this.state.numberOfGuests} onChange={this.handleInputChange} />
				</label>
			</form>
		);
	}
}

// Lifting State Up
function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p> The water would boil</p>
	}
	return <p>The water would not boil</p>
}

const scaleNames = {
	c: 'Celsius',
	f: 'Fahrenheit',
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

// convert is function toCelsius or toFahrenheit
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.props.onTemperatureChange(e.target.value);
	}

	render() {
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>Enter temperature in {scaleNames[scale]}:</legend>
				<input value={temperature} onChange={this.handleChange} />
			</fieldset>
		);
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
		this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
		this.state = {temperature: '', scale: 'c'};
	}

	handleCelsiusChange(temperature) {
		this.setState({scale: 'c', temperature});
	}

	handleFahrenheitChange(temperature) {
		this.setState({scale: 'f', temperature});
	}

	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius = scale == 'f' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit = scale == 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

		return (
			<div>
				<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
				<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
				<BoilingVerdict celsius={parseFloat(celsius)} />
			</div>
		);
	}
}

ReactDOM.render(
	[
		<div id="d1" key="d1"/>, 
		<div id="d2" key="d2"/>, 
		<div id="d3" key="d3"/>,
		<div id="d4" key="d4"/>,
	],
	document.getElementById('root')
);

const numbers = [1,2,3,4,5]
ReactDOM.render(
	[
		element1,element2,element3,element4,element5,
		element6,element7,element8,
		<NumberList numbers={numbers} />,
		<NameForm />,
		<EssayForm />,
		<FlavorForm />,
		<Revervation />,
		<Calculator />
	],
	document.getElementById('d1')
);

function App(props) {
	return (
		<div>
			<Clock />
			<Clock />
			<Clock />
		</div>
	);
}

ReactDOM.render(
	<App />, 
	document.getElementById('d2')
);

ReactDOM.render(
	<Toggle />,
	document.getElementById('d3')
);

ReactDOM.render(
	<LoginControl />,
	document.getElementById('d4')
);

