import { Component, OnInit, ElementRef, ViewChildren, Renderer, ViewChild, Input } from '@angular/core';
import { Dp03a110Service } from '../../Servicios/dp03a110.service';
import { Dp03a130Service } from '../../Servicios/dp03a130.service';
import { environment } from '../../environments/environment';
import { Idp03a130 } from '../../Models/Dp03a130';
import { Idp13a110 } from '../../Models/Dp13a110';
import { Router } from '@angular/router';
import { SentenciasService } from '../../Servicios/sentencias.service';
import { IDpinvcab } from '../../Models/dpinvcab';
import { DpinvcabService } from '../../Servicios/dpinvcab.service';
import { Dp03amovService } from '../../Servicios/dp03amov.service';
import { IDp03amov } from '../../models/dp03amov';
import { ISp_Numsecu } from '../../Models/sp_Numsecu';
import { ReporteriaService } from '../../reporter-services/reporteria.service';

@Component({
  selector: 'app-muestreo',
  templateUrl: './muestreo.component.html',
  styleUrls: ['./muestreo.component.css']
})

export class MuestreoComponent implements OnInit {
  env = environment;
  public lNew= true;
  public aTempo: tempo[] = [];
  public dbPis: Idp03a130[] = [];
  public dbCam2: Idp13a110[] = [];
  public _codigo: string ;
  public _descripcion: any ;
  public _camarones: number ;
  public _peso: number ;
  public _promedio: number;
  public _talla: string;
  public _nTalla: string ;
  public _piscina: string;
  public _corrida: string;
  public _fechaIngreso: any;
  public editar: boolean = false; 
  public inItem: number = 0;
  public sumaCamaron: number = 0;
  public sumPeso: number = 0;
  public promeGeneral: number = 0;
  @Input() param: any;
  public paramReport: any[] = []; 

  public nextInputs: any = "hola";

  /*
     VARIABLES DE CABECERA INICIO
  */

  public piscinaHead: string;
  public fechaInitHead: Date;
  public camaronesBody: number;
  public pesoTotalBody: number;
  public promedioBody: number;
  public corridaHead: number;

  /*
    VARIABLES DE CABECERA FIN
  */

  @ViewChild('codigo') codigoX: ElementRef;
  @ViewChild('fecha') fechaX: ElementRef;
  @ViewChild('descripcion') descripcionX: ElementRef;
  @ViewChild('peso') pesoX: ElementRef;
  @ViewChild('promedio') promedioX: ElementRef;
  @ViewChild('corrida') corridaX: ElementRef;
  @ViewChild('piscina') piscinaX: ElementRef;
  @ViewChild('talla') tallaX: ElementRef;
  @ViewChild('camarones') camaronesX: ElementRef;

  getCodigo() {
    if (this._codigo != '') {
      this.prodServices.getCodigoCamaroneras(this._codigo)
        .subscribe(x => { this._descripcion = x.nombre },
          err => { this._codigo = '', this._descripcion = '' });
    }
  }
  constructor(public prodServices: Dp03a110Service,
    public pisServices: Dp03a130Service,
    public sentenciasServis: SentenciasService,
    public dpincavServices: DpinvcabService,
    public detalleService: Dp03amovService,
    public printService: ReporteriaService,
    public router: Router
              ) { }

  getTallafServices(opcionA, opcionB) {
    //console.log(opcionA);
    //console.log(opcionB);
    this.sentenciasServis.getTalla(opcionA, opcionB).subscribe(
      x => this._talla=x
    );
  }

  getPis(codePis:string) {
    this._piscina = codePis;
    
  }

  regresar() {
    this.router.navigate(['']); 
  }

  focusEventA(focusIn: any) {
    
    console.log('estamos en focus ' + focusIn);
  }

  focusEventB(focusOut: any) {
    console.log('estamos en fuera focus ' + focusOut);
    focusOut.nativeElement.focus();

  }

  validarPis(inputTypeA) {
    if (inputTypeA != '') {
      if (inputTypeA > this.dbPis.length || inputTypeA == 0) {
        this._piscina = '';
      }
    }
  }

  anidCodec() {
    if (parseInt(this._piscina) <= 9) {  
      //console.log('es menor a nueve');
      this._piscina = `C0${this._piscina}`;
    }
    else {
      this._piscina = `C${this._piscina}`;
      //console.log('es mayor a nueve');
    }
  }

  focusNext(inputt: any, inputTypeA:any) {
    inputt.nativeElement.focus();
    this.validarPis(this._piscina);

   
  }

  ngOnInit() {
    
    this.fechaX.nativeElement.focus();
    

    if (this.env.codCam == '') {
      this.router.navigate(['']);
    }



    this.enceraItem();

    this.pisServices.getPiscinas(this.env.codCam)
      .subscribe(x => this.dbPis = x);.0
      

  }

  //verificacion por inputs INICIO

  

  //verificacion por inputs FIN

  promedioCam() {
    this._promedio = this._peso / this._camarones;
    this.getTallafServices(this._camarones, this._peso);
    //this.saveItem();
    this.focusNext(this.promedioX, "");
  }

  //tallaValue() {
  //  this._talla = this.dbCam2[];
  //}

