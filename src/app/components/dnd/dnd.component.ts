import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.css']
})
export class DndComponent {
  @Input() imgOriginalSrc :string;
  @Output() private imgOriginalOut : EventEmitter<string> = new EventEmitter();

  private fileList : any [];
  private invalidFiles : any [];
  constructor() { }

  onFilesChange(fileList : Array<File>){
    this.fileList = fileList;
  }

  onFileInvalids(fileList : Array<File>){
    this.invalidFiles = fileList;
  }

  onDropImage(imgSrc : string){
    this.imgOriginalSrc = imgSrc;
    this.imgOriginalOut.emit(this.imgOriginalSrc);
  }

  fileChangeEvent(event: any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event) => {
        this.imgOriginalSrc = reader.result;
        this.imgOriginalOut.emit(this.imgOriginalSrc);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
