import BaseComponent from "../base-component.mjs";
import ActionEvent from "../state-context/action-event.mjs";

export default class RegionFilter extends BaseComponent {

    render() {
        console.log("Region Filter");
        // window.countriesAPI.search("ro").then(data => {
           
        // });
       
        const data = JSON.parse(
            `
            [{"flag":"https://restcountries.com/data/cmr.svg","name":"Cameroon","capital":"Yaoundé","region":"Africa","population":22709892},{"flag":"https://restcountries.com/data/com.svg","name":"Comoros","capital":"Moroni","region":"Africa","population":806153},{"flag":"https://restcountries.com/data/hrv.svg","name":"Croatia","capital":"Zagreb","region":"Europe","population":4190669},{"flag":"https://restcountries.com/data/fro.svg","name":"Faroe Islands","capital":"Tórshavn","region":"Europe","population":49376},{"flag":"https://restcountries.com/data/fsm.svg","name":"Micronesia (Federated States of)","capital":"Palikir","region":"Oceania","population":102800},{"flag":"https://restcountries.com/data/mne.svg","name":"Montenegro","capital":"Podgorica","region":"Europe","population":621810},{"flag":"https://restcountries.com/data/mar.svg","name":"Morocco","capital":"Rabat","region":"Africa","population":33337529},{"flag":"https://restcountries.com/data/rou.svg","name":"Romania","capital":"Bucharest","region":"Europe","population":19861408},{"flag":"https://restcountries.com/data/bgd.svg","name":"Bangladesh","capital":"Dhaka","region":"Asia","population":161006790},{"flag":"https://restcountries.com/data/bel.svg","name":"Belgium","capital":"Brussels","region":"Europe","population":11319511},{"flag":"https://restcountries.com/data/cyp.svg","name":"Cyprus","capital":"Nicosia","region":"Europe","population":847000},{"flag":"https://restcountries.com/data/lux.svg","name":"Luxembourg","capital":"Luxembourg","region":"Europe","population":576200},{"flag":"https://restcountries.com/data/mhl.svg","name":"Marshall Islands","capital":"Majuro","region":"Oceania","population":54880},{"flag":"https://restcountries.com/data/nru.svg","name":"Nauru","capital":"Yaren","region":"Oceania","population":10084},{"flag":"https://restcountries.com/data/nzl.svg","name":"New Zealand","capital":"Wellington","region":"Oceania","population":4697854},{"flag":"https://restcountries.com/data/rus.svg","name":"Russian Federation","capital":"Moscow","region":"Europe","population":146599183},{"flag":"https://restcountries.com/data/sur.svg","name":"Suriname","capital":"Paramaribo","region":"Americas","population":541638},{"flag":"https://restcountries.com/data/esh.svg","name":"Western Sahara","capital":"El Aaiún","region":"Africa","population":510713}]
            `
        );
        this.shadowRoot.dispatchEvent(new ActionEvent(
            "countries",
            data
        ));
    }

    templateFile() {
        return '/region-filter/region-filter.html';
    }

    cssFile() {
        return '/region-filter/region-filter.css';
    }

}