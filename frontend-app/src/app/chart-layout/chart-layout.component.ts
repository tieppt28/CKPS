// tslint:disable component-selector no-magic-numbers
import {Component} from '@angular/core';

@Component({
  selector: 'app-chart-layout',
  templateUrl: './chart-layout.component.html',
  styleUrls: ['./chart-layout.component.scss']
})
export class ChartLayoutComponent {

  // private static readonly LAYOUT_KEY: string = 'paneLayout';
  //
  // public _layout: RootLayout<any> = new RootLayout(undefined);
  // private nextMainId: number = 0;
  // public fooHeader: PaneHeaderStyle = headerStyle('visible', 'Foo', undefined, false);
  // public barHeader: PaneHeaderStyle = headerStyle('visible', 'Bar', undefined, false);
  //
  // public readonly requestAutosave: Subject<undefined> = new Subject();
  //
  // public get layout(): RootLayout<any> { return this._layout; }
  //
  // public set layout(val: RootLayout<any>) {
  //   if (Object.is(this._layout, val)) { return; }
  //
  //   this._layout = val;
  //   // this.saveLayout();
  // }
  //
  // public constructor(private readonly storage: StorageMap) {
  //   this.storage.get(ChartLayoutComponent.LAYOUT_KEY).subscribe(template => {
  //     const result = LayoutBuilder.empty<any>().build(b => {
  //       b.set(b.loadSimple(template as LayoutTemplate<any>));
  //     });
  //
  //     if (result.err !== undefined) {
  //       console.warn('Error loading layout: ', result.err);
  //       this.resetLayout();
  //     }
  //     else {
  //       this._layout = result.ok;
  //     }
  //   });
  //
  //   this.requestAutosave.pipe(debounceTime(500)).subscribe(_ => this.saveLayout());
  // }
  //
  // private saveLayout(): void {
  //   this.storage.set(ChartLayoutComponent.LAYOUT_KEY, saveLayout(this._layout, x => x)).subscribe();
  // }
  //
  // private modifyLayout(callback: (b: LayoutBuilder<any>) => void): void {
  //   const result = LayoutBuilder.from(this._layout).build(callback);
  //   this._layout  = result.unwrap();
  // }
  //
  // private addFoo(b: LayoutBuilder<any>, id: number = this.nextMainId): void {
  //   b.add(b.leaf(`foo${id}`, 'foo', {id}, 'main'));
  //
  //   this.nextMainId = id + 1;
  //   while (this._layout.findChild(c => c.type === LayoutType.Leaf &&
  //     c.id === `foo${this.nextMainId}`) !== undefined) {
  //     this.nextMainId += 1;
  //   }
  // }
  //
  // public resetLayout(): void {
  //   const result = LayoutBuilder.empty<any>().build(b => {
  //     this.addFoo(b, 0);
  //     b.add(b.leaf('bar', 'bar', {}, 'right'));
  //     b.add(b.leaf('bar2', 'bar2', {}, 'bottom'));
  //     b.add(b.leaf('bar3', 'bar3', {}, 'left'));
  //   });
  //
  //   this._layout = result.unwrap();
  // }
  //
  // public addMain(): void { this.modifyLayout(this.addFoo.bind(this)); }
  //
  // public toggleSide(): void {
  //   this.modifyLayout(b => {
  //     const childId = b.root.findChild(c => c.type === LayoutType.Leaf && c.id === 'bar');
  //
  //     if (childId !== undefined) {
  //       b.sub(childId.stem, childId.stem.withoutChild(childId.index).layout);
  //     }
  //     else {
  //       b.add(b.leaf('bar', 'bar', {}, 'right'));
  //     }
  //   });
  // }
}
