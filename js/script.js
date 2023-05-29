import Mustache from '../node_modules/mustache/mustache.mjs';

(function () {
  const clouds = {
    clouds: ['test'],
    init: function () {
			this.cacheDom();
			this.bindEvents();
      this.render();
		},
    cacheDom: function () {
			this.cloudModuleElement = document.getElementById('cloud-module');
			this.cloudAddButton = this.cloudModuleElement.querySelector('#cloud-generate-button');
			this.cloudSelect = this.cloudModuleElement.querySelector('#cloud-select');
			this.sky = this.cloudModuleElement.querySelector('#sky');
			this.cloudTemplate = this.cloudModuleElement.querySelector('#cloud-template').innerHTML;
		},
		bindEvents: function () {
			this.cloudAddButton.addEventListener('click', this.addCloud.bind(this));
			this.sky.addEventListener('click', this.dissipateCloud.bind(this));
		},
		render: function () {
			let data = {  
				clouds: this.clouds,
			};
			this.sky.innerHTML = Mustache.render(this.cloudTemplate, data);
		},
		addCloud: function () {
			// ! add logic that adds number to new cloud string for removal purposes
			// ! add logic that adds number to new cloud string for removal purposes
			// ! add logic that adds number to new cloud string for removal purposes
			if (this.cloudSelect.selectedIndex === 0) return alert('Every cloud needs a silver lining 💭.');
			let cloud = this.cloudSelect.value;
			this.clouds.push(cloud);
			this.render();

			this.cloudSelect.selectedIndex = 0;
		},
		dissipateCloud: function (e) {
			if (!e.target.matches('.cloud-dissipate-button')) return;
			alert('I\'m workin\' on it -_-');

			// ! get index of cloud 
			// this.clouds.splice(i, 1);
			// this.render();
		}
	}; 
	
	clouds.init();
})();
