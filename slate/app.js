(function(){



var CLIENT_ID = "eYVZKUOWAYV2AICnVX3xn9ebVz0Hj5TB"; // Retrieve this key from the developer portal
  var CLIENT_SECRET = "JIYgwIvKK0Lj4hlq"; // Retrieve this key also from the developer portal

  var BASE_URL = "https://gateway.api.pcftest.com:9004"; // HTTPS url
  var BASE_URL_GET_TOKEN = BASE_URL + "/v1/oauth2/token?grant_type=client_credentials";
  var BASE_URL_LOGIN = BASE_URL + "/v1/oauth2/authorize/login";
  var BASE_URL_LOGOUT = BASE_URL + "/v1/oauth2/authorize/logout";
  var BASE_FHIR_INFO_URL = BASE_URL + "/v1/fhir_rest";
  var BASE_URL_PATIENT = BASE_FHIR_INFO_URL + "/Patient/";
  var BASE_URL_ORGANIZATION = BASE_FHIR_INFO_URL + "/Organization/";
  var BASE_URL_OBSERVATION = BASE_FHIR_INFO_URL + "/Observation";

  var GLUCOSE_LOINC = "2339-0";
var patient_id = "a102";

httputil = {};
httputil.getPatientData = function(successcallback) {

};

httputil.getObservation = function( code) {
  $.ajax({
        url: BASE_URL_OBSERVATION + '?subject:_id=' + patient_id + '&name=' + code + '&_sort:asc=date&_count=50', //+ '&date=>' + startDate,
        method: "GET",
        headers: {'Authorization':'Bearer woHg3Qu5vjXQdOxd28KGVJQhInr2','Accept':'application/json'},
        success: function (data, status, headers, config) {
          console.log(data);
        }
      });

};

httputil.getPatientData = function() {
  $.ajax({
    url: BASE_URL_PATIENT + patient_id,
    method: "GET",
    headers: {'Authorization':'Bearer woHg3Qu5vjXQdOxd28KGVJQhInr2','Accept':'application/json'},
    success: function (data, status, headers, config) {
          console.log(data);
          $("#name").html(data.name[0].text + ", 69" )

        }
  });

};

httputil.getPatientData();
httputil.getObservation();

}());