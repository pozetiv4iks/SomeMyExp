const searchForm = document.getElementById('searchForm');
const searhResult = document.getElementById('imageContainer');
const searchBox = document.getElementById('searchInput');
const accessKey = "E5yj9HUHvdQya3tJd91vfkJrIhVx7eg5NhZAVXbMGL4";
let keyword = "";
let page = 1;
async function upload(){
    searchBox.focus()
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=random&client_id=${accessKey}&per_page=9`;
    const response = await fetch(url);
    const data = await response.json();
    if(page === 1){
        searhResult.innerHTML = "";
    }

    const results = data.results;
    
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searhResult.appendChild(imageLink);
    })

}

upload()

async function searchImages(){
    if(searchBox.value === ''){
        keyword = "random";
    }else{
    keyword = searchBox.value;}
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=9`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searhResult.innerHTML = "";
    }

    const results = data.results;
    
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searhResult.appendChild(imageLink);
    })
}
 searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
 })