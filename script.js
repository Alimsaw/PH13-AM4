let interviewList = [];
let rejectedList = [];
let currentStatus = 'all'


let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');
const filterCards = document.getElementById('filtered-cards');

function calculateCount(){
    total.innerText = allCardSection.children.length
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
    // totalJob.innerText = allCardSection.children.length

        if(currentStatus === 'interview-filter-btn'){
        totalJob.innerText = interviewList.length
    }
    else if(currentStatus === 'rejected-filter-btn'){
        totalJob.innerText = rejectedList.length
    }
    else{
        totalJob.innerText = allCardSection.children.length
    }
}

calculateCount()

// Buttons Select with Color
function toggleStyle(id) {

    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');

    allFilterBtn.classList.add('bg-white', 'text-black');
    interviewFilterBtn.classList.add('bg-white', 'text-black');
    rejectedFilterBtn.classList.add('bg-white', 'text-black');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-[#3B82F6]', 'text-white');

    currentStatus = id;

    if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterCards.classList.remove('hidden');
        renderInterview();

    } else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterCards.classList.remove('hidden');
        renderRejected();

    } else {
        allCardSection.classList.remove('hidden');
        filterCards.innerHTML = '';
        filterSection.classList.add('hidden');
    }

    calculateCount();
}

// clicks and events
mainContainer.addEventListener('click', function(event){
        console.log(currentStatus, event.target.classList)
    if(event.target.classList.contains('interview-btn')){
    
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector('.companyName').innerText
    const jobName = parentNode.querySelector('.jobName').innerText
    const jobDescription = parentNode.querySelector('.jobDescription').innerText
    const statusBtn = parentNode.querySelector('.statusBtn').innerText
    const notes = parentNode.querySelector('.notes').innerText

    parentNode.querySelector('.statusBtn').innerText = 'interview'

    const cardInfo = {
        companyName,
        jobName,
        jobDescription,
        statusBtn:'interview',
        notes
    }

    const jobExist = interviewList.find(item=> item.companyName == cardInfo.companyName)

    if (!jobExist) {
        interviewList.push(cardInfo)
    }

    rejectedList = rejectedList.filter(item => item.jobName != cardInfo.jobName)
    console.log(currentStatus)
if(currentStatus == "interview-filter-btn"){
        renderInterview();
    }else if (currentStatus == "rejected-filter-btn"){
        renderRejected();
    }

    calculateCount()

}else if(event.target.classList.contains('rejected-btn')){
    
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector('.companyName').innerText
    const jobName = parentNode.querySelector('.jobName').innerText
    const jobDescription = parentNode.querySelector('.jobDescription').innerText
    const statusBtn = parentNode.querySelector('.statusBtn').innerText
    const notes = parentNode.querySelector('.notes').innerText

    parentNode.querySelector('.statusBtn').innerText = 'Rejected'

    const cardInfo = {
        companyName,
        jobName,
        jobDescription,
        statusBtn:'Rejected',
        notes
    }
    const jobExist = rejectedList.find(item=> item.companyName == cardInfo.companyName)

    if (!jobExist) {
        rejectedList.push(cardInfo)
    }

    interviewList = interviewList.filter(item=> item.jobName != cardInfo.jobName)

    if(currentStatus == "interview-filter-btn"){
        renderInterview();
    }else if (currentStatus == "rejected-filter-btn"){
        renderRejected();
    }

    calculateCount()



    }
    
    // Delete button 
    else if (
    event.target.classList.contains('eraseBtn') ||
    event.target.parentNode.classList.contains('eraseBtn')
) {

    const eraseBtn = event.target.classList.contains('eraseBtn')
        ? event.target
        : event.target.parentNode;

    const card = eraseBtn.parentNode.parentNode;

    const companyName = card.querySelector('.companyName').innerText
    const jobName = card.querySelector('.jobName').innerText

    interviewList = interviewList.filter(item => item.companyName != companyName && item.jobName != jobName)
    rejectedList = rejectedList.filter(item => item.companyName != companyName && item.jobName != jobName)

    card.remove();

    calculateCount();

    if (currentStatus == 'interview-filter-btn') {
        renderInterview();
    }else if (currentStatus == 'rejected-filter-btn') {
        renderRejected();
    }
}

    console.log({interviewList, rejectedList})

    
    

})


