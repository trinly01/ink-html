function mapElement(pageElement, elementName, callback) {
  const element = Array.prototype.slice.call(pageElement.querySelectorAll(elementName));
  return element.map(callback);
}

function mapInputElements(pageElement) {
  const isInputElement = (el) => ['checkbox', 'radio'].includes(el.type) && el.checked;
  return mapElement(pageElement, "input", (el) => isInputElement(el) ? el.setAttribute('checked', '') : el.setAttribute('value', el.value));
}

function mapTextareaElements(pageElement) {
  return mapElement(pageElement, "textarea", (el) => el.innerHTML = el.value);
}

function mapSelectedElement(element) {
  if (element.selected) element.setAttribute('selected', 'selected');
}

function mapSelectElements(pageElement) {
  return mapElement(pageElement, "select", (el) => el.map(mapSelectedElement));
}

function createHTML(head, body) {
  return `<!DOCTYPE html><html>
  <head>${head}/head>
    <body>${body}
      <script>
      setTimeout(()=>{ 
          window.print()
          window.close()
        }, 500)
      </script>
    </body>
  </html>`;
}

function print(prtHtml, options) {
  const WinPrint = window.open('', '', options)
  WinPrint.document.write(createHTML(document.head.innerHTML, prtHtml))
  WinPrint.document.close();
  WinPrint.focus();
}

export default function (elem, options) {
  const defaultOptions = `menubar=no,toolbar=no,location=no,status=no,scrollbars=no,resizable=no,dependent,fullscreen=yes,width=${screen.availWidth},height=${screen.availHeight}`;
  options = options || defaultOptions;

  // Map elements
  let inputElement = mapInputElements(elem);
  let textareaElement = mapTextareaElements(elem);
  let selectElement = mapSelectElements(elem);

  // Get HTML to print from element
  print(elem.innerHTML, options);
}