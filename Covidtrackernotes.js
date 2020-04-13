Project Dependencis 

npm install --save axios chart.js react-chartjs-2 react-countup @material-ui/core classnames

--------
If youhave mulitple components to import 
Dont crowd your app.js with import statements 
Put all you components in one folder 
and in app.js write 

import { Cards, Chart, CountryPicker } from "./components";

and in the components Folder adda index.js that specifies the location of each of the component 

export { default as Cards } from "./Cards/Cards";
export { default as Chart } from "./Chart/Chart";
export { default as CountryPicker } from "./CountryPicker/CountryPicker";

------------------

TIP

name your css files as .module.css 
eg 

Cards.module.css
----------------------
#Cards.module.css 

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
------------------------
and when your importing the style in your Cards.js 
use 

import styles from './Cards.module.css'

and when you apply style classes 

and you want to apply the container class to a div 
instead of 
<div className ="container">

use 
<div className={styles.container}>
This makes sure you dont have any interference from other css files from other components 


-------
If you just specify afolder name when you import 
import xyz from './api' it looks for index file . You dont have to specify index

If you need named impots use 
import {name of the function } from './location'
----------
API calls using axios 

use await 
specify async 

------------------------------------------
import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async () => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
  	console.log(error)
  }
};

---------------------------------------

Add an api call in app.js in componentDidMount 

  async componentDidMount() {
    const data = await fetchData();
    console.log(data);
  }


----
In this example we just need 'data' field ofthe api response so we use object destructuring 

instead of 
const response = await axios.get(url);

we use 

const {data} = await axios.get(url); //means const data = data portion of the response 

And now from the data field we only need specified subfields .. SO we modify the response and make an object that 
only needs the fields we need 


const {data} = await axios.get(url);
const dataWeneed = {
	 confirmed : data.confirmed,
       recovered : data.recovered,
       deaths: data.deaths,
       lastUpdate: data.lastUpdate
}

return dataWeNeed


we can simply this further .. 

const { data : { confirmed, recovered, deaths, lastUpdate}} = await axios.get(url)
const dataWeNeed = {
	confirmed: confirmed,
	recovered : recovered,
	deaths: deaths,
	lastUpdate: lastUpdate
}
return dataWeneed

we can simplify this again because if key and value pairs have same name , you only have to write in once 

const { data : { confirmed, recovered, deaths, lastUpdate}} = await axios.get(url)
const dataWeNeed = {
	confirmed,
	recovered,
	deaths,
	lastUpdate
}
return dataWeneed

more simplified to 

const { data : { confirmed, recovered, deaths, lastUpdate}} = await axios.get(url)
return  { 	confirmed,	recovered,	deaths,	lastUpdate}

now when you call this function from anywhere 

const data = await fetchData();
console.log(data)
this data will only have the four attributes we need 
So youre not storing uneccessary data 


------------
to write in state for class you dont need constructor anymore 

earlier 

constructor(){
	super()
	this.state = {
		//state
	}
}

now you can just write 

state = {

}



=-----------------

Using useState 

const [dailyData, setDailyData] = useState({}) ; 

is the same as 

state = {
	dailyData = {}
}

and we use setDailyData instead of this.setState()


--------------------

Using useEffect 