  enceraItem() {
    this._codigo= 'CAMENG';
    this._descripcion = this.getCodigo();
    this._camarones= 0;
    this._peso= 0;
    this._promedio = 0;
    this._talla = '';
    this._nTalla = '';
    this._piscina = '';
    this._corrida = this._corrida;
    this.sumaCamaron = 0;
    this.sumPeso = 0;
    this.promeGeneral = 0;
  }

  saveItem() {
    let miTempo: tempo = {
      codigo: this._codigo,
      descripcion: this._descripcion,
      camarones: this._camarones,
      peso: this._peso,
      promedio: this._promedio,
      talla: this._talla,
      nTalla: this._nTalla,
      piscina: this._piscina,
      corrida: this._corrida,
      
    }
    
    if (!this.editar) {
      this.aTempo.push(miTempo);


    } else {
      this.aTempo.splice(this.inItem, 1, miTempo);
    }

    this.lNew = true;

    this.editar = false;
    this.enceraItem();

    this.sumTotales();
    this.focusEventB(this.fechaX);

  }


  sumTotales() {
    for (let i = 0; i < this.aTempo.length; i++) {
      this.sumaCamaron = this.sumaCamaron + this.aTempo[i].camarones;
      this.sumPeso = this.sumPeso + this.aTempo[i].peso;

    }
    this.promeGeneral = this.sumPeso / this.sumaCamaron;
  }

  //sumPesso() {
  //  for (let i = 0; i < this.aTempo.length; i++) {
      
  //  }
    
  //}

  //promGeneral() {
  //  this.promeGeneral =  this.sumPeso / this.sumaCamaron;
  //}

  editItem(index) {
    this._codigo = this.aTempo[index].codigo;
    this._descripcion = this.aTempo[index].descripcion;
    this._camarones = this.aTempo[index].camarones;
    this._peso = this.aTempo[index].peso;
    this._promedio = this.aTempo[index].promedio;
    this._talla = this.aTempo[index].talla;
    this._nTalla = this.aTempo[index].nTalla;
    this._piscina = this.aTempo[index].piscina;
    this.lNew = true;
    this.editar = true;
    this.inItem = index;
    if (this.editItem) {
      console.log('estamos editando');
      this.focusEventB(this.piscinaX);
    }
  }

  deletItem(index) {
    this.aTempo.splice(index, 1);
  }

  guardarDB() {

    let secu: ISp_Numsecu;
    secu = { tipo: this.env.tipoTrMu, modulo: '03', numero: '', devhva: true, fecha: new Date() }
    let codCams: string = this.env.codCam.toString();

    this.sentenciasServis.secuancia(secu).subscribe(x => {
      console.log(x);
      let cabeza1: IDpinvcab;
      cabeza1 = {
        tipo: this.env.tipoTrMu, numero: x, numero_b: "", grupo: 'M', tipo_t: "",
        fecha_tra: new Date(), fecha_ven: new Date(), bodega: "", prov_cli: "",
        vendedor: "", tp_precio: "A", total_mov: 0, pordes: 0, total_des: 0, poriva: 0,
        total_iva: 0, total_trn: 0, userfec: new Date(), usercla: this.env.nameUser, comenta: "",
        camaronera: codCams.trim(), corrida: this._corrida,
        base_0: 0, base_tax: 0
      };
      this.dpincavServices.saveInvCab(cabeza1).subscribe();

      //Grabo Detalle
      let detalle1: IDp03amov;
      let linea = 0;

      for (let i of this.aTempo) {
        linea = linea + 1;
        detalle1 = {
          tipo: this.env.tipoTrMu, numero: x, linea: linea, tipo_t: "", presenta: "U", factor: 1,
          fecha_tra: new Date(this._fechaIngreso), touch: "", no_parte: i.codigo, consumo: "", bodega: i.piscina, cantidad: 0,
          precio_u: 0, precio_t: 0, poriva: 0, valiva: 0, pordes: 0, valdes: 0, precio_ne: 0,
          servicio: "", desitem: 0, tprecio: "A", desit: 0, nservicio: "", costFactor: 0,talla:i.talla,
          totFactor: 0, codFactor: "", canFactor: 0, camaronera: codCams, camaron: i.camarones, lbrastotal: i.peso, 
        };

        this.detalleService.saveInvDet(detalle1)
          .subscribe(y => {
            this.printService.getReporte(this.env.tipoTrMu, x).subscribe(
              pr => {
                this.paramReport = pr;
                this.fechaInitHead = pr[0].fecha_tra;
                this.piscinaHead = pr[0].npiscina;
                this.corridaHead = pr[0].corrida;

                //esto de aqui solo es para informacion decabecera
                //el ngFor era normal con el mismo nombre de tu arreglo

                console.log(this.paramReport);
              }
            )}
            ,
            err => {
              console.log('algo pasa llama a preciado =)')
            }
        );        
      }

    }, err => console.log(err))

  }
  verErrores() {
    console.log(this.paramReport);
  }

}

interface tempo {
  codigo: string;
  descripcion: string;
  camarones: number;
  peso: number;
  promedio: number;
  talla: string;
  nTalla: string;
  piscina: string;
  corrida: string;
}
