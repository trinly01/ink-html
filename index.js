export default function (elem, options) {
  options = options ||
    'menubar=no, toolbar=no, location=no, status=no, scrollbars=no, resizable=no, dependent, fullscreen=yes' +
    ', width=' + screen.availWidth + ', height=' + screen.availHeight
  var pageElement = elem
  var inputElements = Array.prototype.slice.call(pageElement.querySelectorAll('input'))
  console.log(inputElements)
  inputElements.map(function (el) {
    if (['checkbox', 'radio'].includes(el.type) && el.checked) {
      el.setAttribute('checked', '')
    } else {
      el.setAttribute('value', el.value)
    }
  })
  var textareaElements = Array.prototype.slice.call(pageElement.querySelectorAll('textarea'))
  textareaElements.map(function (el) {
    el.innerHTML = el.value
  })
  var selectElements = Array.prototype.slice.call(pageElement.querySelectorAll('select'))
  selectElements.map(function (el) {
    el.map(op => {
      if (op.selected) op.setAttribute('selected', 'selected')
    })
  })

  // Get HTML to print from element
  const prtHtml = elem.innerHTML

  // Get all stylesheets HTML
  // let stylesHtml = ''
  // for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
  //   stylesHtml += node.outerHTML
  // }

  // Open the print window
  console.log(document.head)
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
  // console.log(WinPrint.document.styleSheets)
  // WinPrint.document.ready(() => {
  //   WinPrint.print()
  //   WinPrint.close()
  // })
  // WinPrint.document.head = document.head
}
