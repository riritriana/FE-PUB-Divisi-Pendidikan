import { api, isLogin } from "../../scripts.js";
isLogin();

let fromEdit = {};
let fromDelete = {};

document.querySelector("#button-tambah").onclick = async () => {
    document.querySelector("#tambah").style.display = "block"
    const categori = await api("/get-categori");
    categori.data.forEach(val => {
        const option = document.createElement("option");
        option.value = val.id;
        option.innerHTML = val.name;
        option.style.textAlign = "center";
        // option.style.color = "-webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)";
        document.querySelector("#jenis-nilai").appendChild(option);
    });

    const hari = await api("/get-hari");
    hari.data.forEach(val => {
        const option = document.createElement("option");
        option.value = val.hari;
        option.innerHTML = val.hari;
        option.style.textAlign = "center";
        // option.style.color = "-webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)";
        document.querySelector("#hari").appendChild(option);
    });
    const jam = await api("/get-jam");
    jam.data.forEach(val => {
        const option = document.createElement("option");
        option.value = val.jam;
        option.innerHTML = val.jam;
        option.style.textAlign = "center";
        // option.style.color = "-webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)";
        document.querySelector("#jam").appendChild(option);
    });
    const instruktur = await api("/get-instruktur");
    instruktur.data.forEach(val => {
        const option = document.createElement("option");
        option.value = val.id;
        option.innerHTML = val.nama;
        option.style.textAlign = "center";
        // option.style.color = "-webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)";
        document.querySelector("#instruktur").appendChild(option);
    });
};

document.ubah_nilai.onsubmit = async (e) => {
    e.preventDefault();
    const hari = document.ubah_nilai.hari2.value;
    const jam = document.ubah_nilai.jam2.value;
    if (jam && hari) {
        const data = await api("/ubah-jadwal-pelatihan", "PUT", {
            id: fromEdit.id || "",
            hari,
            jam
        });
        alert("Berhasil mengubah Jadwal");
        location.reload();
    } else {
        alert("Tidak boleh pilih option (Pilih Hari atau Pilih Jam )");
    }

}

document.querySelector("#silang-1").onclick = () => document.querySelector("#tambah").style.display = "none";
document.querySelector("#silang-2").onclick = () => document.querySelector("#edit-1").style.display = "none";


document.add_nilai.onsubmit = async (e) => {
    e.preventDefault();
    const data = await api("/add-pelatihan", "POST", {
        name: document.add_nilai.name.value,
        id_categori_pelatihan: document.add_nilai.categori_pelatihan.value,
        id_pelatihan_instruktur: document.add_nilai.instruktur.value,
        jam: document.add_nilai.jam.value,
        hari: document.add_nilai.hari.value
    });
    document.querySelector("#tambah").style.display = "none";
    if(data.success) {
        alert("Berhasil menambah pelatihan")
        location.reload();
    }else{
        alert("Coba Beberapa saat lagi")
    }
}


