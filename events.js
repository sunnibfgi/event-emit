// events.js
let Events = function() {

	var events = events || {}

	function on(type, listen, once) {
		once = once || false
		events[type] = events[type] || []
		if (~~events[type].indexOf(listen)) {
			events[type].push({
				type: type,
				listen: listen,
				once: once
			})
		}
		return this
	}

	function off(type, listen) {
		if (!events[type]) return
		for (var i = 0; i < events[type].length; i++) {
			if (events[type][i].listen = listen)
				events[type].splice(i, 1)
		}
		return this
	}

	function once(type, listen) {
		this.on(type, listen, true)
	}

	function emit(type) {
		if (!events[type]) return
		var args = [].slice.call(arguments, 1)
		for (var i = 0, len = events[type].length; i < len; i++) {
			events[type][i] && events[type][i].listen.apply(null, args)
			if (events[type][i] && events[type][i].once)
				delete events[type][i]
		}
		return this
	}

	return {
		on,
		off,
		once,
		emit
	}

}()

var proto = Element.prototype
proto.on = Events.on
proto.off = Events.off
proto.once = Events.once
proto.emit = Events.emit
