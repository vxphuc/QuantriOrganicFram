let editorInstance;

// 1. Khởi tạo CKEditor
ClassicEditor
  .create(document.querySelector('#editor'))
  .then(editor => {
    editorInstance = editor;
  })
  .catch(error => {
    console.error('CKEditor init error:', error);
  });

// 2. Bắt sự kiện submit form
document.getElementById("newsForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const thumbnailFile = document.getElementById("image").files[0];
  const content = editorInstance.getData(); // Lấy HTML từ CKEditor

  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("content", content);
  formData.append("thumbnail", thumbnailFile);
  console.log(formData);



  // 3. Gửi dữ liệu đến backend
  try {
    const response = await fetch("https://organicfarm.onrender.com/new/create-news", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    if (response.ok) {
      alert("🟢 Đăng tin tức thành công!");
      console.log("Kết quả:", result);
    } else {
      alert("🔴 Lỗi khi gửi dữ liệu: " + result.message);
    }
  } catch (err) {
    console.error("Lỗi gửi dữ liệu:", err);
    alert("🔴 Lỗi kết nối đến máy chủ.");
  }
});
