import Mustache from '../node_modules/mustache/mustache.mjs';

// ? cloudCountModule
export let cloudCountModule = (function () {
	let cloudCount = {};

	// Cache DOM
	let cloudCountModuleElement = document.getElementById('cloud-count-module');
	let cloudCountUL = cloudCountModuleElement.querySelector('#cloud-count-ul');
	let cloudCountTemplate = cloudCountModuleElement.querySelector('#cloud-count-template').innerHTML;
	
	events.on('cloudsChanged', setClouds);
	_render();

	function _render() {
    let cloudCounters = Object.entries(cloudCount).map(([key, value]) => ({key,value})); // * {1}

    cloudCountUL.innerHTML = Mustache.render(cloudCountTemplate, { cloudCounters: cloudCounters });
	};

	function setClouds(counters) {
		cloudCount = counters;

		_render();
	};

	// * {2}
	// return {
	// 	setClouds: setClouds,
	// };
})();

// ! ---------------------------------------------------

/* 
* {1}
?  ┌─────────────────────────────────────────────────────────────────────────┐
?  │ Object.entries() returns an array of arrays of key-value pairs from an  │
?  │ object:                                                                 │
?  │ [['total', 0], ['cirro', 0], ['cumulo', 0], ['nimbo', 0], ['strato',    │
?  │ 0]];                                                                    │
?  │ .map() returns a new array of objects with the key and value            │
?  │ properties:                                                             │
?  │ [{key: 'total', value: 0}, {key: 'cirro', value: 0}, {key: 'cumulo',    │
?  │ value: 0}, { key: 'nimbo', value: 0 }, { key: 'strato', value: 0 }];    │
?  └─────────────────────────────────────────────────────────────────────────┘
 */

/* 
* {2}
?  ┌─────────────────────────────────────────────────────────────────────────┐
?  │ this API is no longer necessary because we are using an event           │
?  │ emitter to communicate between modules.                                 │
?  └─────────────────────────────────────────────────────────────────────────┘
 */