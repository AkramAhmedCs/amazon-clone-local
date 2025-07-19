function getRequest(){
  const xhr  = new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
    console.log(xhr.response)
  });
  xhr.open('GET','https://supersimplebackend.dev/greeting')
  xhr.send()
}
getRequest();


async function getFetch(){
  const respone  = await fetch('https://supersimplebackend.dev/greeting');
  console.log(respone)
}
getFetch()


async function sendPost() {
  const respone = await fetch('https://supersimplebackend.dev/greeting',{
    method:'POST',
    headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name:'Akram'
        })

  })
//this returns a promise so we have to await it first
const reply = await respone.text()
console.log(reply)
}
sendPost()
async function sendPostError() {
  try{
     const respone = await fetch('https://supersimplebackend.dev/greeting',{
    method:'POST',
    headers: {
          'Content-Type': 'application/json'
        }
  })
  if (respone.status>=400){
    throw respone;
    
  }
//this returns a promise so we have to await it first
const reply = await respone.text()
console.log(reply)
  }
  catch(error) {
  if (error.status === 400) {
    const err = await error.json();
    console.log(err);
  } else {
    console.log('Network error, please try again later');
  }
}

  
 
}
sendPostError()