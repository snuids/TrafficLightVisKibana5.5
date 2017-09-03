import 'plugins/trafficlightvis/trafficlightviscontroller.js';
import 'plugins/trafficlightvis/trafficlightvis.css';

import { TemplateVisTypeProvider } from 'ui/template_vis_type/template_vis_type'
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisSchemasProvider } from 'ui/vis/schemas'

VisTypesRegistryProvider.register(TrafficLightProvider);

console.log("COUCOUO3")

function TrafficLightProvider(Private) {

console.log("TemplateVisTypeProvider")
	console.log(TemplateVisTypeProvider)
	console.log("VisSchemasProvider")
	console.log(VisSchemasProvider)

	const TemplateVisType = Private(TemplateVisTypeProvider);
	const Schemas = Private(VisSchemasProvider);

	// return the visType object, which kibana will use to display and configure new
	// Vis object of this type.
	return new TemplateVisType({
	  name: 'trafficlight',
	  title: 'Traffic Light',
	  description: 'Great for one-glance status readings, the traffic light visualization expresses in green / yellow / red the position of a single value in relation to low and high thresholds.',
	  icon: 'fa-car',
	  template: require('plugins/trafficlightvis/trafficlightvis.html'),
	  params: {
	    defaults: {
		  max:1000000,
	      width: 50,
	      redThreshold: 20,
	      greenThreshold: 80,
	      invertScale: false,
			numberOfLights:10
	    },
	    editor: require('plugins/trafficlightvis/trafficlightvisparams.html')
	  },
	  schemas: new Schemas([
	    {
	      group: 'metrics',
	      name: 'metric',
	      title: 'Metric',
	      min: 1,
	      defaults: [
	        { type: 'count', schema: 'metric' }
	      ]
	    },
		{
		        group: 'buckets',
		        name: 'split',
		        title: 'Split Chart',
		        min: 0,
		        max: 1,
		        aggFilter: '!geohash_grid'
		      }
	  ])
	});
};

// export the provider so that the visType can be required with Private()
export default TrafficLightProvider;
