angular.module('myApp').factory('UserService', ['$http', function ($http) {
    'use strict';

    var host = '/api/Users';

    function find(params) {
        return $http.get(host + '/', {
            params: params
        });
    }

    function get(id) {
        return $http.get(host + '/' + id);
    }

    function save(params) {
        return $http.post(host + '/', params);
    }

    function login(params) {
        return $http.post('/rest/user/login', params);
    }

    function changePassword(passwords) {
        return $http.get('/rest/user/change-password?current='+ passwords.current +'&new=' + passwords.new + '&repeat=' + passwords.repeat);
    }

    return {
        find: find,
        get: get,
        save: save,
        login: login,
        changePassword: changePassword
    };
}]);