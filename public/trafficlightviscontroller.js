//var module = require('ui/modules').get('trafficlightvis');


import { uiModules } from 'ui/modules';
const module = uiModules.get('kibana/transform_vis', ['kibana']);

import { AggResponseTabifyProvider } from 'ui/agg_response/tabify/tabify';

module.controller('TrafficLightVisController', function ($scope, Private) {

  const tabifyAggResponse = Private(AggResponseTabifyProvider);

//	var metrics = $scope.metrics = [];
	var lines = $scope.lines = [];

	$scope.percentperlight=100;

  console.log("PercentPerLight="+$scope.percentperlight);

	$scope.processTableGroups = function (tableGroups)
	{
		if($scope.vis.params.numberOfLights>0)
		{
			$scope.percentperlight=100/$scope.vis.params.numberOfLights;
			console.log("Setting width traffic light width to:"+$scope.percentperlight);
		}

		var metrics=[];
		var i=0;
	  	tableGroups.tables.forEach(function (table)
		{
			if((i%$scope.vis.params.numberOfLights)==0)
			{
				metrics=[];
				lines.push(metrics);
			}


			if(table.tables == undefined)
			{
		    	table.columns.forEach(function (column, i)
				{
		      	  	metrics.push({
		        		label: column.title,
		        		value: table.rows[0][i]
		      	  	});
		    	});
			}
			else
			{
			  	table.tables.forEach(function (table2)
				{
			    	table2.columns.forEach(function (column, i)
					{
			      	  	metrics.push({
			        		label: table.key,
			        		value: table2.rows[0][i]
			      	  	});
			    	});
				});
			}
			i++;
      	});
	};

	$scope.$watch('esResponse', function (resp) {
	  if (resp) {
	    //metrics.length = 0;
		lines.length = 0;
	    $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
	  }
	});
});
