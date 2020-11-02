//Dom variable
const form = document.querySelector('form');
const billInput = document.querySelector('#input-bill');
const numOfCustomers = document.querySelector('#input-users');
const serviceRatin = document.querySelector('#input-service');
//An array or obj for the options value
const rating = [
    {
        value: 1,
        title: 'Great - 20%'
    },
    {
        value: 2,
        title: 'Good - 10%'
    },
    {
        value: 3,
        title: 'Bad - 2%'
    }
]
//creating the option - options.
rating.forEach(rate => {
    let option = document.createElement('option');
    option.value = rate.value;
    option.textContent = rate.title;
    serviceRatin.appendChild(option);
});

//Feedback functionality function
const errorMessage = (billAmount, tipAmount, eachPay) => {
    const feedBack = document.querySelector('.feedback');
        feedBack.innerHTML = '';
        let isFeedFalse = false;
    if(billAmount === '' || billAmount <= '0') {
        feedBack.innerHTML += `<p>Please Enter a valid value!</p>`;
        feedBack.classList.add('showItem', 'alert-danger');
        isFeedFalse = true;
    }
    if(eachPay === '' || eachPay <= '0') {
        feedBack.innerHTML += `<p>Please Enter a valid value!</p>`;
        feedBack.classList.add('showItem', 'alert-danger');
        isFeedFalse = true;
    }
    if(tipAmount < '1') {
        feedBack.innerHTML += `<p>You need to choose a tip parcent!</p>`;
        feedBack.classList.add('showItem', 'alert-danger')
        isFeedFalse = true;
    }
    setTimeout(() => {
        feedBack.classList.remove('showItem');
    }, 6000);
    return isFeedFalse;
}

//service calculation
const tipPref = {
    '1': 0.2,
    '2': 0.1,
    '3': 0.02
}

const serviceCost = (tips, servicePrice, numOfPayers) => {
    const totalTip = Number(servicePrice) * tipPref[tips]
    const totalBill = Number(servicePrice) + Number(totalTip);
    const numOfPeoplePaid = Number(totalBill) / Number(numOfPayers);
    return [totalTip, totalBill, numOfPeoplePaid];
}

//Submit event listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
const loader = document.querySelector('.loader');
const resultDiv = document.querySelector('.results');
const tipPaid = document.querySelector('#tip-amount');
const totalAmount = document.querySelector('#total-amount');
const indivPay = document.querySelector('#person-amount');

const billAmount = billInput.value;
const eachPay = numOfCustomers.value;
const tipAmount = serviceRatin.value;
const feedback = errorMessage(billAmount, tipAmount, eachPay);
const results = serviceCost(tipAmount, billAmount, eachPay);
//Service calculation is done only if the input are properly filled
if(!feedback){
    loader.classList.add('showItem');
setTimeout(() => {
    loader.classList.remove('showItem');
    resultDiv.classList.add('showItem');
    tipPaid.textContent = results[0].toFixed(2);
    totalAmount.textContent = results[1].toFixed(2);
    indivPay.textContent = results[2].toFixed(2); 
}, 3000);
        
setTimeout(() => {
    resultDiv.classList.remove('showItem');
    billInput.value = '';
    numOfCustomers.value = '';
    serviceRatin.value = '';
}, 10000);        
}        
});