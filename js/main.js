const selected = document.querySelector(".selected");
const optionContainer = document.querySelector(".options-container");

const optionList=document.querySelectorAll(".option");

selected.addEventListener("click",()=>{
    optionContainer.classList.toggle("active");

});
optionList.forEach(e =>{
    e.addEventListener("click", ()=>{
        selected.innerHTML=e.querySelector("label").innerHTML;
        optionContainer.classList.remove("active");
    })
})