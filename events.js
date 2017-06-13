(function(global) {
	'use strict'
	
	var Events = function() {

		var events = events || {}

		function on(type, listen) {
			var listener = events[type] = events[type] || []
			if (listen in listener)
				delete listener[listen]
			if (~~listener.indexOf(listen)) {
				listener.push(listen)
			}
			return this
		}

		function once(type, listen) {
			var listener = []
			this.on(type, listen)
			listener = events[type]
			listener[listen] = 0
		}

		function off(type, listen) {
			var listener = events[type]
			if (!listener) return

			for (var i = 0; i < listener.length; i++) {
				if (listener[i] == listen) {
					var index = listener.indexOf(listen)
					listener.splice(index, 1)
				}
			}
			return this
		}

		function emit(type) {

			var listener = events[type],
				args = [].slice.call(arguments, 1)

			if (!listener) return

			for (var i = 0; i < listener.length; i++) {
				var listen = listener[i]
				if (listen in listener && listener[listen] >= 1) {
					continue
				}
				listen.apply(this, args)
				listener[listen]++
			}

			return this
		}

		return {
			on,
			emit,
			off,
			once
		}

	}()

	Element.prototype.on = Events.on
	Element.prototype.off = Events.off
	Element.prototype.once = Events.once
	Element.prototype.emit = Events.emit
	global.Events = Events

})(this)
