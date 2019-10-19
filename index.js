export default function (elem, options) {
  options = options ||
    'menubar=no, toolbar=no, location=no, status=no, scrollbars=no, resizable=no, dependent, fullscreen=yes' +
    ', width=' + screen.availWidth + ', height=' + screen.availHeight
  let pageElement = elem
  let inputElements = Array.prototype.slice.call(pageElement.querySelectorAll('input'))
  inputElements.map(function (el) {
    if (['checkbox', 'radio'].includes(el.type) && el.checked) {
      el.setAttribute('checked', '')
    } else {
      el.setAttribute('value', el.value)
    }
  })
  let textareaElements = Array.prototype.slice.call(pageElement.querySelectorAll('textarea'))
  textareaElements.map(function (el) {
    el.innerHTML = el.value
  })
  let selectElements = Array.prototype.slice.call(pageElement.querySelectorAll('select'))
  selectElements.map(function (el) {
    el.map(op => {
      if (op.selected) op.setAttribute('selected', 'selected')
    })
  })

  // Get HTML to print from element
  const prtHtml = elem.innerHTML

  // Open the print window
  const WinPrint = window.open('', '', options)
  WinPrint.document.write(`<!DOCTYPE html>
  <html>
    <head>
      ${document.head.innerHTML}
      <style>
      </style>
    </head>
    <body>
      ${prtHtml}
      <script>
        // self executing function here
        setTimeout(function(){ 
          window.print()
          window.close()
        }, 500)
      </script>
    </body>
  </html>`)

  WinPrint.document.close()
  WinPrint.focus()
}