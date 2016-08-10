'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */

// define angular module/app
var formApp = angular.module('yapp').controller('FormCtrl', function ($scope, $http) {
			
			// create a blank object to hold our form information
			// $scope will allow this to pass between controller and view
			$scope.formData = {};

             
			// process the form
			$scope.appointment = function() {
			 	var config = {
                headers : { 'Content-Type': 'application/json' }}; 
            	config.headers.patientId = $scope.formData.patientId;
            	config.headers.doctorId = $scope.formData.doctorId;

				$http.post('https://4kd2ksjc12.execute-api.us-east-1.amazonaws.com/prod/patient/appointment',
					JSON.stringify({"appointmentSubject":$scope.formData.appointmentSubject, "appointmentDescription": $scope.formData.appointmentDescription, "appointmentDateTime": $scope.formData.appointmentDateTime.toISOString()})
					,config)
			        .success(function(data) {
			            console.log(data);
			            if (!data.success) {
			            	// if not successful, bind errors to error variables
			                $scope.errorName = data.errors.name;
			                $scope.errorSuperhero = data.errors.superheroAlias;
			            } else {
			            	// if successful, bind success message to message
			                $scope.message = data.message;
                                        $scope.errorName = '';
			                $scope.errorSuperhero = '';
			            }
			        });
			};

});

