import { api} from "../../scripts"
const getJadwal= async()=>{
    const kumpulanData = await api("/get-jadwal-user");
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    // div.style.height = '80%';
    div.style.alignItems = 'center';
    const h1 = document.createElement("h1");
    h1.textContent = "Data Pelatihan Tidak Ada"
    h1.className = "text-gradient"
    div.appendChild(h1);

    document.querySelector("#table").appendChild(div)
}
getJadwal();