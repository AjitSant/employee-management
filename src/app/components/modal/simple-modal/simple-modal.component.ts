import { Component, ComponentFactoryResolver, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogData } from 'src/app/interfaces/app.model';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit, OnDestroy {
  @Input() component: any;
  @Output() apiSuccessEvent = new EventEmitter<any>();
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  private sub = new Subject();

  constructor(private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public empData: DialogData) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).data = this.empData;
    (componentRef.instance as any).apiSuccess.pipe(takeUntil(this.sub)).subscribe((res: boolean) => {
      if (res) {
        this.handleSuccessApi(res);
      }
    })

  }

  handleSuccessApi(event: boolean) {
    this.apiSuccessEvent.emit(event);
  }

}
