Function.prototype.extends = function (Parent) {
	var F = function () { };
	F.prototype = Parent.prototype;
	this.prototype = new F();
	this.prototype.constructor = this;
	this.super = Parent.prototype;
};

// IE function objects does not support name property
if (!Function.constructor.name) {
	Object.defineProperty(Function.prototype, 'name', {
		get: function () {
			var fnString = this.toString();
			var firstSpaceIndex = fnString.indexOf(' ');
			var firstParentesisIndex = fnString.indexOf('(');
			var fnNameLength = firstParentesisIndex - firstSpaceIndex;
			var fnName = fnString.substr(firstSpaceIndex, fnNameLength).trim();
			return fnName;
		}
	});
}

Object.values = function (object) {
	return Object.keys(object).map(function (key) {
		return object[key];
	});
};

Math.randomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
};

Array.prototype.any = function () {
	if (this.length > 0) {
		console.log('!!!');//DEBUG
	}
	return this.length > 0;
};

Array.prototype.last = function () {
	return this[this.length - 1];
};

function Event() {
	var handlers = {};
	this.addHandler = function (handler) {
		handlers[handler] = handler;
	};
	this.removeHandler = function (handler) {
		delete handlers[handler];
	};
	this.invoke = function () {
		for (var key in handlers) {
			handlers[key].apply(null, arguments);
		};
	};
};