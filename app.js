const auth = "563492ad6f91700001000001740bac64b7834be8a73b8ad606807fdc";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  //Prevent reload page after submit
  e.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}
async function generatePictures(data) {
  //Data = whatever we have from fetchApi
  data.photos.forEach((photo) => {
    const gallerImg = document.createElement("div");
    gallerImg.classList.add("gallery-img");
    gallerImg.innerHTML = `<img src="${photo.src.large}"> </img>
        <p>${photo.photographer}</p>
        `;
    gallery.appendChild(gallerImg);
  });
}

async function curatedPhotos() {
  const data = await fetchApi(
    "https://api.pexels.com/v1/curated/?page=1&per_page=15"
  );
  generatePictures(data);
}

async function searchPhotos(query) {
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}&per_page=15`
  );
  generatePictures(data);
}

curatedPhotos();
