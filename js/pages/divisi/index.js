const caption = document.querySelector("#caption");
const silang = document.querySelector("#silang");
const addPelatihan = document.querySelector("#add-pelatihan");


addPelatihan.addEventListener("click", () => {
    caption.style.display = "block";
});

silang.addEventListener("click", () => {

    caption.style.display = "none";
});