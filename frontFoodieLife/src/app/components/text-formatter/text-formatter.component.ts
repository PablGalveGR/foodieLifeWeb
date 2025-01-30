import { Component } from '@angular/core';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-text-formatter',
  standalone: true,
  imports: [EditorComponent],
  templateUrl: './text-formatter.component.html',
  styleUrl: './text-formatter.component.css',
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class TextFormatterComponent {
  init: EditorComponent['init'] = {
    plugins: 'lists code help wordcount',
    menubar:false,
    base_url: '/tinymce', // Root for resources
    suffix: '.min'        // Suffix to use when loading resources
  };
}
