import { api } from "../../scripts.js";

const caption = document.querySelector("#caption");
const silang = document.querySelector("#silang");
const addPelatihan = document.querySelector("#add-pelatihan");
const anggota = document.querySelector("#anggota");

addPelatihan.addEventListener("click", async () => {
    const kumpulanData = await api("/get-nama-anggota-pelatihan", "POST");
    kumpulanData.data.forEach(data => {
        const option = document.createElement("option");
        option.innerHTML = data.user.nama;
        option.value = data.user.id;
        anggota.appendChild(option);
    });

    caption.style.display = "block";
});
document.add_nilai.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        jenis_nilai: document.querySelector('#jenis-nilai').value,
        id_user: document.querySelector('#anggota').value,
        nilai: document.add_nilai.nilai.value
    }
    await api("/menambah-nilai-pelatihan", "POST", data);
    alert("okeee")
}


silang.addEventListener("click", () => {

    caption.style.display = "none";
});