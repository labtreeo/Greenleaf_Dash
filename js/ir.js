(function() {
    var IRacing,
        __slice = [].slice;

    window.IRacing = IRacing = (function() {
        function IRacing(_at_requestParams, _at_requestParamsOnce, _at_fps, _at_server, _at_readIbt, _at_record) {
            this.requestParams = _at_requestParams != null ? _at_requestParams : [];
            this.requestParamsOnce = _at_requestParamsOnce != null ? _at_requestParamsOnce : [];
            this.fps = _at_fps != null ? _at_fps : 1;
                this.server = _at_server != null ? _at_server : '127.0.0.1:8182';
            this.readIbt = _at_readIbt != null ? _at_readIbt : false;
            this.record = _at_record != null ? _at_record : null;
            this.data = {};
            this.onConnect = null;
            this.onDisconnect = null;
            this.onUpdate = null;
            this.ws = null;
            this.onWSConnect = null;
            this.onWSDisconnect = null;
            this.reconnectTimeout = null;
            this.connected = false;
            this.firstTimeConnect = true;
            if (typeof record !== "undefined" && record !== null) {
                this.loadRecord();
            } else {
                this.connect();
            }
        }

        IRacing.prototype.connect = function() {
            this.ws = new WebSocket("ws://" + this.server + "/ws");
            this.ws.onopen = (function(_this) {
                return function() {
                    return _this.onopen.apply(_this, arguments);
                };
            })(this);
            this.ws.onmessage = (function(_this) {
                return function() {
                    return _this.onmessage.apply(_this, arguments);
                };
            })(this);
            return this.ws.onclose = (function(_this) {
                return function() {
                    return _this.onclose.apply(_this, arguments);
                };
            })(this);
        };

        IRacing.prototype.onopen = function() {
            var k;
            if (typeof this.onWSConnect === "function") {
                this.onWSConnect();
            }
            if (this.reconnectTimeout != null) {
                clearTimeout(this.reconnectTimeout);
            }
            for (k in this.data) {
                delete this.data[k];
            }
            return this.ws.send(JSON.stringify({
                fps: this.fps,
                readIbt: this.readIbt,
                requestParams: this.requestParams,
                requestParamsOnce: this.requestParamsOnce
            }));
        };

        IRacing.prototype.onmessage = function(event) {
            var data, k, keys, v, _ref;
            data = JSON.parse(event.data.replace(/\bNaN\b/g, 'null'));
            if (data.disconnected) {
                this.connected = false;
                if (this.onDisconnect) {
                    this.onDisconnect();
                }
            }
            if (data.connected) {
                for (k in this.data) {
                    delete this.data[k];
                }
            }
            if (data.connected || (this.firstTimeConnect && !this.connected)) {
                this.firstTimeConnect = false;
                this.connected = true;
                if (this.onConnect) {
                    this.onConnect();
                }
            }
            if (data.data) {
                keys = [];
                _ref = data.data;
                for (k in _ref) {
                    v = _ref[k];
                    keys.push(k);
                    this.data[k] = v;
                }
                if (this.onUpdate) {
                    return this.onUpdate(keys);
                }
            }
        };

        IRacing.prototype.onclose = function() {
            if (typeof this.onWSDisconnect === "function") {
                this.onWSDisconnect();
            }
            if (this.ws) {
                this.ws.onopen = this.ws.onmessage = this.ws.onclose = null;
            }
            if (this.connected) {
                this.connected = false;
                if (this.onDisconnect) {
                    this.onDisconnect();
                }
            }
            return this.reconnectTimeout = setTimeout(((function(_this) {
                return function() {
                    return _this.connect.apply(_this);
                };
            })(this)), 2000);
        };

        IRacing.prototype.sendCommand = function() {
            var args, command;
            command = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            return this.ws.send(JSON.stringify({
                command: command,
                args: args
            }));
        };

        IRacing.prototype.loadRecord = function() {
            var r;
            r = new XMLHttpRequest();
            r.onreadystatechange = function() {
                var data;
                if (r.readyState === 4 && r.status === 200) {
                    data = JSON.parse(r.responseText);
                    return console.log(data);
                }
            };
            r.open('GET', this.record, true);
            return r.send();
        };

        return IRacing;

    })();

}).call(this);