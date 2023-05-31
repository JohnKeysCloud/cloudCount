import Mustache from '../node_modules/mustache/mustache.mjs';

// ? skyModule
let skyModule = (function () {
  let clouds = [];
  let counters = {
    total: 0,
    cirro: 0,
    cumulo: 0,
    nimbo: 0,
    strato: 0,
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

  _render();

  function _render() {
    sky.innerHTML = Mustache.render(cloudTemplate, { clouds: clouds }); // * {1}
    cloudCountModule.setClouds(counters);
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
        '💭 Cloud type not found! \n(Please enter "cirro", "cumulo", "nimbo" or "strato").'
      );

    counters[cloudTypeToForm]++;
    counters.total++;

    clouds.push(cloudTypeToForm);

    _render();

    cloudSelect.selectedIndex = 0;
  }

  function dissipateCloud(e) {
    if (!e.target.matches('.cloud-dissipate-button')) return;
    let cloudToRemove = e.target.closest('.cloud-encapsulator');
    let cloudToRemoveIndex = Array.from(
      cloudToRemove.parentNode.children
    ).indexOf(cloudToRemove);
    let cloudTypeToDissipate =
      cloudToRemove.querySelector('.cloud-type-text').textContent;

    if (!counters.hasOwnProperty(cloudTypeToDissipate))
      return alert('Congratulations, you broke it 😅😒');

    counters[cloudTypeToDissipate]--;
    counters.total--;

    clouds.splice(cloudToRemoveIndex, 1);

    _render();
  }

  return {
    formCloud: formCloud,
    dissipateCloud: dissipateCloud,
  };
})();

window.skyModule = skyModule; // * {2}

// ! ---------------------------------------------------

/* 
* {1}
?	┌─────────────────────────────────────────────────────────────────────────────┐
?	│ By passing `{clouds: clouds}` as the data object, the Mustache          		│
?	│ rendering method knows that within the template, any occurences of      		│
?	│ `{{clouds}}` should be replaced with teh value of the `clouds` array    		│
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
?  │ Module needs exposure to the global scope so that the tests can         │
?  │ access it                                                               │                                                                      │
?  │ It is currently inaccessable because the type="module" attribute on     │
?  │ the script tag prevents it from being exposed       										 │
?  └─────────────────────────────────────────────────────────────────────────┘
 */
