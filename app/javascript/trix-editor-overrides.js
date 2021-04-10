// // app/javascript/trix-editor-overrides.js
// window.addEventListener("trix-file-accept", function(event) {
//     event.preventDefault()
//     alert("File attachment not supported!")
//   })

  window.addEventListener("trix-file-accept", function(event) {
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif','image/svg','image/pdf','image/jpg','image/webp', 'document/pdf', 'image/']
    if (!acceptedTypes.includes(event.file.type)) {
      event.preventDefault()
      alert("Only support attachment of jpeg or png files")
    }
  })

// app/javascript/trix-editor-overrides.js
window.addEventListener("trix-file-accept", function(event) {
    const maxFileSize = 3072 * 3072 // 1MB 
    if (event.file.size > maxFileSize) {
      event.preventDefault()
      alert("Only support attachment files upto size 3MB!")
    }
  })