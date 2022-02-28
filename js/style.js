const getMobileData = async () => {
    const inputField = document.getElementById('input-field').value
    inputField.value = ''
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputField}`
    fetch(url)
    const res = await fetch(url)
    const data = await res.json()
    displayData(data.data)
}
const displayData = data => {
    const displayMobile = document.getElementById('display-mobile')
    data.forEach(data => {
        console.log(data)
    });
}