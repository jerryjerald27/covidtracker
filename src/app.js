import React, { Component } from "react";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";

import { Cards, Chart, CountryPicker } from "./components";

class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({
      data: fetchedData,
    });
  }

  handleCountryChange = async (country) => {
    console.log(country);
    const fetchedData = await fetchData(country);
    this.setState({
      data: fetchedData,
      country: country,
    });
  };

  render() {
    const { data, country } = this.state; //doing this to avoid using this.state.data and just write data
    return (
      <div className={styles.container}>
        <img className={styles.image} alt="Covid19" src={coronaImage} />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
