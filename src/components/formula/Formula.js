import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })

    this.onInput.bind(this)
    this.onClick.bind(this)
  }

  onInput(event) {
    console.log('Formula: onInput', event.target.textContent)
  }

  onClick(event) {
    console.log(event.target)
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }
}
