import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  // We use the same function to fetch data in the beginning , and to fetch country data when the country argument is given

  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`); //goes to url/daily  to getdaily data
    const modifiedData = data.map((dailyData) => ({
      //for each element of the array we have to return an object so we put it inside curly braces  {}
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    })); // by the end of this map modified data is an array with each element being an object in the form  { confirmed: 1233, deaths: 12323 , date: 123123 }
    return modifiedData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`); //just need data from the response , just need countries from data , double destructuring

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
