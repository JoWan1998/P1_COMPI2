import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Parser from 'node_modules/wannantraduction/WT';
import Core from 'node_modules/wannancore/globalCore';


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

  codeMirrorOptions: any = {
    theme: 'lucario',
    mode: 'application/javascript',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: false,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };
  codeMirrorOptions0: any = {
    theme: 'lucario',
    mode: 'application/javascript',
    readOnly: true,
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: false,
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

  ngOnInit() {
    this.obj = 'console.log("HELLO WORLD, ",2020," this is jowan and jowan says, ",1998);';
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

  Ejecutar(event, value)
  {
    this.ejecutar = true;
    console.log(value.value);
    this.ejecutar = false;
  }
  Traductor(event, value1, value)
  {
    (async () => {
      this.traduce = true;
      this.progreso = 10;
      await delay(1000);
      try {
        this.salida = '';
        this.traduction = Parser.parse(value.value);
        this.progreso = 50;
        Core.jsondata = this.traduction;
        console.log(JSON.parse(this.traduction));
        Core.generate(this.traduction);
        this.core = Core.exec();

        this.jsonsalida = JSON.parse(this.core);
        console.log(this.jsonsalida);
        for (const values of this.jsonsalida.salida) {
          if (values.hasOwnProperty('linea')) {
            this.salida += '[JoWan1998] Linea: [' + values.linea + '] Output: ' + values.valor + '\n';
          }
        }
        this.obj1 = this.salida;
        value1.value = this.salida;
        this.progreso = 100;
      } catch (e) {
        console.error(e);
      }
      await delay(1000);
      this.traduce = false;
      this.progreso = 0;
    })();
  }



  setEditorContent2($event) {
    $event.value = this.salida;
  }
}
