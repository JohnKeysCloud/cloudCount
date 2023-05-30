import Mustache from '../node_modules/mustache/mustache.mjs';

(function () {
  const clouds = {
		clouds: [],
		counters: {
			cirro: 0,
			cumulo: 0,
			nimbo: 0,
			strato: 0,
		},
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
      if (this.cloudSelect.selectedIndex === 0)
        return alert('Every cloud needs a silver lining 💭.');
			let cloud = this.cloudSelect.value;	
			if (this.counters.hasOwnProperty(cloud)) {
				this.counters[cloud]++;
				cloud = `${cloud} #${this.counters[cloud]}`;
			} else {
				return alert('Congratulations, you broke it 😅😒');
			}
			this.clouds.push(cloud);
      this.render();

      this.cloudSelect.selectedIndex = 0;
    },
		dissipateCloud: function (e) {
			if (!e.target.matches('.cloud-dissipate-button')) return;
			let cloudToRemove = e.target.closest('.cloud-encapsulator');
			let cloudToRemoveIndex = Array.from(cloudToRemove.parentNode.children).indexOf(cloudToRemove);
			this.clouds.splice(cloudToRemoveIndex, 1);
			this.render();
		}
	}; 
	
	clouds.init();
})();
