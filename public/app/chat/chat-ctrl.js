(function() {
    'use strict';

    /*
        Controller for chat functionality
     */
    define([], function() {
        var chatCtrl = function($scope, ChatCache, PeerDataConn) {
            $scope.chatData = ChatCache.getChatHistory();
            $scope.currentMessage = '';
            $scope.sendMessage = function(message) {
                PeerDataConn.send(message);
                ChatCache.addChatEntry({
                    message: message,
                    sender: 'me'
                });
                $scope.chatData = ChatCache.getChatHistory();
                $scope.currentMessage = '';
            };

            $scope.$on('chat update', function(event, message) {
                ChatCache.addChatEntry({
                    message: message,
                    sender: 'them'
                });
                $scope.chatData = ChatCache.getChatHistory();

                //Events don't apply the changes to the scope, applying manually.
                $scope.$apply();
            });
        };

        return ['$scope', 'ChatCache', 'PeerDataConn', chatCtrl];
    })
}());