(function() {
    var app;

    app = angular.module('example-app', []);

    app.service('iRService', function($rootScope) {
        var ir;
        ir = new IRacing([
            'Speed',
            'RPM',
            'Gear',
            'dcBrakeBias',
            'dcPitSpeedLimiterToggle',
            'dcHysNoBoostToggle',
            'dcHysBoostHold',
            'dcHeadlightFlash',
            'LapDeltaToSessionBestLap',
            'LapDeltaToSessionOptimalLap',
            'LapDeltaToSessionLastlLap',
            'PlayerCarClassPosition',
            'dcTractionControl3',
            'dcMGUKDeployFixed',
            'PlayerCarTeamIncidentCount',
            'IsOnTrack',
            'dcABS',
            'WeekendInfo',
            'EnergyERSBatteryPct',
            'EnergyMGU_KLapDeployPct',
            'PowerMGU_K',
            'FuelLevel',
            'LapLastLapTime',
            'LapBestLapTime',
            'LapOptimalLapTime',
            'SessionTimeRemain',
            'OnPitRoad',
            'PlayerCarIdx',
            'dcTractionControl',
            'ShiftIndicatorPct',
            'DriverInfo',
        ], [], 30);

        ir.onConnect = function() {
            return console.log('connected');
        };
        ir.onDisconnect = function() {
            return console.log('disconnected');
        };
        ir.onUpdate = function(keys) {

            $rootScope.mguCharging = Math.abs(ir.data['PowerMGU_K']);

            return $rootScope.$apply();
        };

        return ir;
    });

    // app.service('iRService', function($rootScope) {
    //
    //     var ir;
    //     ir = {
    //         data : {
    //             Speed: 90,
    //             RPM: 4654,
    //             Gear: 6,
    //             dcBrakeBias: 51,
    //             dcPitSpeedLimiterToggle: false,
    //             dcHysNoBoostToggle: false,
    //             dcHysBoostHold: false,
    //             dcHeadlightFlash: false,
    //             LapDeltaToSessionLastlLap: -2.44,
    //             LapDeltaToSessionBestLap: -1.24,
    //             LapDeltaToSessionOptimalLap: 2.54,
    //             PlayerCarClassPosition: 15,
    //             dcTractionControl3: 1.35,
    //             dcMGUKDeployFixed: 12,
    //             PlayerCarTeamIncidentCount: 1,
    //             IsOnTrack: true,
    //             dcABS: 8,
    //             WeekendInfo: {
    //                 WeekendOptions: {
    //                     IncidentLimit: 10
    //                 }
    //             },
    //             DriverInfo: {
    //                 Drivers: {
    //                     0 : {CarPath: 'audir18'},
    //                 }
    //             },
    //             EnergyERSBatteryPct: .874,
    //             EnergyMGU_KLapDeployPct: .124,
    //             PowerMGU_K: 0,
    //             FuelLevel: 5,
    //             LapLastLapTime: 203.455,
    //             LapBestLapTime: 201.543,
    //             LapOptimalLapTime: 199.546,
    //             SessionTimeRemain: 4355.435,
    //             OnPitRoad: false,
    //             PlayerCarIdx: 32,
    //             dcTractionControl: 4,
    //         }
    //     };
    //
    //     return ir;
    // });

    app.controller('MainCtrl', function($scope, iRService, $http) {

        if (localStorage.getItem('color') == null){

            $http.get('js/settings.json').then(function(response) {
                $scope.settings = JSON.parse(JSON.stringify(response.data));

                $scope.color = $scope.settings.data.color;

            });

        }else{
            $scope.color = localStorage.getItem('color');
        }

        if (localStorage.getItem('Lap') == null){

            $http.get('js/settings.json').then(function(response) {
                $scope.settings = JSON.parse(JSON.stringify(response.data));

                $scope.Lap = $scope.settings.data.Lap;

            });

        }else{
            $scope.Lap = localStorage.getItem('Lap');
        }

        if (localStorage.getItem('delta') == null){

            $http.get('js/settings.json').then(function(response) {
                $scope.settings = JSON.parse(JSON.stringify(response.data));

                $scope.delta = $scope.settings.data.delta;

            });

        }else{
            $scope.delta = localStorage.getItem('delta');
        }

        $scope.LaptimeChange = function (Lap) {
            localStorage.setItem('Lap', JSON.parse(JSON.stringify(Lap)));
        };

        $scope.DeltatimeChange = function (delta) {
            localStorage.setItem('delta', JSON.parse(JSON.stringify(delta)));
        };

        $scope.ColorChange = function (color) {
            localStorage.setItem('color', JSON.parse(JSON.stringify(color)));
        };

        $scope.opacity = [
            {
                name : '0%',
                value : "rgba(0, 0, 0, 0)"
            },
            {
                name : '20%',
                value : "rgba(0, 0, 0, 0.2)"
            },
            {
                name : '40%',
                value : "rgba(0, 0, 0, 0.4)"
            },
            {
                name : '60%',
                value : "rgba(0, 0, 0, 0.6)"
            },
            {
                name : '80%',
                value : "rgba(0, 0, 0, 0.8)"
            },
            {
                name : '100%',
                value : "rgba(0, 0, 0, 1)"
            },
        ];

        $scope.Laptime = [
            {
                name : 'Optimal Lap Time',
                value : "optimal"
            },
            {
                name : 'Best Lap Time',
                value : "best"
            },
            {
                name : 'Last Lap Time',
                value : "last"
            },
        ];

        $scope.Deltatime = [
            {
                name : 'Optimal Lap Time',
                value : "optimal"
            },
            {
                name : 'Best Lap Time',
                value : "best"
            },
            {
                name : 'Last Lap Time',
                value : "last"
            },
        ];

        return $scope.ir = iRService.data;
    });

    app.filter('plusOrMinus', function(){
        return function(input){
            input = input ? input : 0
            return input > 0 ? "+"+input : input
        }
    });

    app.filter('percentage', function(){
        return function(input){
            input = input ? input : 0
            return  input + " %"
        }
    });

    app.filter('percentage2', function(){
        return function(input){
            input = input ? input : 0
            return input + "%"
        }
    });

    app.filter('toMinSec', function(){

        return function(input){

            return (moment.duration(input, "seconds").format("mm:ss.SSS"));
        }
    });

    app.filter('secondsToDateTime', [function() {
        return function(seconds) {
            return (moment.duration(seconds, "seconds").format("hh:mm:ss"));
        };
    }]);

    app.filter('makePositive', function() {
        return function(num) { return Math.abs(num); }
    });

    angular.bootstrap(document, [app.name]);

}).call(this);