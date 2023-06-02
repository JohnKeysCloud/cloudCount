import Mustache from '../node_modules/mustache/mustache.mjs';
import { cloudCountModule } from './cloudCountModule.js';

// * Revealing Module Pattern

// ? skyModule
let skyModule = (function () {
  let clouds = [];
  let counters = {
    total: 0,
    cirrus: 0,
    cumulus: 0,
    nimbus: 0,
    stratus: 0,
  };

  // Cache DOM
  let cloudModuleElement = document.getElementById('sky-module');
  let cloudAddButton = cloudModuleElement.querySelector(
    '#cloud-generate-button'
  );
  let cloudSelect = cloudModuleElement.querySelector('#cloud-select');
  let sky = cloudModuleElement.querySelector('#sky');
  let cloudTemplate =
    cloudModuleElement.querySelector('#cloud-template').innerHTML;

  // Bind Events
  cloudAddButton.addEventListener('click', formCloud);
  sky.addEventListener('click', dissipateCloud);
  window.addEventListener('resize', _simulateWind);

  _render();

  function _render() {
    let newCloud;
    if (clouds.length > 0) {
      let tempElem = document.createElement('div');
      for (let i = 0; i < clouds.length; i++) {
        tempElem.innerHTML = Mustache.render(cloudTemplate, { clouds: clouds }); // * {1}
        newCloud = tempElem.lastElementChild;
      }

      sky.appendChild(newCloud);

      _simulateWind();
    }

    events.emit('cloudsChanged', counters);
    // * cloudCountModule.setClouds(counters); // {2}
  }

  function _simulateWind() {
    let clientWidth = sky.clientWidth;
    let clientHeight = sky.clientHeight;

    document.documentElement.style.setProperty('--client-width', `${clientWidth}px`);
    document.documentElement.style.setProperty('--client-height', `${clientHeight}px`);
  }

  function formCloud(value) {
    if (typeof value !== 'string' && cloudSelect.selectedIndex === 0)
      return alert('Every cloud needs a silver lining 💭.');

    let cloudTypeToForm =
      typeof value === 'string'
        ? value.toLowerCase().trim()
        : cloudSelect.value;
    // ? the argument would be an object if fired from click event listener

    if (!counters.hasOwnProperty(cloudTypeToForm))
      return alert(
        '💭 Cloud type not found! \n(Please enter "cirrus", "cumulus", "nimbus" or "stratus").'
      );

    counters[cloudTypeToForm]++;
    counters.total++;

    clouds.push(cloudTypeToForm);

    _render();

    cloudSelect.selectedIndex = 0;
  }

  function dissipateCloud(e) {
    if (!e.target.matches('.cloud-dissipate-button')) return;
    let cloudToDissipate = e.target.closest('.cloud-encapsulator');
    let cloudToDissipateIndex = Array.from(
      cloudToDissipate.parentNode.children
    ).indexOf(cloudToDissipate);
    let cloudTypeToDissipate =
      cloudToDissipate.querySelector('.cloud-type-text').textContent;

    if (!counters.hasOwnProperty(cloudTypeToDissipate))
      return alert('Congratulations, you broke it 😅😒');

    counters[cloudTypeToDissipate]--;
    counters.total--;
    events.emit('cloudsChanged', counters);
    // * cloudCountModule.setClouds(counters); // {2}

    clouds.splice(cloudToDissipateIndex, 1);

    cloudToDissipate.remove();
  }

  return {
    formCloud: formCloud,
    dissipateCloud: dissipateCloud,
  };
})();

window.skyModule = skyModule; // * {3}

// ! ---------------------------------------------------

/* 
* {1}
?	┌─────────────────────────────────────────────────────────────────────────────┐
?	│ By passing `{clouds: clouds}` as the data object, the Mustache          		│
?	│ rendering method knows that within the template, any occurences of      		│
?	│ `{{clouds}}` should be replaced with the value of the `clouds` array    		│
?	│ from the module's internal state.                                       		│
?	│                                                                         		│
?	│ The key in the data object is associated with the `{{clouds}}`          		│
?	│ occurences.                                                             		│
?	│ The value in the data object is associated with the actual array of     		│
?	│ clouds.                                                                 		│
?	└─────────────────────────────────────────────────────────────────────────────┘
 */

/* 
* {2}
?  ┌─────────────────────────────────────────────────────────────────────────┐
?  │ this is an example of modules being tightly coupled                     │
?  │ becuase the skyModule is calling a method on the cloudCountModule       │
?  │ this is not ideal because it means that the skyModule is dependent on   │
?  │ the cloudCountModule                                                    │
?  │ if the cloudCountModule changes, the skyModule will break               │
?  │ this is why we use an event emitter to communicate between modules      │
?  │ the skyModule doesn't care what happens to the cloudCountModule         │
?  │ it just needs to know when the cloudCountModule changes so that it can  │
?  │ update the                                                              │
?  │ DOM                                                                     │
?  └─────────────────────────────────────────────────────────────────────────┘
 */

/*
* {3} 
?  ┌─────────────────────────────────────────────────────────────────────────┐
?  │ Module needs exposure to the global scope so that the tests can         │
?  │ access it                                                               │                                                                      │
?  │ It is currently inaccessable because the type="module" attribute on     │
?  │ the script tag prevents it from being exposed       										 │
?  └─────────────────────────────────────────────────────────────────────────┘
 */
