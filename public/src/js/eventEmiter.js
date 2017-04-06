
function EventEmiter() {
    this._events = {};
}

EventEmiter.prototype.on = subscribe;
EventEmiter.prototype.trigger = publish;

function subscribe (event, listener) {
    if (!this._events[event]) {
        this._events[event] = [];
    }

    this._events[event].push(listener);

};

function publish (event, info) {
    if (!this._events[event] || !this._events[event].length) return;
    this._events[event].forEach(function (item) {
        item(info);
    });
};

export default EventEmiter;