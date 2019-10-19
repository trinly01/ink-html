const MapElement = {
  map: (element, elementName, callback) => Array.prototype.slice.call(element.querySelectorAll(elementName)).map(callback),
  mapSelected: (element) => element.selected ? element.setAttribute('selected', 'selected') : element,
  isInputElement: (el) => ['checkbox', 'radio'].includes(el.type) && el.checked,
  setInputElement: (el) => this.isInputElement(el) ? el.setAttribute('checked', '') : el.setAttribute('value', el.value),
  input: (element) => this.map(element, "input", (el) => this.setInputElement(el)),
  textarea: (element) => this.map(element, "textarea", (el) => el.innerHTML = el.value),
  select: (element) => this.map(element, "select", (el) => el.map(this.mapSelected))
}

function createHTML(head, body) {
  return `<!DOCTYPE html><html>
  <head>${head}/head>
  <body>${body}<script>
    setTimeout(()=>{ 
        window.print()
        window.close()
      }, 500)</script>
  </body></html>`;
}

function print(body, options) {
  const WinPrint = window.open('', '', options)
  WinPrint.document.write(createHTML(document.head.innerHTML, body))
  WinPrint.document.close();
  WinPrint.focus();
}

export default function (element, options) {
  const defaultOptions = `menubar=no,toolbar=no,location=no,status=no,scrollbars=no,resizable=no,dependent,fullscreen=yes,width=${screen.availWidth},height=${screen.availHeight}`;
  const mapElements = ["input", "textarea", "select"].map((type) => MapElement[type](element));
  print(element.innerHTML, options || defaultOptions);
}