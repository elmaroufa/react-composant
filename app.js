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
/** 
function WelcomeFunc({name,children}){
return <div>
    <h1>Salu le monde {name}</h1>
    <p>
        {children}
    </p>
    </div>
}

function Home(){
    return <div>
        <HomeForm></HomeForm>
    </div>
}
class Welcome extends React.Component{

    constructor(props){
        super(props)
        console.log(this.props)
    }
    render(){
        return <div><h1>
            salu le monde {this.props.name}
        </h1>
        <p>
            {this.props.children}
        </p>
        </div>
    }
}
class Clock extends React.Component{

    constructor(props){
        super(props);
        this.state= {date: new Date()}
        this.timer = null;
    }
    componentDidMount(){
        this.timer = window.setInterval(this.tick.bind(this),1000);
    }
    componentWillUnmount(){
       window.clearInterval(this.timer)
    }
    tick(){
        this.setState({date: new Date()})
    }
    render(){
        
        return <div>
                il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}
class Incremente extends React.Component{
    constructor(props){
        super(props);
        this.state = {numero: props.start, timer: null};
        this.toogle = this.toogle.bind(this);
        this.reset = this.reset.bind(this);
        
    }
    componentDidMount(){
        this.play()
    }
    componentWillUnmount(){
        window.clearInterval(this.state.timer)
     }
    
    addNumber(){
        this.setState((state, props) => ({numero: state.numero + props.step}))
    }
    play(){
        window.clearInterval(this.state.timer)
        this.setState({ timer: window.setInterval(this.addNumber.bind(this),1000)})
    }
    pause()
    {
        window.clearInterval(this.state.timer)
        this.setState({
            timer:null
        })
    }
    toogle(){
        return this.state.timer ? this.pause() : this.play();
    }
    label(){
        return this.state.timer ? "Pause" : "Play";
    }
    reset(){
        this.pause()
        this.setState((state, props)=>({numero: props.start}))
        this.play()
    }
    render(){
        return <div>
            <h1> Valeur: {this.state.numero}</h1>
    <p><button onClick={this.toogle}>{this.label()}</button></p>
    <p><button onClick={this.reset}>Reinialiser le timer</button></p>
        </div>
    }
}
Incremente.defaultProps = {
    start: 0,
    step: 1
}
class ManualIncrementer extends React.Component{
    constructor(props){
        super(props)
        this.state = {n:0}
    }
    addNumber(){
        this.setState((state, props) => ({n: state.n + 1}))
    }
    dellNumber(){
        this.setState((state, props) => ({n: state.n - 1}))
    }
    render(){
        return <div>
            Valeur du {this.state.n} <button onClick={this.addNumber.bind(this)}>Incremeter</button>
            <button onClick={this.dellNumber.bind(this)}>Decrementer</button>
        </div>
    }
}
function Field ({value, name, onChange,children}) {
        return <div className="form-group">
                <label htmlFor={name}>mon champ {children}</label>
                <input type="text" value={value} onChange={onChange} name={name} className="form-control" />
        </div>
}
function Checkbox ({value, name, onChange,children}) {
    return <div className="form-check">
            <input type="checkbox" checked={value} onChange={onChange} name={name} className="form-check-input" />
            <label htmlFor={name} className="form-label-checkbox">{children}</label>
    </div>
}
class HomeForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nom: "",
            prenom: "",
            newsLetter: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        const name  = e.target.name
        const type = e.target.type
        const value = type ==='checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        const data = JSON.stringify(this.state);
        console.log(data);
        this.setState({
            nom: "",
            prenom: "",
            newsLetter: false
        })
    }
    render(){
        return <form className="container" onSubmit={this.handleSubmit}>
               <Field value={this.state.nom} onChange={this.handleChange} name="nom">Nom</Field>
               <Field value={this.state.prenom} onChange={this.handleChange} name="prenom">Prenom</Field>
               <Checkbox value={this.state.newsLetter} name="newsLetter" onChange={this.handleChange}>S'abonner a la news letter?</Checkbox>
               <div className="form-group">
                <button type="submit" className="btn btn-primary">Envoyer</button>
               </div>
             {JSON.stringify(this.state)}
        </form>
    }
} **/

