const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more");
const infoImg = document.querySelector("h4");

let page = 1;
let keyword = "";
const accessKey = import.meta.env.VITE_API_KEY;

async function searchImage(){
   keyword = searchBox.value; 
   
   const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

   if(searchBox.value == ""){
      infoImg.innerHTML = `<h3>कृपया सर्च तो कर लो...!</h3>`;
      infoImg.style.display = "block";
   }else{ 
      infoImg.innerText = `Images about: ${searchBox.value}`;
      infoImg.style.display = "block";
   }

   const response = await fetch(url);
   const data = await response.json();
   console.log(data);

   const results = data.results;

   results.forEach((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;

      imageLink.target = "_blank";//when you click on img,it jumps on new tab. if you do not write it it open in same tab.

      imageLink.appendChild(image);
      searchResult.appendChild(imageLink);
   });

   showMore.style.display = "block";   
};

searchForm.addEventListener("submit",(e) => {
   e.preventDefault();//prevent the default action when form submit, it stops the browser's default behavior.
   page = 1;
   searchImage();
});

showMore.addEventListener("click",() => {
   page++;
   searchImage();
});