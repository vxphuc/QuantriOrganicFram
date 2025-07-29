
function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    console.log("Params:", params.get('slug'));
    return params.get('slug');
}

async function renderNewsDetail() {
    const slug = getIdFromUrl();
    if (!slug) {
        document.querySelector('.detailpress-title').innerHTML = "<h2>Không tìm thấy tin tức!</h2>";
        return;
    }
    const url = `https://organicfarm.onrender.com/new/get-news-by-slug/${slug}`;
    try {
        const res = await fetch(url);
        const news = await res.json();
        console.log("News detail:", news);

        // Sửa chỗ này: lấy object chi tiết thực sự
        const detail = news.news;

        // Render phần tiêu đề + mô tả + ngày tạo
        document.querySelector('.detailpress-title').innerHTML = `
            <h1>${detail.title || ""}</h1>
            <p>${detail.description || ""}</p>
            <div">
                <img src="${detail.thumbnail || ""}"">
            </div>
        `;

        // Render từng ảnh chi tiết
        document.querySelector('.detailpress-content').innerHTML =
         `
            <div class="detailpress-main">
                <div class="text">
                    <p>${detail.content || ""}</p>
                </div>
            </div>
        `;
    } catch (e) {
        document.querySelector('.detailpress-title').innerHTML = "<h2>Không tìm thấy chi tiết tin tức!</h2>";
    }
}
renderNewsDetail();