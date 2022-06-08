import { AfterViewInit, Component, ElementRef, Host, HostListener, Input, OnInit, TestabilityRegistry, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Meme } from 'src/models/meme';



export interface Text {
  textVal: string,
  x: any,
  y: any,
  fontSize: number,
  selected: boolean,
  color: any,
}


@Component({
  selector: 'app-meme-edit-screen',
  templateUrl: './meme-edit-screen.component.html',
  styleUrls: ['./meme-edit-screen.component.css']
})
export class MemeEditScreenComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as Meme;
    this.memeObject = state;

  }


  memeObject: Meme;


  textWritten = "";

  // @ts-ignore
  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef;


  // @ts-ignore
  public context: CanvasRenderingContext2D;


  ngOnInit(): void {

  }

  listOfTexts: Text[] = [

  ];


  EditorState = {
    mouseDown: false,
    color: "",
  }


  calculateAspectRatioFit(srcWidth: any, srcHeight: any, maxWidth: any, maxHeight: any) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }


  image = new Image();

  ratio: any;
  dimensions: any;

  ngAfterViewInit(): void {
    this.ratio = Math.min(700 / this.memeObject.width, 900 / this.memeObject.height);
    this.dimensions = { width: this.memeObject.width * this.ratio, height: this.memeObject.height * this.ratio }
    this.image.src = this.memeObject.url;
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.myCanvas.nativeElement.width = this.dimensions.width;
    this.myCanvas.nativeElement.height = this.dimensions.height;
    this.myCanvas.nativeElement.style.border = "10px solid orange";
    this.context.drawImage(this.image, 0, 0, this.dimensions.width, this.dimensions.height);


  }

  redrawCanvas() {
    this.context.drawImage(this.image, 0, 0, this.dimensions.width, this.dimensions.height);

    this.listOfTexts.forEach(elem => {
      this.context.font = `${elem.fontSize}px Arial`;
      this.context.fillStyle = elem.color;
      this.context.fillText(elem.textVal, elem.x, elem.y);

    });

  }


  addText() {
    this.listOfTexts.push({ textVal: "Hello", x: 20, y: 90, fontSize: 80, selected: true, color: 'black' });
    this.listOfTexts.forEach(elem => {
      this.context.font = `${elem.fontSize}px Arial`;
      this.context.fillStyle = elem.color;
      this.context.fillText(elem.textVal, elem.x, elem.y);

    });
    this.textWritten = "Hello";
  }


  @HostListener("touchstart", ['$event'])
  touchMove(e: TouchEvent) {
    this.EditorState.mouseDown = true;
    this.listOfTexts.forEach((elem, index) => {
      let heightOfText = elem.fontSize * 1.286;

      let widthOfText = this.context.measureText(elem.textVal).width;
      console.log(heightOfText, widthOfText);
      if (e.touches[0].clientX > elem.x && e.touches[0].clientX < elem.x + widthOfText && e.touches[0].clientY < elem.y && e.touches[0].clientY > elem.y - heightOfText) {
        elem.selected = true;
        this.textWritten = elem.textVal;
        this.listOfTexts.forEach((Allelem, excludedIndex) => {
          if (excludedIndex != index) {
            Allelem.selected = false;
          }
        })
        console.log("ACTIVATED");

      }
    });
  }

  @HostListener("mousedown", ['$event'])
  mouseMove(e: MouseEvent) {
    this.EditorState.mouseDown = true;
    this.listOfTexts.forEach((elem, index) => {
      let heightOfText = elem.fontSize * 1.286;

      let widthOfText = this.context.measureText(elem.textVal).width;
      console.log(heightOfText, widthOfText);
      if (e.clientX > elem.x && e.clientX < elem.x + widthOfText && e.clientY < elem.y && e.clientY > elem.y - heightOfText) {
        elem.selected = true;
        this.textWritten = elem.textVal;
        this.listOfTexts.forEach((Allelem, excludedIndex) => {
          if (excludedIndex != index) {
            Allelem.selected = false;
          }
        })
        console.log("ACTIVATED");

      }
    });
  }



  @HostListener("touchmove", ['$event'])
  touchMoveText(e: TouchEvent) {
    if (this.EditorState.mouseDown) {
      this.listOfTexts.forEach(elem => {
        if (elem.selected) {
          elem.x = e.touches[0].clientX;
          elem.y = e.touches[0].clientY;
          console.log(elem.selected, elem.x);
          this.redrawCanvas();
        }

      })
    }
  }



  @HostListener("mousemove", ["$event"])
  mouseMoveText(e: MouseEvent) {
    if (this.EditorState.mouseDown) {
      this.listOfTexts.forEach(elem => {
        if (elem.selected) {
          elem.x = e.clientX;
          elem.y = e.clientY;
          console.log(elem.selected, elem.x);
          this.redrawCanvas();
        }

      })
    }
  }

  @HostListener("touchend", ['$event'])
  touchUpEvent(e: TouchEvent) {
    this.EditorState.mouseDown = false;

  }


  @HostListener("mouseup", ["$event"])
  mouseUpEvent(e: MouseEvent) {
    this.EditorState.mouseDown = false;
  }




  changeTheText() {
    let elem = this.listOfTexts.filter(elem => elem.selected === true)[0];
    elem.textVal = this.textWritten;
    this.redrawCanvas();

  }

  getSelectedElement() {
    return this.listOfTexts.filter(elem => elem.selected === true)[0];
  }


  changeFontSize(caseType: any) {
    switch (caseType) {
      case "increase":
        let elemSlec = this.getSelectedElement();
        elemSlec.fontSize += 5;
        this.redrawCanvas();
        break;
      case "decrease":
        let elemSlec2 = this.getSelectedElement();
        elemSlec2.fontSize -= 5;
        this.redrawCanvas();
        break;
    }
  }


  downloadCanvas() {
    var imageData = this.myCanvas.nativeElement.toDataURL("image/png");
    let anchorTag = document.createElement("a");
    document.body.appendChild(anchorTag);
    anchorTag.href = imageData;
    anchorTag.download = "imageData";
    anchorTag.click();
    document.body.removeChild(anchorTag);

  }

  colorChange() {
    let currElem = this.getSelectedElement();
    currElem.color = this.EditorState.color;
    this.redrawCanvas();

  }



}
