import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'JWEditor';
  obj: string;

  codeMirrorOptions: any = {
    theme: 'lucario',
    mode: 'application/javascript',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    smartIndent: true,
    indentWithTabs: true,
    lint: true
  };

  ngOnInit() {
    this.obj = 'const HelloWorld = \'Hello World!!!\';\nconsole.log(HelloWorld);';
  }

  setEditorContent(event) {
    // console.log(event, typeof event);
    console.log(this.obj);
  }

}
