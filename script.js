const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const btn=document.querySelector(".container button");
const msg=document.querySelector(".msg");

for (let select of dropdowns){
    for(let currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}


const update_exchange_rate=async()=>{
    let amount =document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==""||amtval<1){
        amtval=1;
        amount.value="1";
    }
  
    const url=`${base_url}/${fromcurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let from=fromcurr.value.toLowerCase();
    let to =tocurr.value.toLowerCase();
    let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalamount=amtval*rate;
    console.log(finalamount);
    msg.innerText=`${amtval} ${fromcurr.value.toUpperCase()} = ${finalamount} ${tocurr.value.toUpperCase()}`;
};



update_exchange_rate();


const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc= `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    update_exchange_rate();
});


window.addEventListener("load",(evt)=>{
    update_exchange_rate();
});

