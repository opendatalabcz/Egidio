import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-entity-preview-card-table-column',
  template: '<ng-content></ng-content>',
  styleUrls: ['./entity-preview-card-table-column.component.scss']
})
export class EntityPreviewCardTableColumnComponent {
  @HostBinding('class.text-right')
  @HostBinding('class.text-medium')
  /**
   * Column is key column, when it's used to identify content (typically left column)
   *
   * Key column has different styling from other column
   */
  @Input() isKeyColumn?: boolean
}
