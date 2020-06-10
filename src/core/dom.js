class Dom {
  constructor(selector) {
    typeof selector === 'string'
      ? this.$el = document.querySelector(selector)
      : this.$el = selector;
  }

  html(html) {
    if (html) {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }
  get data() {
    return this.$el.dataset
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  /*
   * {
   *   height: '20px',
   *   width: '302px',
   *   margin: '20px',
   * }
   */
  css(styles = {}) {
    Object.keys(styles)
      .forEach((key) =>{
        this.$el.style[key] = styles[key];
      });
  }
  clear() {
    this.html('');

    return this;
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this;
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
