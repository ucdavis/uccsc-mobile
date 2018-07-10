import React from 'react';

export function withTimers(WrappedComponent) {
  return class WithTimers extends React.Component {

    componentWillUnmount() {
      // cancel all timers
      this[_timeouts] && this[_timeouts].forEach(function(id) {
        clearTimeout(id);
      });
      this[_timeouts] = null;

      // cancel all intervals
      this[_intervals] && this[_intervals].forEach(function(id) {
        clearInterval(id);
      });
      this[_intervals] = null;

      // cancel all immediates
      this[_immediates] && this[_immediates].forEach(function(id) {
        clearImmediate(id);
      });
      this[_immediates] = null;

      // cancel all animation frames
      this[_rafs] && this[_rafs].forEach(function(id) {
        cancelAnimationFrame(id);
      });
      this[_rafs] = null;
    }

    // track all setters in an array
    setter = (_setter, _clearer, array) => (callback, delta) => {
      const id = _setter(function() {
        _clearer.call(this, id);
        callback.apply(this, arguments);
      }.bind(this), delta);

      if (!this[array]) {
        this[array] = [id];
      } else {
        this[array].push(id);
      }
      return id;
    }
  
    // stop tracking function
    clearer = (_clearer, array) => (id) => {
      if (this[array]) {
        const index = this[array].indexOf(id);
        if (index !== -1) {
          this[array].splice(index, 1);
        }
      }
      _clearer(id);
    }
  
    _timeouts = 'WithTimers_timeouts';
    _clearTimeout = this.clearer(clearTimeout, this._timeouts);
    _setTimeout = this.setter(setTimeout, this._clearTimeout, this._timeouts);
  
    _intervals = 'WithTimers_intervals';
    _clearInterval = this.clearer(clearInterval, this._intervals);
    _setInterval = this.setter(setInterval, function() {/* noop */}, this._intervals);
  
    _immediates = 'WithTimers_immediates';
    _clearImmediate = this.clearer(clearImmediate, this._immediates);
    _setImmediate = this.setter(setImmediate, this._clearImmediate, this._immediates);
  
    _rafs = 'WithTimers_rafs';
    _cancelAnimationFrame = this.clearer(cancelAnimationFrame, this._rafs);
    _requestAnimationFrame = this.setter(requestAnimationFrame, this._cancelAnimationFrame, this._rafs);

    render() {
      const timer = {
        setTimeout: this._setTimeout,
        clearTimeout: this._clearTimeout,

        setInterval: this._setInterval,
        clearInterval: this._clearInterval,

        setImmediate: this._setImmediate,
        clearImmediate: this._clearImmediate,

        requestAnimationFrame: this._requestAnimationFrame,
        cancelAnimationFrame: this._cancelAnimationFrame,
      };

      return <WrappedComponent timer={timer} {...this.props} />;
    }
  };
}