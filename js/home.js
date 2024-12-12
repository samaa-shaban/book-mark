var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var dataWrapper = document.getElementById("tBody");
var indexToUpdate;
var indexToDelete;
var allBookMarks = [];

if(localStorage.allBookMarks!=null){
  allBookMarks=JSON.parse(localStorage.allBookMarks) 
  displayData();
}

function reset()
{
  siteNameInput.value="";
  siteUrlInput.value="";
}

function addBookMark() {

    var newBookMark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value

    }
  allBookMarks.push(newBookMark);
  localStorage.setItem('allBookMarks',JSON.stringify(allBookMarks));
  displayData(allBookMarks);
   

  
}

function displayData(arr=allBookMarks) {
  var container = "";
  for (var i = 0; i < arr.length; i++) {
    container += `
    <br>
     <tr class="p-4 bg-light">
        <td>${i+1}</td>
        <td>${arr[i].siteName}</td>
        <td><a href="${arr[i].siteUrl}" target="_blank"><button class="btn btn-success bg-primary">visit</button></a></td>
        <td><button class="btn btn-success" onclick="preUpate(${i})">update</button></td>
        <td><button class="btn btn-danger" onclick="deleteBookMark(${i})" >Delete</button></td>
     </tr>
    `;
  }

  dataWrapper.innerHTML = container;
}
function displayUpdateBtn()
{
  document.getElementById("SubmitBtn").classList.replace('d-block','d-none');
  document.getElementById("UpdateBtn").classList.replace('d-none','d-block');
}
function displaySubmitBtn()
{
  document.getElementById("SubmitBtn").classList.replace('d-none','d-block');
  document.getElementById("UpdateBtn").classList.replace('d-block','d-none');
}

function preUpate(index)
{ 
  indexToUpdate=index;
  siteNameInput.value=allBookMarks[index].siteName;
  siteUrlInput.value=allBookMarks[index].siteUrl;
  displayUpdateBtn();
}
function finalUpdate()
{
  var UpdatedBookMark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value,
  };
 
  allBookMarks.splice(indexToUpdate,1,UpdatedBookMark);
  localStorage.setItem('allBookMarks',JSON.stringify(allBookMarks));
  displayData(allBookMarks);
  displaySubmitBtn();
}
function deleteBookMark(index)
{
  indexToDelete=index;
  allBookMarks.splice(indexToDelete,1);
  localStorage.setItem('allBookMarks',JSON.stringify(allBookMarks));
  displayData(allBookMarks);
}

function validateUrl(url)
{siteUrlInput.value=url;
  var pattern= /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]{1,256}\.[a-zA-Z]{2,6})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  pattern.test(siteUrlInput.value);
  console.log(pattern.test(siteUrlInput.value));
  return pattern.test(siteUrlInput.value);
}