import {Directive, HostListener, HostBinding, EventEmitter, Output, Input} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  private imgSrc :string;
  @Input() private allowed_extensions : Array<string> = [];
  @Output() private imgDropSrc : EventEmitter<string> = new EventEmitter();
  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#eee';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee'
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    let file = evt.dataTransfer.files[0];
    var reader = new FileReader();

    reader.onload = (event) => {
      this.imgSrc = reader.result;
      this.imgDropSrc.emit(this.imgSrc);
    };
    reader.readAsDataURL(file);
  }

}
