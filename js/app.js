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
    //             PowerMGU_K: 1,
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