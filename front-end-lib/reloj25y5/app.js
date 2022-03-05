const RESET = "RESET"
const SETSESSIONSSECONDS = "SETSESSIONSSECONDS"
const SETBREAKSECONDS = "SETBREAKSECONDS"
const SETSECONDSLEFT = "SETSECONDSLEFT"
const SETPERIODNAME = "SETPERIODNAME"
const SESSION = "Session"
const BREAK = "BREAK"
const CHANGEPERIOD = "CHANGEPERIOD"
const resetAction = () => ({type: RESET})
const setSessionSecondsAction = (seconds) => ({type: SETSESSIONSSECONDS, seconds})
const setBreakSecondsAction = (seconds) => ({type: SETBREAKSECONDS, seconds})
const setSecondsLeftAction = (seconds) => ({type: SETSECONDSLEFT, seconds})
const setPeriodNameAction = (name) => ({type: SETPERIODNAME, name})
const changePeriodAction = () => ({type: CHANGEPERIOD})
const periodReducer = (state = {
    breakSeconds: 5 * 60,
    sessionSeconds: 25 * 60,
    secondsLeft: 25 * 60,
    periodName: SESSION
}, action) => {
    switch (action.type) {
        case CHANGEPERIOD: {
            let secondsLeft = (state.periodName === SESSION) ? state.breakSeconds : state.sessionSeconds
            let periodName = state.periodName === SESSION ? BREAK : SESSION
            return {
                breakSeconds: state.breakSeconds,
                sessionSeconds: state.sessionSeconds,
                secondsLeft,
                periodName
            }
        }
        case SETPERIODNAME:
            return {
                breakSeconds: state.breakSeconds,
                sessionSeconds: state.sessionSeconds,
                secondsLeft: state.secondsLeft,
                periodName: action.name,
            }

        case SETSESSIONSSECONDS: {
            let secondsLeft = state.periodName === SESSION ? action.seconds : state.secondsLeft;
            return {
                breakSeconds: state.breakSeconds,
                sessionSeconds: action.seconds,
                secondsLeft,
                periodName: state.periodName,
            }
        }
        case SETBREAKSECONDS: {
            let secondsLeft = state.periodName === BREAK ? action.seconds : state.secondsLeft;
            return {
                breakSeconds: action.seconds,
                sessionSeconds: state.sessionSeconds,
                secondsLeft,
                periodName: state.periodName,
            }
        }
        case SETSECONDSLEFT:
            return {
                breakSeconds: state.breakSeconds,
                sessionSeconds: state.sessionSeconds,
                secondsLeft: action.seconds,
                periodName: state.periodName,
            }
        case RESET:
            return {
                breakSeconds: 5 * 60,
                sessionSeconds: 25 * 60,
                secondsLeft: 25 * 60,
                periodName: SESSION
            }
        default:
            return state;
    }
}
const store = Redux.createStore(periodReducer)

