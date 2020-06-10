import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DOM listener')
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = this.getMethodName(listener);
      if (!this[method]) {
        // eslint-disable-next-line max-len
        throw new Error(`Method ${method} wasn't implemented in ${this.name} Component`)
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = this.getMethodName(listener);
      this.$root.off(listener, this[methodName])
    });
  }

  getMethodName(methodName) {
    return 'on' + capitalize(methodName);
  }
}
