var app = angular.module('myApp', ['js-data']);

angular.module('myApp').config(function (DSProvider, DSHttpAdapterProvider) {
        angular.extend(DSProvider.defaults, {keepChangeHistory: true});
        angular.extend(DSHttpAdapterProvider.defaults, {basePath:'http://localhost:3000/api', default:true});
});

angular.module('myApp').factory('User', function (DS) {
    return DS.defineResource({
        name:'user'
        , endpoint:'users'
        , relations: {
            hasMany: {
                cat: {
                    localFiled:'cats',
                    foreignKey:'userId'
                }
            }
        }
    });
});



angular.module('myApp').factory('Cat', function (DS) {
    return DS.defineResource({
        name:'cat'
        , endpoint:'cats'
        , relations: {
            belongsTo: {
                user: {
                    parent: true,
                    localKey: 'userId',
                    localField: 'user'
                }
            }
        }
    });
});


app.controller('userCtrl', function ($scope, User) {
    $scope.users = [];
    User.findAll().then(function(data){
       $scope.users = data;
    });
});