//React
const secondsToMMSS = (seconds) => {
    let mm = parseInt(seconds / 60);
    let ss = parseInt(seconds % 60);
    let mmss = mm < 10 ? "0" + mm : "" + mm;
    mmss += ss < 10 ? ":0" + ss : ":" + ss;
    return mmss;
}
class Period extends React.Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }
    increment() {
        if (this.props.seconds < 3600) {
            let seconds = this.props.seconds + 60;
            this.props.setSeconds(seconds)
        }
    }
    decrement() {
        if (this.props.seconds > 60) {
            let seconds = this.props.seconds - 60;
            this.props.setSeconds(seconds)
        }
    }
    render() {
        let periodLabel = lengthComponent({id: this.props.name + "-label", text: this.props.name})
        let periodLength = React.createElement("h2", {id: this.props.name + "-length"}, [parseInt(this.props.seconds / 60)])
        let periodDec = clickeables({id: this.props.name + "-decrement", text: `${this.props.name} Decrement`, click: this.decrement})
        let periodInc = clickeables({id: this.props.name + "-increment", text: `${this.props.name} Increment`, click: this.increment})
        let periodPanel = panel({className: "periodPanel"}, [periodLabel, periodLength, periodDec, periodInc])
        return periodPanel;
    }
}
class CountDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start_stop: "start",
            audio: undefined
        }
        this.reset = this.reset.bind(this);
        this.startStop = this.startStop.bind(this)
    }
    componentDidMount() {
        const audio = document.getElementById("beep")
        this.setState({audio})
    }
    startStop() {
        if (this.state.start_stop === "start") {
            const interval = setInterval(() => {
                if (this.props.secondsLeft === 0) {
                    if (this.state.audio)
                        this.state.audio.play();
                    this.props.changePeriod();
                } else {
                    this.props.setSecondsLeft(this.props.secondsLeft - 1)
                }
            }, 1000);
            this.setState({interval});
        } else {
            clearInterval(this.state.interval)
        }
        this.setState((oldState) => ({
            start_stop: oldState.start_stop === "start" ? "stop" : "start"
        }));
    }
    reset() {
        this.setState(() => {
            this.props.resetAll();
            clearInterval(this.state.interval)
            if (this.state.audio) {
                this.state.audio.pause();
                this.state.audio.load();
                this.state.audio.currentTime = 0;
            }
            return {start_stop: "start"}
        })
    }
    render() {
        let timer = React.createElement("div", {id: this.props.name + "-label", }, [this.props.periodName])
        let timeLeft = React.createElement("div", {id: "time-left"}, [secondsToMMSS(this.props.secondsLeft)]);
        let start = clickeables({id: "start_stop", text: this.state.start_stop, click: this.startStop})
        let reset = clickeables({id: "reset", click: this.reset, text: "Reset"})
        let audio = React.createElement("audio", {
            id: "beep", preload: "auto",
            src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        })
        return React.createElement("div", {}, [timer, timeLeft, start, reset, audio])
    }
}

const breakStateToProps = (state) => ({seconds: state.breakSeconds})
const sessionStateToProps = (state) => ({seconds: state.sessionSeconds})
const breakDispatch = (dispatch) => ({setSeconds: (seconds) => {dispatch(setBreakSecondsAction(seconds))}})
const sessionDispatch = (dispatch) => ({setSeconds: (seconds) => {dispatch(setSessionSecondsAction(seconds))}})
const countDownStateToProps = (state) => ({
    secondsLeft: state.secondsLeft,
    periodName: state.periodName
})
const countDownDispatch = (dispatch) => ({
    setSecondsLeft: (seconds) => {dispatch(setSecondsLeftAction(seconds))}
    , setPeriodName: (name) => {dispatch(setPeriodNameAction(name))}, resetAll: () => {dispatch(resetAction())},
    changePeriod: () => {dispatch(changePeriodAction())}
})
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.store.getState(),
        }
    }
    componentDidMount() {
        let sub = this.props.store.subscribe(() => {
            this.setState({...this.props.store.getState()})
        })
        this.setState(() => ({sub}))
    }
    componentWillUnmount() {
        this.state.sub();
    }
    render() {
        let breakPanel = React.createElement(Period, {
            name: "break", ...breakStateToProps(this.state),
            ...breakDispatch(this.props.store.dispatch)
        })
        let sessionPanel = React.createElement(Period, {
            name: "session", ...sessionStateToProps(this.state)
            , ...sessionDispatch(this.props.store.dispatch)
        })
        let countDown = React.createElement(CountDown, {
            name: "timer", ...countDownStateToProps(this.state),
            ...countDownDispatch(this.props.store.dispatch),
        })
        return React.createElement("div", {id: "timer-root"}, [breakPanel, sessionPanel, countDown])
    }
}
const lengthComponent = (props) => React.createElement("div", {id: props.id}, [props.text])
const clickeables = (props) => React.createElement("button", {id: props.id, onClick: props.click}, [props.text])
const panel = (props, childs) => React.createElement("span", {className: props.className, id: props.id}, childs)
const domContainer = document.querySelector("#app");
ReactDOM.render(React.createElement(App, {store, }), domContainer);
