


export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'trafficlightvis',
    uiExports: {
      visTypes: ['plugins/trafficlightvis/trafficlightvis']


    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },



  });
};
