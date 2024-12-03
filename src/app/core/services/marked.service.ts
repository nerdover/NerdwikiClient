import { ElementRef, Injectable } from '@angular/core';
import renderMathInElement from 'katex/contrib/auto-render';
import { marked } from 'marked';

const renderer = new marked.Renderer();

renderer.code = ({ text, lang }) => {
  const [language, lineHighlights] = lang?.split(/\s+/) || [];

  if (language.startsWith('@')) {
    return `<pre class="command-line language-${language.slice(
      1
    )}" data-user="root" data-host="localhost"><code>${text}</code></pre>`;
  }

  let lineDataAttr = '';
  if (lineHighlights?.startsWith('{') && lineHighlights.endsWith('}')) {
    lineDataAttr = lineHighlights.slice(1, -1); // Strip out {}
  }
  return `<pre data-line="${lineDataAttr}" class="language-${language} line-numbers"><code>${text}</code></pre>`;
};

const katexOptions = {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
    { left: '\\(', right: '\\)', display: false },
    { left: '\\[', right: '\\]', display: true },
  ],
  throwOnError: false,
};

marked.setOptions({
  renderer,
  breaks: true,
});

declare let Prism: {
  languages: { [language: string]: any };
  highlight: (text: string, grammar: any, language: string) => string;
  highlightAllUnder: (element: Element | Document) => void;
};

@Injectable({
  providedIn: 'root',
})
export class MarkedService {
  parse(container: ElementRef<HTMLElement>, content: string) {
    let dataHtml = marked.parse(content, {
      async: false,
    });

    container.nativeElement.innerHTML = dataHtml;

    renderMathInElement(container.nativeElement, katexOptions);
    Prism.highlightAllUnder(container.nativeElement);
  }
}
