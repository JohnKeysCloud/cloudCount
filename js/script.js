import Mustache from '../node_modules/mustache/mustache.mjs';

// * Module Pattern
// (function () {
//   const clouds = {
// 		clouds: [],
// 		counters: {
// 			cirro: 0,
// 			cumulo: 0,
// 			nimbo: 0,
// 			strato: 0,
// 		},
//     init: function () {
// 			this.cacheDom();
// 			this.bindEvents();
//       this.render();
// 		},
//     cacheDom: function () {
// 			this.cloudModuleElement = document.getElementById('cloud-module');
// 			this.cloudAddButton = this.cloudModuleElement.querySelector('#cloud-generate-button');
// 			this.cloudSelect = this.cloudModuleElement.querySelector('#cloud-select');
// 			this.sky = this.cloudModuleElement.querySelector('#sky');
// 			this.cloudTemplate = this.cloudModuleElement.querySelector('#cloud-template').innerHTML;
// 		},
// 		bindEvents: function () {
// 			this.cloudAddButton.addEventListener('click', this.formCloud.bind(this));
// 			this.sky.addEventListener('click', this.dissipateCloud.bind(this));
// 		},
// 		render: function () {
//       let data = {
//         clouds: this.clouds,
//       };
//       this.sky.innerHTML = Mustache.render(this.cloudTemplate, data); // * {1}
//     },
// 		formCloud: function () {
//       if (this.cloudSelect.selectedIndex === 0)
//         return alert('Every cloud needs a silver lining 💭.');
// 			let cloud = this.cloudSelect.value;	
// 			if (this.counters.hasOwnProperty(cloud)) {
// 				this.counters[cloud]++;
// 				cloud = `${cloud} #${this.counters[cloud]}`;
// 			} else {
// 				return alert('Congratulations, you broke it 😅😒');
// 			}
// 			this.clouds.push(cloud);
//       this.render();

//       this.cloudSelect.selectedIndex = 0;
//     },
// 		dissipateCloud: function (e) {
// 			if (!e.target.matches('.cloud-dissipate-button')) return;
// 			let cloudToRemove = e.target.closest('.cloud-encapsulator');
// 			let cloudToRemoveIndex = Array.from(cloudToRemove.parentNode.children).indexOf(cloudToRemove);
// 			this.clouds.splice(cloudToRemoveIndex, 1);
// 			this.render();
// 		}
// 	};  
	
// 	clouds.init();
// })();

// ! ---------------------------------------------------

// * Revealing Module Pattern
let skyModule = (function () { 
	let clouds = [];
	let counters = {
		cirro: 0,
		cumulo: 0,
		nimbo: 0,
		strato: 0,
	};

	// Cache DOM
	let cloudModuleElement = document.getElementById('sky-module');
	let cloudAddButton = cloudModuleElement.querySelector('#cloud-generate-button');
	let cloudSelect = cloudModuleElement.querySelector('#cloud-select');
	let sky = cloudModuleElement.querySelector('#sky');
	let cloudTemplate = cloudModuleElement.querySelector('#cloud-template').innerHTML;

	// Bind Events
	cloudAddButton.addEventListener('click', formCloud);
	sky.addEventListener('click', dissipateCloud);

	_render();

  function _render() {
    sky.innerHTML = Mustache.render(cloudTemplate, { clouds: clouds }); // * {1}
	};

	function formCloud(value) {
    let cloudType = typeof value === 'string' ? value.toLowerCase().trim() : cloudSelect.value;
    // ? the argument would be an object if fired from click event listener

    if (typeof value !== 'string' && cloudSelect.selectedIndex === 0)
      return alert('Every cloud needs a silver lining 💭.');

    if (counters.hasOwnProperty(cloudType)) {
      counters[cloudType]++;
      cloudType = `${cloudType} #${counters[cloudType]}`;
    } else {
      return alert('💭 Cloud type not found! \n(Please enter "cirro", "cumulo", "nimbo" or "strato").');
    }

    clouds.push(cloudType);

    _render();

    cloudSelect.selectedIndex = 0;
	};
	
  function dissipateCloud(e) {
    if (!e.target.matches('.cloud-dissipate-button')) return;
    let cloudToRemove = e.target.closest('.cloud-encapsulator');
    let cloudToRemoveIndex = Array.from(
      cloudToRemove.parentNode.children
    ).indexOf(cloudToRemove);
    clouds.splice(cloudToRemoveIndex, 1);
    _render();
	};
	
	return {
		formCloud: formCloud,
		dissipateCloud: dissipateCloud,
	};
})();

// ! ---------------------------------------------------

window.skyModule = skyModule; // * {2}

/* 
* {1}
?	┌─────────────────────────────────────────────────────────────────────────────┐
?	│     By passing `{clouds: clouds}` as the data object, the Mustache          │
?	│     rendering method knows that within the template, any occurences of      │
?	│     `{{clouds}}` should be replaced with teh value of the `clouds` array    │
?	│     from the module's internal state.                                       │
?	│                                                                             │
?	│     The key in the data object is associated with the `{{clouds}}`          │
?	│ 		occurences.                                                             │
?	│     The value in the data object is associated with the actual array of     │
?	│ 		clouds.                                                                 │
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