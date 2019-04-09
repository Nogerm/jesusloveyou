import axios from 'axios';

//Mongo DB
const BASE_URL = 'https://api.mlab.com/api/1/';
const API_KEY = 'tLCbdkrVRTli_sKDGTHQrKrCTs9R4Zvt';
const dbName = 'heroku_n6ll7jq5';

//Collections
const ROUTINE_PERSON = 'routine_person';
const ROUTINE_REMIND = 'routine_remind';

//Query URLs
const ROUTINE_PERSON_URL = BASE_URL + 'databases/' + dbName + '/collections/' + ROUTINE_PERSON;
const ROUTINE_REMIND_URL = BASE_URL + 'databases/' + dbName + '/collections/' + ROUTINE_REMIND;

//------------------
//Routine rule
//------------------
export const getRoutineRule = function() {
	return new Promise((resolve, reject) => {
		axios.get(ROUTINE_PERSON_URL, {
				params: {
					apiKey: API_KEY
				}
			})
			.then(function (response) {
				console.log("[getRoutineRule]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[getRoutineRule]" + error);
				reject(error);
			});
	})
}

export const addRoutineRule = function(newData) {
  return new Promise((resolve, reject) => {
      axios.post(ROUTINE_PERSON_URL + '?apiKey=' + API_KEY, {
      _id: newData.id,
			month: newData.month,
			routines: newData.routines
    })
    .then(function (response) {
      console.log("[addRoutineRule]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[addRoutineRule]" + error);
      reject(error);
    });
  })
}

export const updateRoutineRule = function(newData) {
	return new Promise((resolve, reject) => {
  	axios.put(ROUTINE_PERSON_URL + '/' + newData.id + '?apiKey=' + API_KEY, {
      _id: newData.id,
			month: newData.month,
			routines: newData.routines
    })
    .then(function (response) {
      console.log("[updateRoutineRule]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[updateRoutineRule]" + error);
      reject(error);
    });
  })
}

export const removeRoutineRule = function(reminderId) {
	return new Promise((resolve, reject) => {
		axios.delete(ROUTINE_PERSON_URL + '/' + reminderId + '?apiKey=' + API_KEY)
			.then(function (response) {
				console.log("[removeRoutineRule]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[removeRoutineRule]" + error);
				reject(error);
			});
	})
}

//------------------
//Routine reminder
//------------------
export const getRoutineReminder = function() {
	return new Promise((resolve, reject) => {
		axios.get(ROUTINE_REMIND_URL, {
				params: {
					apiKey: API_KEY
				}
			})
			.then(function (response) {
				console.log("[getRoutineReminder]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[getRoutineReminder]" + error);
				reject(error);
			});
	})
}

export const addRoutineReminder = function(newData) {
  return new Promise((resolve, reject) => {
      axios.post(ROUTINE_REMIND_URL + '?apiKey=' + API_KEY, {
      _id: newData.id,
      msgs: [...newData.msgs]
    })
    .then(function (response) {
      console.log("[addRoutineReminder]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[addRoutineReminder]" + error);
      reject(error);
    });
  })
}

export const updateRoutineReminder = function(id, msgs) {
	return new Promise((resolve, reject) => {
  	axios.put(ROUTINE_REMIND_URL + '/' + id + '?apiKey=' + API_KEY, {
      _id: id,
      msgs: [...msgs]
    })
    .then(function (response) {
      console.log("[updateRoutineReminder]" + response);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("[updateRoutineReminder]" + error);
      reject(error);
    });
  })
}

export const removeRoutineReminder = function(reminderId) {
	return new Promise((resolve, reject) => {
		axios.delete(ROUTINE_REMIND_URL + '/' + reminderId + '?apiKey=' + API_KEY)
			.then(function (response) {
				console.log("[removeRoutineReminder]" + response);
				resolve(response.data);
			})
			.catch(function (error) {
				console.log("[removeRoutineReminder]" + error);
				reject(error);
			});
	})
}
