import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  @Input() show: boolean = false;
  @ViewChild('modal') modal!: ElementRef;
  renderer: any;

  ngOnInit() {
    this.toggleModal();
  }

  toggleModal() {
    if (this.show) {
      this.renderer.addClass(this.modal.nativeElement, 'opacity-100');
      this.renderer.removeClass(this.modal.nativeElement, 'opacity-0');
      this.renderer.setStyle(this.modal.nativeElement, 'pointer-events', 'auto');
    } else {
      this.renderer.addClass(this.modal.nativeElement, 'opacity-0');
      this.renderer.removeClass(this.modal.nativeElement, 'opacity-100');
      this.renderer.setStyle(this.modal.nativeElement, 'pointer-events', 'none');
    }
  }

  close() {
    this.show = false;
    this.toggleModal();
  }
}
