const scaleNames = {
    'c': 'Celsius',
    'f': 'Fahrenheit'
}

function toCelsius(fahrenheit){
    return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius){
    return (celsius * 9 / 5) + 32 ;
}
function tryConvert(temperature, convert){
    const value = parseFloat(temperature)
    if(Number.isNaN(value)){
        return '';
    }
     return (Math.round(convert(value)*100)/100).toString();
}
class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
       this.props.onTemperatureChange(e.target.value)
    }
    render(){
        const name = 'scale' + this.props.scale;
        const scaleName = scaleNames[this.props.scale];
        const {temperature} = this.props;
        return <div className="form-group">
                <labe htmlFor={name}>Temperature en ({scaleName})</labe>
                <input type="text" id={name} value={temperature} className="form-control" onChange={this.handleChange} />
        </div>
    }
}
function BoilingVerdict({celsius}){
    if(celsius >= 100){
        return <div className="alert alert-success">
            L'eau bout
        </div>
    }
    return <div className="alert alert-info">L'eau ne bout pas</div>
}
class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            scale: 'c',
            temperature: 34
        }
        this.handleCelsuisChange = this.handleCelsuisChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }
    handleCelsuisChange(temperature){
        this.setState({
            scale: 'c',
            temperature
        })
    }
    handleFahrenheitChange(temperature){
        this.setState({
            scale: 'f',
            temperature
        })
    }
    render(){
        const {temperature, scale} = this.state;
        const celsius = scale === 'c' ? temperature : tryConvert(temperature , toCelsius)
        const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)
        return <div>
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsuisChange} />
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
            <BoilingVerdict celsius={celsius} />
        </div>

    }
}
ReactDOM.render(<Calculator />, document.querySelector('#app'));