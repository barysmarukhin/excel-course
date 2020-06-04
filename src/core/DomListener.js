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
    console.log(this.listeners);
    this.listeners.forEach((listener) => {
      const methodName = this.getMethodName(listener);
      const method = this[methodName];
      if (!method) {
        // eslint-disable-next-line max-len
        throw new Error(`Method ${methodName} wasn't implemented in ${this.name} Component`)
      }

      this.$root.on(listener, method)
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
