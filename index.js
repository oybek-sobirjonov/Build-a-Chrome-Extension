let myLeads = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ul-el");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#tab-btn");


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads); // bu yerda funksiyaga aniq myLeads array yuborilayotgani
    // uchun render funksiya uni global variables orasidan qidirishga vaqt sarf qilmaydi.
}

tabBtn.addEventListener("click", function() {
    // Grab the url of the current chrome tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //since the only one tab should be active and in the current window at once
        //the return variable should only have one enrty
        // let activeTab = tabs[0];
        // let activeTabId = activeTab.id  // or do whatewer you need
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
    
});

// biz argument qilib bergan har qanday arrayni render qiluvchi reusable funksiya!
// quyida qavs ichidasi leads so'zi har qanday so'z bilan almashtirilishi mumkin!!!
function render(leads) { // qavs ichidagi leads ma'nosi bu funksiya scope (local scope) 
// ichida 1 ta variable yaratish. masalan: let leads = myLeads(bu tepadagi funksiyada
// render funksiyasiga qo'yilgan argument). leads variable render funksiyani local scopida
// bo'lgani uchun uni global scopedagi variabledan ancha tez vaqtda topib oladi.
    let listItems = "";
    for(let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href ='${leads[i]}' target = '_blank'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});