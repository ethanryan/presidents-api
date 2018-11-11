class PresidentsApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	dataFetched: false,
      presidents: [],
      orderAscending: true
    } //state
    this.handleClick = this.handleClick.bind(this)
  } //constructor

  componentDidMount() {
    var url = `https://presidents-api.herokuapp.com/presidents/${"orderAscending"}`
    fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
    })
    .then(response => {
      //console.log("response is: ", response)
      if (response.ok) {
        response.json().then(json => {
          //console.log("json is: ", json);
          this.setState({ presidents: json });
        });
      }
    })
  } //componentDidMount

  handleClick() {
    console.log("handleClick called...")
    let newOrder = (this.state.orderAscending === true) ? "orderDescending" : "orderAscending"
    this.setState(state => ({
      orderAscending: !state.orderAscending
    }));
    this.updatePresidentsOrder(newOrder)
  } //handleClick

  updatePresidentsOrder(newOrder) {
    var url = `https://presidents-api.herokuapp.com/presidents/${newOrder}`
    fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
    })
    .then(response => {
      //console.log("response is: ", response)
      if (response.ok) {
        response.json().then(json => {
          //console.log("json is: ", json);
          this.setState({ presidents: json });
        });
      }
    })
  }

  render() {
    console.log('this.state is: ', this.state)
    return (
      <div className="red-presidents">
      <h1 className="header">U.S. Presidents</h1>

      <button id="order-button" onClick={this.handleClick}>Order {this.state.orderAscending ? "Descending" : "Ascending"}</button>

      <br></br>
      <br></br>

      <table>
      <thead>
      <tr>
      <td>President</td>
      <td>Birthday</td>
      <td>Birthplace</td>
      <td>Death day</td>
      <td>Death place</td>
      </tr>
      </thead>
      <tbody>
      {
        (this.state.presidents.length > 0) ? this.state.presidents.map(eachObj => (
          <tr key={eachObj.id}>
          <td>{eachObj.president}</td>
          <td>{eachObj.birthday}</td>
          <td>{eachObj.birthplace}</td>
          <td>{eachObj.deathday}</td>
          <td>{eachObj.deathplace}</td>
          </tr>)
        ) :
        <tr>
        <td>awaiting data...</td>
        <td>awaiting data...</td>
        <td>awaiting data...</td>
        <td>awaiting data...</td>
        <td>awaiting data...</td>
        </tr>
      }
      </tbody>
      </table>
      </div>
    )
  }
}

ReactDOM.render(<PresidentsApp />, document.querySelector("#app"))
