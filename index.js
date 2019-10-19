class InkHTML {
  constructor() {
    this.map = {
      input: element => this.mapElement(element, "input", el => this.setInputElement(el)),
      textarea: element => this.mapElement(element, "textarea", el => (el.innerHTML = el.value)),
      select: element => this.mapElement(element, "select", el => el.map(this.mapSelected)),
    };
  }

  script() {
    return `setTimeout(()=>{ window.print(); window.close();},500)`;
  }

  html(head, body) {
    return `<!DOCTYPE html><html><head>${head}</head><body>${body}<script>${this.script()}</script></body></html>`;
  }

  print(body, options) {
    const defaultWidthHeight = `width=${screen.availWidth},height=${screen.availHeight}`;
    const defaultOptions = `menubar=no,toolbar=no,location=no,status=no,scrollbars=no,resizable=no,dependent,fullscreen=yes,${defaultWidthHeight}`;
    const mapElements = Object.keys(this.map).map(type => this.map[type](element));
    const WinPrint = window.open("", "", options || defaultOptions);
    WinPrint.document.write(this.html(document.head.innerHTML, body.innerHTML)).close();
    WinPrint.focus();
  }

  mapElement(element, elementName, callback) {
    return Array.prototype.slice.call(element.querySelectorAll(elementName)).map(callback);
  }

  mapSelected(element) {
    return element.selected ? element.setAttribute("selected", "selected") : element;
  }

  isInputElement(element) {
    return ["checkbox", "radio"].includes(element.type) && element.checked;
  }

  setInputElement(element) {
    this.isInputElement(element) ? element.setAttribute("checked", "") : element.setAttribute("value", element.value);
  }
}

const app = new InkHTML();
export default app.print;
