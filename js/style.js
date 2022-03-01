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

    //spinner 
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
    //single mobile data clear when search
    const singleMobile = document.getElementById('single-Mobile')
    singleMobile.innerHTML = ''
    const mobileData = allData.data
    const displayMobile = document.getElementById('display-mobile')
    const sliceData = mobileData.slice(0, 20)
    displayMobile.textContent = ''

    //error massage 
    if (allData.status == false) {
        errorMassage('block')
    } else {
        errorMassage('none')
    }

    //show 20 images
    sliceData.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('col-lg-4')
        div.classList.add('col-md-4')
        div.classList.add('col-12')

        div.innerHTML = `
            <div class=" card mb-3 shadow p-3 gx-2 rounded button-color">
          <img width="img-fluid"  src="${data.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${data.phone_name}</h5>
            <p class="card-text">${data.brand}</p>
            <a onclick='singlePhoneDetail("${data.slug}")' href="#" class="btn btn-primary">Details</a> 
          </div>
        </div>  `
        displayMobile.appendChild(div)
    });
    //spinner display
    toggleSpinner('none')
    toggoleSearch('block')
}
//fetch single mobile details 
const singlePhoneDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    const res = await fetch(url)
    const data = await res.json()
    displaySinglephone(data)
}

//display single mobile details 
const displaySinglephone = data => {
    const mobileData = data.data
    const singleMobile = document.getElementById('single-Mobile')
    singleMobile.innerHTML = ''
    const div = document.createElement('div')
    div.innerHTML = ` 
        <div class="card shadow p-3">
  <img src="${mobileData.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-title"><span class="
    fw-bold">Phone Name:</span>${mobileData.name}</p>
    <p class="card-title"><span class="
    fw-bold">Brand:</span>${mobileData.brand}</p>
    <p class="card-text"><span class="fw-bold">Relase Date: </span>${mobileData.releaseDate ? mobileData.releaseDate : `Result not found`}</p>
    <p class=" card-text"><span class="fw-bold">Cheap set:</span>${mobileData.mainFeatures.chipSet ? mobileData.mainFeatures.chipSet : `Result not found`}</p>
    <p class="card-text fw-bold"><span class="fw-bold">Memory:</span>${mobileData.mainFeatures.memory ? mobileData.mainFeatures.memory : `Result not found`}</p>
    <p class="card-text"><span class="fw-bold">Storage:</span>${mobileData.mainFeatures.storage}</p>
    <p class="card-text"><span class="fw-bold">Display Size:</span>${mobileData.mainFeatures.displaySize ? mobileData.mainFeatures.displaySize : `Result not found`}</p>

    <p class="card-text"><span class="fw-bold">Censor:</span>${mobileData.mainFeatures.sensors[0] ? mobileData.mainFeatures.sensors[0] : `Result not found`},
    ${mobileData.mainFeatures.sensors[1] ? mobileData.mainFeatures.sensors[1] : `Result Not found`},
    ${mobileData.mainFeatures.sensors[2] ? mobileData.mainFeatures.sensors[2] : `Result not found`}, ${mobileData.mainFeatures.sensors[3] ? mobileData.mainFeatures.sensors[3] : `Result not found`}${mobileData.mainFeatures.sensors[4] ? mobileData.mainFeatures.sensors[4] : `Result not found`}</p>

    <h4 class="fw-bold">Others information</h4> 
    <p class="card-text"><span class="fw-bold">WLAN:</span>${mobileData.others?.WLAN ? mobileData.others.WLAN : `Result not found`}</p>
    <p class="card-text"><span class="fw-bold">Bluetooth:</span>${mobileData.others?.Bluetooth ? mobileData.others.Bluetooth : `Result not found`}</p>
    <p class="card-text"><span class="fw-bold">GPS:</span>${mobileData.others?.GPS ? mobileData.others.GPS : `Result not found`}</p>
    <p class="card-text"><span class="fw-bold">NFC:</span>${mobileData.others?.NFC ? mobileData.others.NFC : `Result not found`}</p>
    
    <p class="card-text"><span class="fw-bold">Radio:</span>${mobileData.others?.Radio ? mobileData.others.Radio : `Result not found`}</p>
    <p class="card-text"><span class="fw-bold">USB:</span>${mobileData.USB?.Bluetooth ? mobileData.USB.Bluetooth : `Result not found`}</p>

  </div>
</div>
        `
    singleMobile.appendChild(div)

}

