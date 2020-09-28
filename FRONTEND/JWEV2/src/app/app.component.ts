import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Parser from 'node_modules/wannantraduction/WT';
import * as ParserE from 'node_modules/wannancompile/WE';
import Core from 'node_modules/wannancore/globalCore';
import {formatDate} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './toast-service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'JWEditor';
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private modalService: NgbModal, public toastService: ToastService,config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  faCoffee = faCoffee;

  obj: string;
  obj1: string;
  obj2: string;
  EL: number;
  ES: number;
  progreso: number;
  result: string;
  data: string;
  showFiller = false;
  traduce: boolean;
  ejecutar: boolean;
  traduction: any;
  core: any;
  salida: string;
  s: string;
  s1: string;
  simbolos: any[];
  rows1: any;
  duration: any;

  codeMirrorOptions: any = {
    theme: 'lucario',
    mode: 'application/javascript',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };
  codeMirrorOptions0: any = {
    theme: 'lucario',
    mode: 'application/json',
    readOnly: true,
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };

  codeMirrorOptions1: any = {
    theme: 'lucario',
    mode: 'application/text',
    lineNumbers: true,
    lineWrapping: true,
    readOnly: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: false,
    matchBrackets: false,
    smartIndent: false,
    indentWithTabs: false,
    lint: true
  };
  cargadescarga: boolean;
  showTraduction: boolean;
  isMenuCollapsed: boolean;
  private jsonsalida: any;
  rows: string;
  erroresSintacticos: any[];
  erroresLexicos: any[];
  simbolitos: any[];

  ngOnInit() {
    this.obj = 'let let1 = 1;\n' +
      'let punteo = 0;\n' +
      '\n' +
      'Inicio();\n' +
      '\n' +
      ' function  Inicio() {\n' +
      '    console.log("-----------------CALIFICACION-----------------");\n' +
      '    let let1 = 0;\n' +
      '    //Verificar ámbitos, se toma con prioridad la letiable local ante la global.\n' +
      '    if (let1 != 0)\n' +
      '    {\n' +
      '        console.log("No se toma con prioridad la letiable local ante la global");\n' +
      '        console.log("Perdiste 5 puntos :c");\n' +
      '    }\n' +
      '    else{\n' +
      '        punteo = punteo + 5;\n' +
      '    }\n' +
      '\n' +
      '    //Sección de declaracion de letiables\n' +
      '    Declaracion();\n' +
      '\n' +
      '    //seccion de manejo de ámbitos 2\n' +
      '    let amb1 = 5;\n' +
      '    Ambitos2();\n' +
      '\n' +
      '    //Sección de expresiones aritméticas\n' +
      '    Aritmeticas();\n' +
      '\n' +
      '\n' +
      '    //Seccion de expresiones lógicas\n' +
      '    logicas();\n' +
      '\n' +
      '\n' +
      '    //Seccion de expresiones relacionales\n' +
      '    Relacionales();\n' +
      '\n' +
      '    //punteo final\n' +
      '    console.log("punteo Final: "+punteo);\n' +
      '}\n' +
      '\n' +
      ' function  Declaracion(){\n' +
      '\n' +
      '    console.log("========= Metodo Declaracion =========");\n' +
      '    let n1 = 2;\n' +
      '    let n2 = 2;\n' +
      '    let n3 = 2;\n' +
      '    let n4 = 2;\n' +
      '    let str1 = "Voy a ganar Compiladore";\n' +
      '    let str2 = "Voy a ganar Compiladore";\n' +
      '    let str3 = "Voy a ganar Compiladore";\n' +
      '    let str4 = "Voy a ganar Compiladore";\n' +
      '    let db1 = 0.0;\n' +
      '    let db2 = 0.0;\n' +
      '    let db3 = 0.0;\n' +
      '    let db4 = 0.0;\n' +
      '    let chr1 = \'s\';\n' +
      '    let chr2 = \'s\';\n' +
      '    let chr3 = \'s\';\n' +
      '    let chr4 = "s";\n' +
      '    //if n modificar la asignación\n' +
      '    if (db1 == db4){\n' +
      '        console.log(str4 + chr4 +" " +n4+" :D");\n' +
      '    }else {\n' +
      '        console.log("Problemas en el metodo declaracion :(");\n' +
      '    }\n' +
      '    console.log("======================================");\n' +
      '    punteo = punteo + 5;\n' +
      '}\n' +
      '\n' +
      ' function  Ambitos2(){\n' +
      '    //debería lanzar un error, cualquiera\n' +
      '    //comentar luego de que lanze el error\n' +
      '    console.log("========= Error Ambitos ==============");\n' +
      '    //console.log("Debería lanzar error: "+amb1);\n' +
      '    let amb1 = "Desde ambito2";\n' +
      '    console.log("======================================");\n' +
      '    console.log("================ Nice ================");\n' +
      '    punteo = punteo + 5;\n' +
      '    console.log("Sin error: "+amb1);\n' +
      '    graficar_ts();\n' +
      '    console.log("======================================");\n' +
      '\n' +
      '}\n' +
      '\n' +
      ' function  Aritmeticas(){\n' +
      '    //suma de lets con caracteres\n' +
      '\n' +
      '    console.log("==============Aritmeticas=============");\n' +
      '    let art1 = "Hola "+"C"+""+"O"+""+"M"+""+"P"+""+"I";\n' +
      '    console.log(art1);\n' +
      '    if (art1=="Hola COMPI"){\n' +
      '        punteo = punteo + 3;\n' +
      '    }else {\n' +
      '        console.log("Perdiste 3 puntos en suma de let y let :c");\n' +
      '    }\n' +
      '\n' +
      '    let n1 = 0.0 + 1 + 1 + 1 + 0.1 + 49;\n' +
      '    console.log("El valor de  n1 = "+n1);\n' +
      '    if (n1 == 52.1){\n' +
      '        punteo = punteo + 5;\n' +
      '    }else {\n' +
      '        console.log("Perdiste 5 puntos en suma de enteros booleanos y caracteres :c");\n' +
      '    }\n' +
      '\n' +
      '    let n4 = (5750 * 2) - 11800 + 1.0;\n' +
      '    let n3 = (((3 * 3) + 4) - 80 + 40.00 * 2 + 358.50 - (29 / 14.50)) - (0.50) + n4;\n' +
      '    console.log("El valor de n3 = "+n3);\n' +
      '    if (n3 == 70)\n' +
      '    {\n' +
      '        punteo = punteo + 3;\n' +
      '    }\n' +
      '    else\n' +
      '    {\n' +
      '        console.log("Perdiste 3 puntos :c ");\n' +
      '    }\n' +
      '\n' +
      '    operacionesBasicas();\n' +
      '    operacionesAvanzadas();\n' +
      '    console.log("======================================");\n' +
      '\n' +
      '}\n' +
      '\n' +
      ' function  operacionesBasicas(){\n' +
      '    console.log("Operaciones Aritmeticas 1: valor esperado:  \\na)62   \\nb)0   \\nc)-19   \\nd)256   \\nresultados>");\n' +
      '    let a = (20-10+8/2*3+10-10-10+50);\n' +
      '    let b = (50/50*50+50-100+100-100);\n' +
      '    let c = (100/20*9-78+6-7+8-7+7*1*2*3/3);\n' +
      '    let d = (2 **(20/5*2));\n' +
      '    console.log("a) " +a);\n' +
      '    console.log("b) " +b);\n' +
      '    console.log("c) " +c);\n' +
      '    console.log("d) " +d);\n' +
      '    if (a==62 && b==0 && c == -19 && d ==256){\n' +
      '        console.log("Operaciones aritmeticas 1 bien :D");\n' +
      '        punteo = punteo + 5;\n' +
      '    }else {\n' +
      '        console.log("Error en las operaciones basicas :(");\n' +
      '    }\n' +
      '}\n' +
      '\n' +
      ' function  operacionesAvanzadas(){\n' +
      '    let aritmetica1 = 2;\n' +
      '    let aritmetica2 = -10;\n' +
      '    console.log("Operaciones Aritmeticas 2: valor esperado> -20  41, resultado>");\n' +
      '    let aritmetica3 = aritmetica2*aritmetica1;\n' +
      '    console.log(aritmetica3+"");\n' +
      '    aritmetica1 = aritmetica3/aritmetica1+50 **2/50+50*2-100+100/100-0;\n' +
      '    console.log(aritmetica1+"");\n' +
      '    if (aritmetica3 == -20 && aritmetica1 == 41){\n' +
      '        console.log("Operaciones aritmeticas 2 bien :D");\n' +
      '        punteo = punteo + 5;\n' +
      '    }else {\n' +
      '        console.log("Error Operaciones Aritmeticas :c alv :c");\n' +
      '    }\n' +
      '}\n' +
      '\n' +
      '//FN5HU-3uykL\n' +
      '\n' +
      ' function  logicas(){\n' +
      '     console.log("==============logicas1=============");\n' +
      '    if (!!!!!!!!!!!!!!!!!!!!!!true){\n' +
      '        punteo = punteo + 1;\n' +
      '        console.log("Bien primera condicion :)");\n' +
      '    }else {\n' +
      '        console.log("Perdiste 1 punto :c");\n' +
      '    }\n' +
      '\n' +
      '    if (true && true || false && false && false || !true){\n' +
      '        punteo = punteo + 1;\n' +
      '        console.log("Bien segunda condicion:)");\n' +
      '    }else {\n' +
      '        console.log("Perdiste 1 punto :c");\n' +
      '    }\n' +
      '    console.log("======================================");\n' +
      '    logicas2();\n' +
      '}\n' +
      '\n' +
      ' function  logicas2(){\n' +
      '    let n0 = 16;\n' +
      '         console.log("==============logicas2=============");\n' +
      '\n' +
      '    if (!(!(n0 == 16 && false == true) && !(true))){\n' +
      '            console.log("Not y Ands Correctos");\n' +
      '                        punteo = punteo +3;\n' +
      '\n' +
      '    }else {\n' +
      '                console.log("No funcionan nots y ands :(");\n' +
      '        }\n' +
      '    let n1 = n0 /16;\n' +
      '    n1 = n1 + 1;\n' +
      '        let condicion1 = n1 !=2; //esto es false\n' +
      '        let aritmetica1 = n0/16 + 0; // aritmetica1 = 0\n' +
      '        let condicion2 = aritmetica1 == n1; //false\n' +
      '        let condicion3 = !true; //false\n' +
      '\n' +
      '    if (!(!(!(condicion1||condicion2) || condicion3 ))){\n' +
      '        console.log("Nots y Ors correectos");\n' +
      '                punteo = punteo + 3;\n' +
      '    }else {\n' +
      '            console.log("No Funciona nots y ands :(");\n' +
      '        }\n' +
      '            console.log("======================================");\n' +
      '}\n' +
      '\n' +
      ' function  Relacionales(){\n' +
      '    let n0 = 34;\n' +
      '    let n1 = 16;\n' +
      '\n' +
      '    relaciones1(n0);\n' +
      '    relaciones2(n1);\n' +
      '}\n' +
      '\n' +
      '\n' +
      ' function  relaciones1(salida:number)\n' +
      '{\n' +
      '        console.log("==============relacionales1=============");\n' +
      '        let n0 = salida + 0.0;\n' +
      '        if (n0 < 34.44)\n' +
      '            {\n' +
      '                salida = salida+15;\n' +
      '                if (salida > 44)\n' +
      '                    {\n' +
      '                        salida++;\n' +
      '                    }\n' +
      '            }\n' +
      '            else {\n' +
      '                salida = 1;\n' +
      '            }\n' +
      '\n' +
      '        if (salida != 1)\n' +
      '            {\n' +
      '                if (salida == 50)\n' +
      '                    {\n' +
      '                        console.log("salida Correcta Relacionales 1!");\n' +
      '                        punteo = punteo + 5;\n' +
      '                    }\n' +
      '                    else {\n' +
      '                        console.log("salida incorrecta!!");\n' +
      '                    }\n' +
      '            }\n' +
      '            else {\n' +
      '                console.log("salida incorrecta!!");\n' +
      '            }\n' +
      '        console.log("======================================");\n' +
      '}\n' +
      '\n' +
      ' function  relaciones2(n0:number){\n' +
      '            console.log("vas bien, animo :D");\n' +
      '            console.log("============Relacionales2=============");\n' +
      '\n' +
      '            if (10-15 >= 0 && 44.44 == 44.44)\n' +
      '            {\n' +
      '                console.log("salida incorrecta primer if relacionales2!!");\n' +
      '            }\n' +
      '            else {\n' +
      '                if (15+8 == 22-10+5*3-4 && 13*0>-1)\n' +
      '                    {\n' +
      '                        if (10.0 != 11.0-1.01 )\n' +
      '                            {\n' +
      '                                console.log("salida CORRECTA en relacionales2!!");\n' +
      '                                punteo = punteo + 5;\n' +
      '                            }\n' +
      '                            else {\n' +
      '                                console.log("salida incorrecta segundo if relacionales 2!!");\n' +
      '                            }\n' +
      '                    }\n' +
      '                    else {\n' +
      '                        if (1 == 1)\n' +
      '                            {\n' +
      '                                console.log("salida incorrecta relacionales 2 3er if !!");\n' +
      '                            }\n' +
      '                            else {\n' +
      '                                console.log("salida incorrecta relacionales 2 Sino3er if !!");\n' +
      '                            }\n' +
      '                    }\n' +
      '            }\n' +
      '        console.log("======================================");\n' +
      '        FactorialIterativo(7);\n' +
      '}\n' +
      '\n' +
      'function  FactorialIterativo(n2:number){\n' +
      '                     console.log("==============for Calificar Ciclos=============");\n' +
      '\n' +
      '    let numeroFactorial = n2;\n' +
      '    while(numeroFactorial > -1){\n' +
      '        mostrarFactorial(numeroFactorial);\n' +
      '        numeroFactorial--;\n' +
      '    }\n' +
      '        SentenciasAnidadas();\n' +
      '        console.log("======================================");\n' +
      '\n' +
      '}\n' +
      '\n' +
      ' function  mostrarFactorial(n2:number){\n' +
      '    let fact = 1;\n' +
      '    let str= "El factorial de: "+n2 +" = ";\n' +
      '    if (n2 !=0){\n' +
      '        for(let i=n2; i >0; i--){\n' +
      '            fact = fact * i;\n' +
      '            str = str + i;\n' +
      '            if (i > 1){\n' +
      '                str = str + " * ";\n' +
      '\n' +
      '            }else {\n' +
      '                str = str + " = ";\n' +
      '            }\n' +
      '        }\n' +
      '    }\n' +
      '        str = str + fact+ ";";\n' +
      '    console.log(str);\n' +
      '}\n' +
      '\n' +
      '\n' +
      ' function  figura1(n: number){\n' +
      '\n' +
      '    let letFigura = "";\n' +
      '    for (let i = -3*n/2; i <= n; i++) {\n' +
      '        letFigura = "";\n' +
      '            for (let j = -3*n/2; j <= 3*n/2; j++) {\n' +
      '\n' +
      '                let absolutoi = i;\n' +
      '                let absolutoj = j;\n' +
      '                if (i <0){\n' +
      '                    absolutoi = i*-1;\n' +
      '                }\n' +
      '                if (j < 0){\n' +
      '                    absolutoj = j*-1;\n' +
      '                }\n' +
      '                if ((absolutoi + absolutoj < n)\n' +
      '                    || ((-n/2-i) * (-n/2-i) + ( n/2-j) * ( n/2-j) <= n*n/2)\n' +
      '                    || ((-n/2-i) * (-n/2-i) + (-n/2-j) * (-n/2-j) <= n*n/2)) {\n' +
      '                    letFigura = letFigura + "* ";\n' +
      '                }\n' +
      '                else{\n' +
      '                    letFigura = letFigura + ". ";\n' +
      '                }\n' +
      '            }\n' +
      '            console.log(letFigura);\n' +
      '        }\n' +
      '    console.log("if la figura es un corazon +10 <3");\n' +
      '}\n' +
      '\n' +
      ' function  figura2(){\n' +
      '    let letFigura = "";\n' +
      '     let c = "* ";\n' +
      '        let b = "  ";\n' +
      '        let altura = 10;\n' +
      '        let ancho = 1;\n' +
      '        for (let i = 0; i < altura/4; i++){\n' +
      '            for (let k = 0; k < altura - i; k++){\n' +
      '                letFigura = letFigura+b;\n' +
      '            }\n' +
      '            for (let j = 0; j < i*2 + ancho; j++){\n' +
      '                letFigura = letFigura + c;\n' +
      '            }\n' +
      '\n' +
      '            console.log(letFigura);\n' +
      '            letFigura ="";\n' +
      '        }\n' +
      '         letFigura = "";\n' +
      '         for(let i = 0; i < altura/4; i++){\n' +
      '            for(let k = 0; k < (altura - i) - 2; k++){\n' +
      '                letFigura = letFigura + b;\n' +
      '            }\n' +
      '            for(let j = 0; j < i*2 + 5; j++){\n' +
      '                letFigura = letFigura + c;\n' +
      '            }\n' +
      '\n' +
      '            console.log(letFigura);\n' +
      '            letFigura = "";\n' +
      '        }\n' +
      '         letFigura = "";\n' +
      '        for(let i = 0; i < altura/4; i++){\n' +
      '            for(let k = 0; k < (altura - i) - 4; k++){\n' +
      '                letFigura = letFigura + b;\n' +
      '            }\n' +
      '            for(let j = 0; j < i*2 + 9; j++){\n' +
      '                letFigura = letFigura +c;\n' +
      '            }\n' +
      '\n' +
      '            console.log(letFigura);\n' +
      '            letFigura = "";\n' +
      '        }\n' +
      '\n' +
      '        letFigura ="";\n' +
      '        for(let i = 0; i < altura/4; i++){\n' +
      '            for(let k = 0; k < (altura - i) - 6; k++){\n' +
      '                letFigura = letFigura + b;\n' +
      '            }\n' +
      '            for(let j = 0; j < i*2 + 13; j++){\n' +
      '                letFigura = letFigura + c;\n' +
      '            }\n' +
      '\n' +
      '            console.log(letFigura);\n' +
      '            letFigura = "";\n' +
      '        }\n' +
      '        letFigura = "";\n' +
      '        for(let i = 0; i < altura/4; i++){\n' +
      '            for(let k = 0; k < altura -2; k++){\n' +
      '                letFigura = letFigura + b;\n' +
      '            }\n' +
      '            for(let j = 0; j < 5; j++){\n' +
      '                letFigura = letFigura + c;\n' +
      '            }\n' +
      '\n' +
      '            console.log(letFigura);\n' +
      '            letFigura = "";\n' +
      '        }\n' +
      '\n' +
      '            console.log("if la figura es un Arbol +10 <3");\n' +
      '\n' +
      '       }\n' +
      '\n' +
      ' function  SentenciasAnidadas(){\n' +
      '    let numero1 = 0;\n' +
      '    do{\n' +
      '    switch(numero1){\n' +
      '        case 0:\n' +
      '            figura0(8);\n' +
      '            break;\n' +
      '        case 1:\n' +
      '            figura1(10);\n' +
      '            break;\n' +
      '        case 2:\n' +
      '            figura2();\n' +
      '            break;\n' +
      '        default:\n' +
      '            console.log("Esto se va a console.log 2 veces :3");\n' +
      '\n' +
      '    }\n' +
      '    numero1 = numero1 + 1;\n' +
      '    }while(numero1 <5);\n' +
      '}\n' +
      '\n' +
      ' function  figura0(numero:number){\n' +
      '    let i = 0;\n' +
      '    while(i < numero){\n' +
      '        let j = 0;\n' +
      '        let numeroMostrar = 1;\n' +
      '        let unaFila = "";\n' +
      '        while(j <= i){\n' +
      '            unaFila = unaFila + " " + numeroMostrar;\n' +
      '            numeroMostrar  = numeroMostrar + 1;\n' +
      '            j = j + 1;\n' +
      '        }\n' +
      '        console.log(unaFila);\n' +
      '        i = i + 1;\n' +
      '    }\n' +
      '    console.log("if la figura es un triangulo de numeros + 5 :3");\n' +
      '}\n';
    this.obj1 = '';
    this.obj2 = '';
    this.EL = 0;
    this.ES = 0;
    this.progreso = 0;
    this.traduce = false;
    this.ejecutar = false;
    this.cargadescarga = false;
    this.showTraduction = true;
    this.isMenuCollapsed = true;
    this.rows = '';
    this.rows1 = '';
    this.simbolos = [];
    this.erroresSintacticos = [];
    this.erroresLexicos = [];
    this.simbolitos = [];
  }
  ShowTraduction()
  {
    this.showTraduction = !this.showTraduction;
  }
  setEditorContent(event) {
    this.s = this.obj1;
  }
  setEditorContent1(event) {
    this.s1 = this.obj2;
  }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true , size: 'xl'});
  }
  openScrollableContent1(longContent) {
    this.modalService.open(longContent, { scrollable: true , size: 'xl'});
  }
  openScrollableContent2(longContent) {
    this.modalService.open(longContent, { scrollable: true , size: 'xl'});
  }
  openScrollableContent3(longContent) {
    this.modalService.open(longContent, { scrollable: true , size: 'xl'});
  }
  openScrollableContent4(longContent) {
    this.modalService.open(longContent, { scrollable: true , size: 'xl'});
  }

  Ejecutar(event, value, dg)
  {
    this.simbolos = [];
    this.erroresLexicos = [];
    this.erroresSintacticos = [];
    this.simbolitos = [];
    let sus = true;
    this.EL = 0;
    this.ES = 0;
    (async () => {
      const start = new Date().getTime();
      this.ejecutar = true;
      this.progreso = 10;
      this.salida = '';
      this.obj1 = '';
      await delay(1000);

      try {
        // tslint:disable-next-line:no-console
        console.time('mytimer');
        this.traduction = ParserE.parse(value.value);
        this.progreso = 50;

        this.EL = this.traduction[1].length;
        this.ES = this.traduction[2].length;
        this.progreso = 25;
        if ( this.EL > 0 || this.ES > 0 )
        {
          sus = false;
          let b = 1;
          // tslint:disable-next-line:no-shadowed-variable
          for (const value of this.traduction[1])
          {
            const values = JSON.parse(value.toString());
            const valor = { no: b.toString(), token: values.token, linea: values.linea, columna: values.columna };
            this.erroresLexicos.push(valor);
            b++;
          }

          b = 1;
          // tslint:disable-next-line:no-shadowed-variable
          for (const value of this.traduction[2])
          {
            const values = JSON.parse(value);
            const valor = { no: b.toString(), token: values.token, linea: values.linea, columna: values.columna };
            this.erroresSintacticos.push(valor);
            b++;
          }
        }
        Core.jsondata = this.traduction[0];
        Core.generate(this.traduction[0]);
        this.core = Core.exec();
        this.progreso = 75;
        this.salida = '';
        for (const values of Core.resultado()) {
          // console.log(values);
          if (values.toString().includes('Error:'))
          {
            sus = false;
            this.salida += '[JoWan1998][' + formatDate(new Date(), 'yyyy/MM/dd  HH:mm:ss', 'en') + '] ' + values + '\n';

          }
          else {
            this.salida += '[JoWan1998][' + formatDate(new Date(), 'yyyy/MM/dd  HH:mm:ss', 'en') + '] ' + values + '\n';

          }
        }
        try {
          this.obj1 = this.salida;
          this.rows1 = Core.tablasimbolos();
          const val = JSON.parse(this.rows1);
          let a = 1;
          this.rows = '';
          for (const values of val.simbolos)
          {
            const valor = { no: a.toString(), name: values.name, ambito: values.ambito, tipo: values.tipo, type: values.type };
            this.simbolos.push(valor);
            a++;
          }
          const nnm = JSON.parse(Core.graphs().toString());
          a = 1;
          for (const values of nnm.simbolos)
          {
            const valor = { no: a.toString(), name: values.name, ambito: values.ambito, tipo: values.tipo, type: values.type };
            this.simbolitos.push(valor);
            a++;
          }
        }
        catch (e) {
        }
        const end = new Date().getTime();
        this.duration = ((end - start) / 1000 );
        // tslint:disable-next-line:no-console
        console.timeEnd('mytimer');
        this.progreso = 100;
      } catch (e) {
        sus = false;
        console.error(e);
        // tslint:disable-next-line:max-line-length
        this.obj1 = '[JoWan1998][' + formatDate(new Date(), 'yyyy/MM/dd  HH:mm:ss', 'en') + '] valor: [Unexpected Error]  Error: ' + e.toString() + '\n';
      }
      await delay(1000);
      console.log(this.duration);
      if ( sus )
      {
        this.showSuccess();
      }
      else {
        this.showDanger(dg);
      }
      this.ejecutar = false;
      this.progreso = 0;
    })();
  }

  Traductor(event, value, dg)
  {
    this.simbolos = [];
    this.erroresLexicos = [];
    this.erroresSintacticos = [];
    this.simbolitos = [];
    let sus = true;
    this.EL = 0;
    this.ES = 0;
    (async () => {
      const start = new Date().getTime();
      this.traduce = true;
      this.progreso = 10;
      this.salida = '';
      this.obj1 = '';
      await delay(1000);
      try {
        // tslint:disable-next-line:no-console
        console.time('mytimer');
        this.progreso = 25;
        this.traduction = Parser.parse(value.value);

        this.obj2 = this.traduction[0];
        this.EL = this.traduction[1].length;
        this.ES = this.traduction[2].length;
        this.progreso = 50;
        if ( this.EL > 0 || this.ES > 0 )
        {
          sus = false;
          let b = 1;
          // tslint:disable-next-line:no-shadowed-variable
          for (const value of this.traduction[1])
          {
            const values = JSON.parse(value.toString());
            const valor = { no: b.toString(), token: values.token, linea: values.linea, columna: values.columna };
            this.erroresLexicos.push(valor);
            b++;
          }

          b = 1;
          // tslint:disable-next-line:no-shadowed-variable
          for (const value of this.traduction[2])
          {
            const values = JSON.parse(value);
            const valor = { no: b.toString(), token: values.token, linea: values.linea, columna: values.columna };
            this.erroresSintacticos.push(valor);
            b++;
          }
        }

        Core.jsondata = this.traduction[0];
        Core.generate(this.traduction[0]);
        this.core = Core.exec();
        this.progreso = 75;
        this.progreso = 75;
        this.salida = '';
        for (const values of Core.resultado()) {
          // console.log(values);
          if (values.toString().includes('Error:'))
          {
            sus = false;
            this.salida += '[JoWan1998][' + formatDate(new Date(), 'yyyy/MM/dd  HH:mm:ss', 'en') + '] ' + values + '\n';

          }
          else {
            this.salida += '[JoWan1998][' + formatDate(new Date(), 'yyyy/MM/dd  HH:mm:ss', 'en') + '] ' + values + '\n';

          }
        }

        try {
          this.obj1 = this.salida;
          this.rows1 = Core.tablasimbolos();
          const val = JSON.parse(this.rows1);
          let a = 1;
          this.rows = '';
          for (const values of val.simbolos)
          {
            const valor = { no: a.toString(), name: values.name, ambito: values.ambito, tipo: values.tipo, type: values.type };
            this.simbolos.push(valor);
            a++;
          }
          const nnm = JSON.parse(Core.graphs().toString());
          a = 1;
          for (const values of nnm.simbolos)
          {
            const valor = { no: a.toString(), name: values.name, ambito: values.ambito, tipo: values.tipo, type: values.type };
            this.simbolitos.push(valor);
            a++;
          }
        }
        catch (e) {
        }

        const end = new Date().getTime();
        this.duration = ((end - start) / 1000 );
        // tslint:disable-next-line:no-console
        console.timeEnd('mytimer');
        this.progreso = 100;
      } catch (e) {
        console.error(e);
        // tslint:disable-next-line:max-line-length
        this.obj1 = '[JoWan1998][' + formatDate(new Date(), 'yyyy/MM/dd  HH:mm:ss', 'en') + '] valor: [Unexpected Error]  Error: ' + e.toString() + '\n';
      }
      console.log(this.duration);
      if ( sus )
      {
        this.showSuccess();
      }
      else {
        this.showDanger(dg);
      }
      await delay(1000);
      this.traduce = false;
      this.progreso = 0;

    })();
  }

  showSuccess() {
    this.toastService.show('Compilation Success,\ntime elapsed: ' + this.duration + 'ms', { classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(dangerTpl) {
    this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }



  setEditorContent2($event) {
    $event.value = this.salida;
  }
}
