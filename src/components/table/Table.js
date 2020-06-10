import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@/core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(20)
  }

  isCol(type) {
    return type === 'col'
  }

  onMousedown(event) {
    const type = event.target.dataset.resize;
    if (type) {
      const isCol = this.isCol(type);
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const sideProp = isCol ? 'bottom' : 'right';
      $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
      });
      let value;

      document.onmousemove = (e) => {
        if (isCol) {
          const delta = e.pageX - coords.right;
          value = coords.width + delta;
          $resizer.css({right: -delta + 'px'});

          return;
        }
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({bottom: -delta + 'px'})
      };

      document.onmouseup = () => {
        document.onmousedown = null;
        document.onmousemove = null;
        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: 0,
        });

        if (isCol) {
          this.$root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px');

          return;
        }
        $parent.css({height: value + 'px'})
      }
    }
  }
}
