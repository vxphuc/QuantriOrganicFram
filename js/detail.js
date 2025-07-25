let editorInstance;
    ClassicEditor
      .create(document.querySelector('#editor'))
      .then(editor => {
        editorInstance = editor;
      })
      .catch(error => {
        console.error(error);
      });

    document.getElementById('myForm').onsubmit = function(e) {
      e.preventDefault();
      var data = editorInstance.getData();
      alert('Nội dung nhập: ' + data);
    };