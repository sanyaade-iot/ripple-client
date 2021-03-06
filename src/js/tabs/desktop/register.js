var util = require('util');
var Tab = require('../../client/tab').Tab;

var RegisterTab = function ()
{
  Tab.call(this);
};

util.inherits(RegisterTab, Tab);

RegisterTab.prototype.tabName = 'register';
RegisterTab.prototype.pageMode = 'single';
RegisterTab.prototype.parent = 'main';

RegisterTab.prototype.generateHtml = function ()
{
  return require('../../../jade/tabs/desktop/register.jade')();
};

RegisterTab.prototype.angular = function (module) {
  module.controller('RegisterCtrl', ['$scope', '$location', '$element',
                                     '$timeout', 'rpId',
                                     function ($scope, $location, $element,
                                               $timeout, $id)
  {
    if ($id.loginStatus) {
      $location.path('/balance');
      return;
    }

    $scope.reset = function()
    {
      $scope.password = '';
      $scope.passwordSet = {};
      $scope.password1 = '';
      $scope.password2 = '';
      $scope.master = '';
      $scope.key = '';
      $scope.mode = 'form';
      $scope.showMasterKeyInput = false;
      $scope.submitLoading = false;

      if ($scope.registerForm) $scope.registerForm.$setPristine(true);
    };

    $scope.register = function()
    {
      $id.register({
        'username': 'local',
        'password': $scope.password1,
        'masterkey': $scope.masterkey,
        'walletfile': $scope.walletfile
      },
      function(err, key){
        if (err) {
          $scope.mode = "failed";
          $scope.error_detail = err.message;
          return;
        }
        $scope.password = new Array($scope.password1.length+1).join("*");
        $scope.keyOpen = key;
        $scope.key = $scope.keyOpen[0] + new Array($scope.keyOpen.length).join("*");

        $scope.mode = 'welcome';
      });
    };

    $scope.submitForm = function()
    {
      $scope.register();
    };

    $scope.goToFund = function()
    {
      $scope.mode = 'form';
      $scope.reset();

      $location.path('/fund');
    };

    $scope.reset();
  }]);
};

module.exports = RegisterTab;
