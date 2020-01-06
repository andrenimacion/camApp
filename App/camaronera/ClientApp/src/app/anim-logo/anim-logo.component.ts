import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anim-logo',
  templateUrl: './anim-logo.component.html',
  styleUrls: ['./anim-logo.component.css']
})
export class AnimLogoComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
    this.animacion(this.animPart1(), 'translateX(0px)', 'translateX(-160px)');
    this.animacion(this.animPart2(), 'translateX(0px)', 'translateX(160px)');
    this.divEstatic("part1", "translateX(-160px)");
    
    this.divEstatic("part2", "translateX(160px)");

    this.timeFunction();
  }

  timeFunction() {

    let show = document.getElementById('contpart2');
    show.style.display= "none" ;
    setTimeout(() => {

      show.style.display = "";
      this.animLogo("scaleLogo");
      
    }, 400);

    setTimeout(() => {
      this.animLogo('contpartAnimate');
    }, 401);

    setTimeout(() => {
      this.staticpart2();
    }, 1200);
  }


  staticpart2() {
    const contpart2 = document.getElementById('contpart2');
    contpart2.style.top = '220px';
    contpart2.style.position = 'inherit';

    if (contpart2.style.top == '220px') {
      this.animacion(this.animPart1(), 'translateX(-160px)', 'translateX(0px)');
      this.animacion(this.animPart2(), 'translateX(160px)', 'translateX(0px)');
      this.divEstatic("part1", "translateX(0px)");
      this.divEstatic("part2", "translateX(0px)");
    }
  }

  animLogo(nameAnimation) {
    const contpart2 = document.getElementById('contpart2');
    contpart2.style.animationName = nameAnimation;
    return contpart2;
  }

  animPart1() {
    const contPart1 = document.getElementById('part1');
    contPart1.style.animationName = "aniPart1";
    return contPart1;
  }

  animPart2() {
    const contPart2 = document.getElementById('part2');
    contPart2.style.animationName = "aniPart2";
    return contPart2;
  }
  
  divEstatic(obj, translate) {
    let contParts = document.getElementById(obj);
    contParts.style.transform = translate;
  }
  //funcion para animar cualquier div
  animacion(obj1, anim1, anim2) {

    obj1.animate([
      // keyframes
      {
        transform: anim1
      },
      { transform: anim2 }
    ], {
      // timing options
      duration: 700,
      iterations: 1
    });
  }

}
