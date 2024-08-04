import { ChangeDetectionStrategy, Component, EventEmitter, input, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-virtual-scroll',
  standalone: true,
  imports: [
    InfiniteScrollDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './virtual-scroll.component.html',
  styleUrl: './virtual-scroll.component.scss'
})
export class VirtualScrollComponent<T> implements OnChanges {
  quantity = 20;
  increment = 20;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  items = input.required<Array<T>>();
  className = input<string>();
  itemsSliced = output<Array<T>>();

  ngOnChanges(changes: SimpleChanges): void {
    this.itemsSliced.emit(this.items().slice(0, this.quantity));
  }

  onScroll(): void {
    this.quantity += this.increment;
    this.itemsSliced.emit(this.items().slice(0, this.quantity));
  }
}
