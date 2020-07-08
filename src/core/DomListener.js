import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if(!$root) {
      throw new Error('No $root provided for DomListener')
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);

      console.log('method add', method)
      if(!this[method]) {
        const name = this.name || '';
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        )
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      console.log('listener', listener)
      console.log('method', method)
      console.log('this[method].bind(this)', this[method])
      this.$root.of(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
