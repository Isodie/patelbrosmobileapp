/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
			if (cordova.platformId == 'android') {
           StatusBar.backgroundColorByHexString("#00695c");
           }

            console.log('Application Ready');
            if (checkConnection()) {
              var ref = cordova.InAppBrowser.open(encodeURI('http://theme-one.com/mobius/home-creative/'), '_self', 'location=no');
			   ref.addEventListener('loadstart', inAppBrowserbLoadStart);
               ref.addEventListener('loadstop', inAppBrowserbLoadStop);
               ref.addEventListener('loaderror', inAppBrowserbLoadError);
               ref.addEventListener('exit', inAppBrowserbClose);
			  function inAppBrowserbLoadStart(event) {
		       navigator.notification.activityStart("Please Wait", "Its loading....");
              }

    function inAppBrowserbLoadStop(event) {
		navigator.notification.activityStop();
		 ref.removeEventListener('loadstart', inAppBrowserbLoadStart);
         ref.removeEventListener('loadstop',  inAppBrowserbLoadStart);
    }

    function inAppBrowserbLoadError(event) {
	     navigator.notification.activityStop();
    }

    function inAppBrowserbClose(event) {
          navigator.notification.activityStop();
		  if (navigator.app) {
navigator.app.exitApp();
}
else if (navigator.device) {
  
}
else {
          window.close();
}
         ref.removeEventListener('loadstart', inAppBrowserbLoadStart);
         ref.removeEventListener('loadstop', inAppBrowserbLoadStop);
         ref.removeEventListener('loaderror', inAppBrowserbLoadError);
         ref.removeEventListener('exit', inAppBrowserbClose);
}
            } else {
              var ref = window.open('offline.html', '_self', 'location=no');
            }
        }
        function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            if (states[networkState] == 'No network connection') {
              return false;
            } else {
              return true;
            }
        }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
