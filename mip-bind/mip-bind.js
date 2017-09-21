/**
 * @file mip-bind extension
 * @author Jackson
 * @email smartfutureplayer@gmail.com
 */

define(function (require) {

    var Compile = require('./mip-compile');
    var Observer = require('./mip-observer');

    /**
     * Bind Class
     *
     * @class
     */
    var Bind = function () {
        this.dataSource = {
            m: window.m ? window.m : {}
        };
        window.m = {};
        this.win = window;
        // require mip data extension runtime
        this._compile = new Compile();
        this._observer = new Observer();
    };

    /**
     * Start mip bind
     *
     */
    Bind.prototype.start = function () {
        // Data delegate
        this._proxy();
        // Data observer
        this._observer.start(this.dataSource.m);
        // Dom compile
        this._compile.start(this.dataSource.m);
        // require mip data extension runtime
        require('./mip-data');
    };

    /**
     * Traversal data and proxy it on window varible m
     *
     */
    Bind.prototype._proxy = function () {
        var me = this;
        Object.keys(this.dataSource).forEach(function (key) {
            me._proxyData(key);
        });
    };

    /**
     * Proxy data via varible m
     *
     * @param {string} key the key of the data
     */
    Bind.prototype._proxyData = function (key) {
        var me = this;
        Object.defineProperty(this.win, key, {
            configurable: false,
            enumerable: true,
            get: function () {
                return me.dataSource[key];
            },
            set: function (newVal) {
                me.dataSource[key] = newVal;
            }
        });
    };

    return new Bind().start();
});
