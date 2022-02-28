const getMobileData = () => {
    const inputField = document.getElementById('input-field').value
    inputField.value = ''
    loadData(inputField)

}
const loadData = async (inputField) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputField}`
    fetch(url)
    const res = await fetch(url)
    const data = await res.json()
    displayData(data.data)
}

const displayData = mobileData => {
    const displayMobile = document.getElementById('display-mobile')
    mobileData.forEach(data => {
        const div = document.createElement('div')
        div.classList.add('col-lg-4')
        div.classList.add('col-12')
        div.innerHTML = `
        
        <div class="card" style="width: 18rem;">
  <img width="img-fluid"  src="${data.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.phone_name}</h5>
    <p class="card-text">${data.brand}</p>
    <a onclick='singlePhoneDetail(${data.id})' href="#" class="btn btn-primary">Details</a>
  </div>
</div>`
        displayMobile.appendChild(div)

    });
}