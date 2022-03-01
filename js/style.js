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
    document.getElementById('input-field').value = ''
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
    displayData(data)
}

//display all mobile data
const displayData = allData => {
    const mobileData = allData.data
    const displayMobile = document.getElementById('display-mobile')
    const sliceData = mobileData.slice(0, 20)
    displayMobile.textContent = ''
    if (allData.status == false) {
        errorMassage('block')
    } else {
        errorMassage('none')
    }

    sliceData.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('col-lg-4')
        div.classList.add('col-12')
        div.classList.add('col-md-6')

        div.innerHTML = `
                <div class="card mb-3 shadow p-3 gx-2 rounded button-color" style="width: 18rem;">
          <img width="img-fluid"  src="${data.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${data.phone_name}</h5>
            <p class="card-text">${data.brand}</p>
            <a onclick='singlePhoneDetail("${data.slug}")' href="#" class="btn btn-primary">Details</a> 
          </div>
        </div>
        
        `
        displayMobile.appendChild(div)
    });


    //spinner display
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
    const singleMobile = document.getElementById('single-Mobile')
    singleMobile.innerHTML = ''
    const div = document.createElement('div')
    div.innerHTML = ` 
        <div class="card" style="width: 18rem;">
  <img src="${data.image}" class="card-img-top" alt="...">
  <div class="card-body">

   
    <p class="card-title"><span class="
    fw-bold">Brand:</span>${data.name}</p>

    <p class="card-title"><span class="
    fw-bold">Brand:</span>${data.brand}</p>
    <p class="card-text"><span class="fw-bold">Relase Date: </span>${data?.releaseDate}</p>
    <p class=" card-text"><span class="fw-bold">Cheap set:</span>${data.mainFeatures.chipSet}</p>
    <p class="card-text fw-bold"><span class="fw-bold">Memory:</span>${data.mainFeatures.memory}</p>
    <p class="card-text"><span class="fw-bold">Storage:</span>${data.mainFeatures.storage}</p>
    <p class="card-text"><span class="fw-bold">Display Size:</span>${data.mainFeatures.displaySize}</p>

   
    <p class="card-text"><span class="fw-bold">Censor:</span>${data.mainFeatures.sensors[0]},
    ${data.mainFeatures.sensors[1]},
    ${data.mainFeatures.sensors[2]}, ${data.mainFeatures.sensors[3]}${data.mainFeatures.sensors[4]}</p>
  </div>
</div>
        `
    singleMobile.appendChild(div)
}

