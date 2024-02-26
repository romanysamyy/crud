let title = document.getElementById("title");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let Count = document.getElementById("Count");
let catogery = document.getElementById("catogery");
let sumbit = document.getElementById("sumbit");

mood = "Create";
let tmp;

function getTotal() {
  if (price != "") {
    let result = +price.value + +ads.value + +taxes.value - +discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = "";
  }
}

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

sumbit.onclick = function () {
  newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    Count: Count.value,
    catogery: catogery.value.toLowerCase(),
  };
  if (mood === "Create") {
    if (newPro.Count > 1) {
      for (let i = 0; i < newPro.Count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    sumbit.innerHTML = "Create";
    Count.style.display = "block";
  }

  dataPro.push(newPro);
  localStorage.setItem("product", JSON.stringify(dataPro));
  console.log(dataPro);

  clearData();
  readData();
};

function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "";
  Count.value = "";
  catogery.value = "";
}

function readData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].catogery}</td>
    <td><button onclick="UpdateData(${i})"  id="update"> update</button></td>
    <td><button onclick="DelateData(${i})" id="delete">delete</button></td>
  
  </tr>
    
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let dtnDelete = document.getElementById("deleteall");
  if (dataPro.length > 0) {
    dtnDelete.innerHTML = ` <button onclick = "DeleteAll()"> Delete All (${dataPro.length})</button>`;
  } else {
    dtnDelete.innerHTML = "";
  }
}
readData();

function DelateData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  readData();
}

function DeleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  readData();
}

function UpdateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  ads.value = dataPro[i].ads;
  taxes.value = dataPro[i].taxes;
  discount.value = dataPro[i].discount;
  getTotal();
  Count.style.display = "none";

  catogery.value = dataPro[i].catogery;
  sumbit.innerHTML = "Update";
  mood = "Update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let TitleMood = "title";
function changeMood(id) {
  let SearchMood = document.getElementById("search");
  if (id == "btn-title") {
    TitleMood = "title";
    SearchMood.placeholder = "Search By Title";
  } else {
    TitleMood = "category";
    SearchMood.placeholder = "Search By Category";
  }
  SearchMood.focus();
  SearchMood.value = "";
  readData();
}

function SearchData(value) {
  let table = "";
  if (TitleMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].catogery}</td>
        <td><button onclick="UpdateData(${i})"  id="update"> update</button></td>
        <td><button onclick="DelateData(${i})" id="delete">delete</button></td>
      
      </tr>
        
        `;
      }
    }
  } else {
    if (dataPro[i].catogery.include(value.toLowerCase())) {
      table += `
    <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].catogery}</td>
    <td><button onclick="UpdateData(${i})"  id="update"> update</button></td>
    <td><button onclick="DelateData(${i})" id="delete">delete</button></td>
  
  </tr>
    
    `;
    }
  }
  document.getElementById("tbody").innerHTML = table;
}









