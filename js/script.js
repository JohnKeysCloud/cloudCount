import Mustache from '../node_modules/mustache/mustache.mjs';

(function () {
  const clouds = {
    clouds: [],
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
		},
		render: function () {
			let data = {  
				clouds: this.clouds,
			};
			this.sky.innerHTML = Mustache.render(this.cloudTemplate, data);
		},
		addCloud: function () {
			let cloud = this.cloudSelect.selected;
			this.clouds.push(cloud);
			this.render();
			this.cloudSelect.selectedIndex = 0;
		},
	}; 
	
	clouds.init();
})();
