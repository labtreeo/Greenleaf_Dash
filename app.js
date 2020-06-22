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
    //             EnergyERSBatteryPct: 0.874,
    //             EnergyMGU_KLapDeployPct: 0.122,
    //             PowerMGU_K: 0,
    //             FuelLevel: 5,
    //             LapLastLapTime: 203.455,
    //             LapBestLapTime: 201.543,
    //             LapOptimalLapTime: 199.546,
    //             SessionTimeRemain: 4355.435,
    //             OnPitRoad: false,
    //             PlayerCarIdx: 35,
    //         }
    //     };
    //
    //     return ir;
    // });

    app.controller('MainCtrl', function($scope, iRService) {

        console.log(localStorage.getItem('color'));

        if (localStorage.getItem('color') == null){

            console.log('hey');

            $scope.color = "rgba(0, 0, 0, 0.4)";
            $scope.Lap = "last";
            $scope.delta = "best";

            localStorage.setItem('color', $scope.color);
            localStorage.setItem('delta', $scope.Lap);
            localStorage.setItem('Lap', $scope.delta);

            console.log(localStorage.getItem('color'));

        } else{

            console.log('there');

            $scope.color = localStorage.getItem('color');
            $scope.Lap = localStorage.getItem('Lap');
            $scope.delta = localStorage.getItem('delta');

            $scope.LaptimeChange = function (Lap) {
                localStorage.setItem('Lap', Lap);
            };

            $scope.DeltatimeChange = function (delta) {
                localStorage.setItem('delta', delta);
            };

            $scope.ColorChange = function (color) {
                localStorage.setItem('color', color);
            };
        }

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

    angular.bootstrap(document, [app.name]);

}).call(this);