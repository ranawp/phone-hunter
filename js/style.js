//spinner 
const toggleSpinner = displaystyle => {
    document.getElementById('spinner').style.display = displaystyle

}
//spinner loading time 
const toggoleSearch = displayStyle => {
    document.getElementById('all-mobile').style.display = displayStyle
}
//error massage 
const errorMassage = displayStyle => {
    document.getElementById('error-massage').style.display = displayStyle
}

//get input field data
const getMobileData = () => {
    const inputField = document.getElementById('input-field').value
    inputField.value = ''
    toggleSpinner('block')
    toggoleSearch('none')
    loadData(inputField)
}

// fetch data from api
const loadData = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    const res = await fetch(url)
    const data = await res.json()
    displayData(data.data)
}

//display all data
const displayData = mobileData => {
    const displayMobile = document.getElementById('display-mobile')
    displayMobile.textContent = ''
    if (mobileData) {
        mobileData.forEach(data => {
            const div = document.createElement('div')
            div.classList.add('col-lg-4')
            div.classList.add('col-12')
            div.innerHTML = `
            
            <div class="card mb-3" style="width: 18rem;">
      <img width="img-fluid"  src="${data.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${data.phone_name}</h5>
        <p class="card-text">${data.brand}</p>
        <a onclick='singlePhoneDetail("${data.slug}")' href="#" class="btn btn-primary">Details</a> 
      </div>
    </div>`
            displayMobile.appendChild(div)

        });
        errorMassage('none')
    } else {
        errorMassage('block')
    }

    toggleSpinner('none')
    toggoleSearch('block')
}


//fetch mobile details 
const singlePhoneDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    const res = await fetch(url)
    const data = await res.json()
    displaySinglephone(data.data)

}

const displaySinglephone = data => {
    // console.log(data)
    const singleMobile = document.getElementById('single-Mobile')
    singleMobile.textContent = ''
    const div = document.createElement('div')
    div.innerHTML = ` 
        <div class="card" style="width: 18rem;">
  <img src="${data.image}" class="card-img-top" alt="...">
  <div class="card-body">

    <h5 class="card-title"><span class="font-weight-bold text-info

    ">Name:</span>${data.name}</h5>
    <p class="card-title"><span class="text-info

    font-weight-bold">Brand:</span>${data.brand}</p>
    <p class="card-text text-success"><span class="text-info font-weight-bold">Relase Date: </span>${data.releaseDate}</p>
    <p class="text-success card-text"><span class="text-info font-weight-bold">Cheap set:</span>${data.chipSet}</p>
    <p class="text-success card-text font-weight-bold"><span class="text-info font-weight-bold">Memory:</span>${data.memory}</p>
    <p class="text-success card-text"><span class="text-info font-weight-bold">Storage:</span>${data.storage}</p>
    <p class="text-success card-text"><span class="text-info font-weight-bold">Display Size:</span>${data.displaySize}</p>
  </div>
</div>
        `
    singleMobile.appendChild(div)


    /*  data.forEach(mobileDetails => {
         console.log(mobileDetails)
 
         div.innerHTML = ` 
         <div class="card" style="width: 18rem;">
   <img src="${mobileDetails.image}" class="card-img-top" alt="...">
   <div class="card-body">
 
     <h5 class="card-title">Brand:${mobileDetails.name}</h5>
     <p class="card-title">Brand:${mobileDetails.brand}</p>
     <p class="card-text">Relase Date: ${mobileDetails.releaseDate}</p>
     <p class="card-text">Cheap set:${mobileDetails.chipSet}</p>
     <p class="card-text">Memory:${mobileDetails.memory}</p>
     <p class="card-text">Storage:${mobileDetails.storage}</p>
     <p class="card-text">Display Size:${mobileDetails.displaySize}</p>
   </div>
 </div>
         `
         singleMobile.appendChild(div)
 
     }) */
}

