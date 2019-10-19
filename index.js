const InkHTML = {
  script: `setTimeout(()=>{ window.print(); window.close();},500)`,
  html: (head, body) => `<!DOCTYPE html><html><head>${head}/head><body>${body}<script>${InkHTML.script}</script></body></html>`,
  print: (body, options) => {
    const defaulWidthHeight = ` width=${screen.availWidth},height=${screen.availHeight}`;
    const defaultOptions = `menubar=no,toolbar=no,location=no,status=no,scrollbars=no,resizable=no,dependent,fullscreen=yes,${defaulWidthHeight}`;
    const mapElements = ["input", "textarea", "select"].map(type => InkHTML.map[type](element));
    const WinPrint = window.open("", "", options || defaultOptions);
    WinPrint.document.write(InkHTML.html(document.head.innerHTML, body.innerHTML)).close();
    WinPrint.focus();
  },
  map: {
    map: (element, elementName, callback) => Array.prototype.slice.call(element.querySelectorAll(elementName)).map(callback),
    mapSelected: element => (element.selected ? element.setAttribute("selected", "selected") : element),
    isInputElement: el => ["checkbox", "radio"].includes(el.type) && el.checked,
    setInputElement: el => (InkHTML.map.isInputElement(el) ? el.setAttribute("checked", "") : el.setAttribute("value", el.value)),
    input: element => InkHTML.map(element, "input", el => InkHTML.map.setInputElement(el)),
    textarea: element => InkHTML.map(element, "textarea", el => (el.innerHTML = el.value)),
    select: element => InkHTML.map(element, "select", el => el.map(InkHTML.map.mapSelected)),
  },
};

export default InkHTML.print;