const getJadwal = async () => {
    const kumpulanData = await api("/get-jadwal-pembina");

    if (kumpulanData.data.jadwal.length > 0) {
        kumpulanData.data.jadwal.forEach(data => {
            const table = document.createElement("table");
            table.classList.add("table");
            table.setAttribute("border", "1");
            table.setAttribute("style", "background: -webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%); color: #fff;");

            // Buat elemen thead
            // Membuat elemen div
            const outerDiv = document.createElement('div');
            outerDiv.style.display = 'flex';
            outerDiv.style.justifyContent = 'end';

            // Membuat elemen div di dalam elemen div pertama
            const innerDiv = document.createElement('div');
            innerDiv.className = 'd-flex justify-content-center fs-3 gap-1';

            // Membuat tombol edit
            const editButton = document.createElement('button');
            editButton.className = 'text-gradient edit';
            editButton.style.border = 'none';
            editButton.href = '#';
            editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';
            editButton.addEventListener('click', async function () {
                document.querySelector("#edit-1").style.display = "block";
                document.ubah_nilai.value = data.categori_pelatihan.name;
                document.ubah_nilai.nama_kelompok.value = data.name || "";
                const hari = await api("/get-hari");
                if (hari.success) {
                    console.log(data.jadwal_pelatihan.hari);
                    hari.data.forEach(h => {
                        const option = document.createElement('option');
                        option.value = h.hari;
                        option.textContent = h.hari;
                        option.selected = data.jadwal_pelatihan.hari == h.hari;
                        document.querySelector("#hari2").appendChild(option);

                    })
                }
                const jam = await api("/get-jam");
                if (jam.success) {
                    jam.data.forEach(h => {
                        const option = document.createElement('option');
                        option.value = h.jam;
                        option.textContent = h.jam;
                        option.selected = data.jadwal_pelatihan.jam == h.jam;
                        document.querySelector("#jam2").appendChild(option);
                    })
                }
                fromEdit.id = data.id;
                document.querySelector(".edit").onclick = () => document.querySelector("#edit-1").style.display = "block";

            });

            // Membuat tombol hapus
            const deleteLink = document.createElement('button');
            deleteLink.className = 'text-gradient';
            deleteLink.style.border = "none"
            deleteLink.href = '#';
            deleteLink.innerHTML = '<i class="bi bi-trash3"></i>';
            deleteLink.addEventListener('click', async function () {
                // Logika untuk menghapus

                fromDelete.id = data.id;
                if (confirm("Apakah anda yakin, ingin menghapus Pelatihan " + data.categori_pelatihan.name + " Kelompok " + data.name + "?")) {
                    const data = await api("/delete-pelatihan", "DELETE", { id: fromDelete.id });
                    if (data.success) {
                        alert(data.msg);
                        location.reload();
                    } else {
                        alert("Hatap Coba beberapa saat lagi");
                    }
                }
            });

            // Meletakkan tombol edit dan hapus di dalam elemen div kedua
            innerDiv.appendChild(editButton);
            innerDiv.appendChild(deleteLink);

            // Meletakkan elemen div kedua di dalam elemen div pertama
            outerDiv.appendChild(innerDiv);

            // Meletakkan elemen div pertama di dalam elemen dengan ID yang diinginkan
            // const container = document.getElementById('container'); // Ganti 'container' dengan ID yang sesuai
            document.querySelector("#table").appendChild(outerDiv);

            // table.appendChild(outerDiv);

            const thead = document.createElement("thead");
            thead.classList.add("thead-dark");

            // Buat baris pertama thead
            const firstRow = document.createElement("tr");
            const firstRowHeader = document.createElement("th");
            firstRowHeader.setAttribute("scope", "col");
            firstRowHeader.setAttribute("colspan", "6");
            firstRowHeader.setAttribute("style", "vertical-align: middle; text-align: center;");
            firstRowHeader.textContent = `Pelatihan ${data.categori_pelatihan.name} (${data.name}) `;
            firstRow.appendChild(firstRowHeader);
            thead.appendChild(firstRow);

            // Buat baris kedua thead
            const secondRow = document.createElement("tr");
            const instrukturHeader = document.createElement("th");
            instrukturHeader.setAttribute("colspan", "3");
            instrukturHeader.setAttribute("style", "vertical-align: middle; text-align: center;");
            instrukturHeader.textContent = "Instruktur " + data.categori_pelatihan.name;
            secondRow.appendChild(instrukturHeader);
            const anggotaHeader = document.createElement("th");
            anggotaHeader.setAttribute("colspan", "3");
            anggotaHeader.setAttribute("style", "vertical-align: middle; text-align: center;");
            // console.log(data.user.nama);
            anggotaHeader.textContent = data.user?.nama || "";
            secondRow.appendChild(anggotaHeader);
            thead.appendChild(secondRow);

            // Buat baris ketiga thead
            var thirdRow = document.createElement("tr");
            var anggotaTitle = document.createElement("th");
            anggotaTitle.setAttribute("colspan", "3");
            anggotaTitle.setAttribute("style", "vertical-align: middle; text-align: center;");
            anggotaTitle.textContent = "Anggota";
            thirdRow.appendChild(anggotaTitle);
            var jadwalTitle = document.createElement("th");
            jadwalTitle.setAttribute("colspan", "3");
            jadwalTitle.setAttribute("style", "vertical-align: middle; text-align: center;");
            jadwalTitle.textContent = "Jadwal Pelatihan";
            thirdRow.appendChild(jadwalTitle);
            thead.appendChild(thirdRow);

            // Masukkan thead ke dalam tabel
            table.appendChild(thead);
            var tbody = document.createElement("tbody");

            // Buat baris pertama data
            if (data.kumpulan_anggota.length > 0) {
                data.kumpulan_anggota.forEach((anggota, index) => {
                    const tr = document.createElement("tr");
                    const td = document.createElement("td");
                    td.setAttribute("colspan", "3");
                    td.setAttribute("style", "vertical-align: middle; text-align: center;");
                    td.textContent = anggota.user.nama;
                    tr.appendChild(td);
                    if (index === 0) {
                        const td2 = document.createElement("td");
                        td2.setAttribute("rowspan", data.kumpulan_anggota.length);
                        td2.setAttribute("colspan", "3");
                        td2.setAttribute("style", "vertical-align: middle; text-align: center;");
                        td2.textContent = data.jadwal_pelatihan.hari + " / " + data.jadwal_pelatihan.jam;
                        tr.appendChild(td2);
                    }

                    tbody.appendChild(tr);

                });
            } else {
                const tr = document.createElement("tr");
                const td = document.createElement("td");
                td.setAttribute("colspan", "3");
                td.setAttribute("style", "vertical-align: middle; text-align: center;");
                td.textContent = "-";
                tr.appendChild(td);
                const td2 = document.createElement("td");
                td2.setAttribute("rowspan", "1");
                td2.setAttribute("colspan", "3");
                td2.setAttribute("style", "vertical-align: middle; text-align: center;");
                td2.textContent = data.jadwal_pelatihan.hari + " / " + data.jadwal_pelatihan.jam;
                tr.appendChild(td2);


                tbody.appendChild(tr);

            }



            table.appendChild(tbody);
            document.querySelector("#table").appendChild(table);

        })
    } else {
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


}

getJadwal();