const xhr = new XMLHttpRequest()
xhr.addEventListener('load',()=>{
  console.log(xhr.response)
});
xhr.open('GET','https://supersimplebackend.dev/images/apple.jpg')
xhr.send();


//status code with 4 or 5 === failed
// 4 is our prob , 5 is backend prob
//2 is succesful