function renderInterview() {
    filterCards.innerHTML = '';

    if (interviewList.length === 0) {
        filterSection.classList.remove('hidden');  
        return;
    }

    filterSection.classList.add('hidden');
    for (let interview of interviewList) {
        let div = document.createElement('div');
        div.className = 'flex justify-between border text-[#F1F2F4] bg-white p-[24px] rounded-[8px]'
        div.innerHTML = `
                    <div class="space-y-[20px]">
                    <div>
                        <p class="companyName font-semibold text-[18px] text-[#002C5C]">${interview.companyName}</p>
                        <p class="jobName font-normal text-[16px] text-[#64748B]">${interview.jobName}</p>
                    </div>
                     <div>
                         <p class="jobDescription font-normal text-[14px] text-[#64748B]">${interview.jobDescription}</p>
                     </div>
                     <div class="flex flex-col gap-2">
                        <p class="statusBtn font-medium text-[14px] text-[#002C5C] rounded-1 bg-[#EEF4FF] py-[8px] px-[12px] rounded-[4px] w-fit uppercase">${interview.statusBtn}</p>
                        <p class="notes font-normal text-[14px] text-[#323B49]">${interview.notes}</p>
                      </div>
                     <div class="flex gap-2">
                        <button class="interview-btn btn text-green-600 bg-white border-green-600 uppercase font-semibold text-[14px]">interview</button>
                        <button class="rejected-btn btn text-[#EF4444] bg-white border-[#EF4444] uppercase font-semibold text-[14px]">Rejected</button>
                    </div>
                </div>
                <div>
                    <div class="eraseBtn w-[35px] border rounded-[40px] p-[6px] text-[#F1F2F4]">
                        <img src="./images/Trash.png" alt="">
                    </div>
                </div>
        `
    filterCards.appendChild(div)
    }

}

function renderRejected() {
      filterCards.innerHTML = '';

    if (rejectedList.length === 0) {
        filterSection.classList.remove('hidden');
        return;
    }

    filterSection.classList.add('hidden');
    for (let rejected of rejectedList) {
        let div = document.createElement('div');
        div.className = 'flex justify-between border text-[#F1F2F4] bg-white p-[24px] rounded-[8px]'
        div.innerHTML = `
                    <div class="space-y-[20px]">
                    <div>
                        <p class="companyName font-semibold text-[18px] text-[#002C5C]">${rejected.companyName}</p>
                        <p class="jobName font-normal text-[16px] text-[#64748B]">${rejected.jobName}</p>
                    </div>
                     <div>
                         <p class="jobDescription font-normal text-[14px] text-[#64748B]">${rejected.jobDescription}</p>
                     </div>
                     <div class="flex flex-col gap-2">
                        <p class="statusBtn font-medium text-[14px] text-[#002C5C] rounded-1 bg-[#EEF4FF] py-[8px] px-[12px] rounded-[4px] w-fit uppercase">${rejected.statusBtn}</p>
                        <p class="notes font-normal text-[14px] text-[#323B49]">${rejected.notes}</p>
                      </div>
                     <div class="flex gap-2">
                        <button class="interview-btn btn text-green-600 bg-white border-green-600 uppercase font-semibold text-[14px]">interview</button>
                        <button class="rejected-btn btn text-[#EF4444] bg-white border-[#EF4444] uppercase font-semibold text-[14px]">Rejected</button>
                    </div>
                </div>
                <div>
                    <div class="eraseBtn w-[35px] border rounded-[40px] p-[6px] text-[#F1F2F4]">
                        <img src="./images/Trash.png" alt="">
                    </div>
                </div>
        `
    filterCards.appendChild(div)
    }

}
