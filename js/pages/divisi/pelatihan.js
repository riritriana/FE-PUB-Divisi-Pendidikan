import { api, isLogin } from "../../scripts.js";
isLogin()
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

//post data
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

async function table() {
    const pelatih = await api("/me");
    const data = (await api("/get-nama-pelatihan-instruktur-anggota", "POST", {
        id_user: pelatih.id
    })).data;

    // Membuat elemen tabel
    const table = document.createElement('table');
    table.classList.add('table');
    table.setAttribute('border', '1');
    table.style.background = '-webkit-linear-gradient(315deg, #1e30f3 0%, #e21e80 100%)';
    table.style.color = '#fff';

    // Membuat elemen <thead> dan baris pertama
    const thead = document.createElement('thead');
    thead.classList.add('thead-dark');

    const firstRow = document.createElement('tr');
    const firstHeaderCell = document.createElement('th');
    firstHeaderCell.setAttribute('colspan', '20');
    firstHeaderCell.style.verticalAlign = 'middle';
    firstHeaderCell.style.textAlign = 'center';
    firstHeaderCell.textContent = `Daftar Nilai Pelatihan ${data.instruktur.categori_pelatihan.name} (${data.instruktur.name})`;
    firstRow.appendChild(firstHeaderCell);

    const rowTwo = document.createElement('tr');
    const row2 = [
        {
            name: "INSTRUKTUR",
            colspan: 1,
            rowspan: 1,
        },
        {
            name: "KUIS",
            colspan: 14,
            rowspan: 2,
        },
        {
            name: "Tugas",
            colspan: 1,
            rowspan: 3,
        },
        {
            name: "UTS",
            colspan: 1,
            rowspan: 3,
        },
        {
            name: "UAS",
            colspan: 1,
            rowspan: 3,
        },
        {
            name: "Hasil",
            colspan: 1,
            rowspan: 3,
        },
        {
            name: "Action",
            colspan: 1,
            rowspan: 3,
        },

    ]
    row2.forEach((data) => {
        const th = document.createElement('th');
        th.setAttribute('colspan', `${data.colspan}`);
        th.setAttribute('rowspan', `${data.rowspan}`);
        th.style.verticalAlign = 'middle';
        th.style.textAlign = 'center';
        th.textContent = data.name;
        rowTwo.appendChild(th);
    });
    console.log(data);
    const rowTri = document.createElement('tr');
    const th = document.createElement('th');
    th.style.verticalAlign = 'middle';
    th.style.textAlign = 'center';
    th.textContent = data.instruktur.user.nama;
    rowTri.appendChild(th);


    const rowfour = document.createElement('tr');
    for (let i = 1; i <= 15; i++) {
        const th = document.createElement('th');
        th.textContent = i === 1 ? 'Anggota' : i - 1;
        th.style.verticalAlign = 'middle';
        th.style.textAlign = 'center';
        rowfour.appendChild(th);
    }

    thead.appendChild(firstRow);
    thead.appendChild(rowTwo);
    thead.appendChild(rowTri);
    thead.appendChild(rowfour);


    const tbody = document.createElement('tbody');


    for (let i = 0; i < data.anggota.length; i++) {
        const anggota = data.anggota[i];
        const row = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.style.verticalAlign = 'middle';
        tdName.style.textAlign = 'center';
        tdName.textContent = anggota.user.nama;
        row.appendChild(tdName);

        for (let j = 1; j <= 14; j++) {
            const td = document.createElement('td');

            if (anggota.nilai[`kuis_${j}`]) {
                td.textContent = anggota.nilai[`kuis_${j}`];
            } else {
                td.innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;";
            }
            td.style.verticalAlign = 'middle';
            td.style.textAlign = 'center';
            row.appendChild(td);
        }
        const tdTugas = document.createElement('td');
        tdTugas.style.verticalAlign = 'middle';
        tdTugas.style.textAlign = 'center';
        tdTugas.textContent = anggota.nilai.tugas ? anggota.nilai.tugas : "-";

        const tdUTS = document.createElement('td');
        tdUTS.style.verticalAlign = 'middle';
        tdUTS.style.textAlign = 'center';
        tdUTS.textContent = anggota.nilai.uts ? anggota.nilai.uts : "-";

        const tdUAS = document.createElement('td');
        tdUAS.style.verticalAlign = 'middle';
        tdUAS.style.textAlign = 'center';
        tdUAS.textContent = anggota.nilai.uas ? anggota.nilai.uas : "-";

        const tdtoal = document.createElement('td');
        tdtoal.style.verticalAlign = 'middle';
        tdtoal.style.textAlign = 'center';
        tdtoal.textContent = anggota.nilai.uas ? anggota.nilai.uas : "-";

        // Membuat elemen <td>
        const td = document.createElement('td');
        td.style.display = 'flex';
        td.style.alignItems = 'center';
        td.style.justifyContent = 'space-around';
        td.style.gap = '4px';

        // Membuat elemen untuk tombol edit
        const divEdit = document.createElement('div');
        divEdit.classList.add('d-flex', 'justify-content-center', 'fs-2', 'gap-4');
        const aEdit = document.createElement('a');
        aEdit.style.color = '#fff';
        aEdit.href = '#';
        const iEdit = document.createElement('i');
        iEdit.classList.add('bi', 'bi-pencil-square');
        aEdit.appendChild(iEdit);
        divEdit.appendChild(aEdit);

        // Membuat elemen untuk tombol hapus
        const divDelete = document.createElement('div');
        divDelete.classList.add('d-flex', 'justify-content-center', 'fs-2', 'gap-4');
        const aDelete = document.createElement('a');
        aDelete.style.color = '#fff';
        aDelete.href = '#';
        const iDelete = document.createElement('i');
        iDelete.classList.add('bi', 'bi-trash3');
        aDelete.appendChild(iDelete);
        divDelete.appendChild(aDelete);

        // Menambahkan elemen-elemen ke dalam elemen <td>
        td.appendChild(divEdit);
        td.appendChild(divDelete);

        row.appendChild(tdTugas);
        row.appendChild(tdUTS);
        row.appendChild(tdUAS);
        row.appendChild(tdtoal);
        row.appendChild(td);
        tbody.appendChild(row);
    }
    table.appendChild(thead);
    table.appendChild(tbody);

    document.querySelector("#table").appendChild(table);
}

table();