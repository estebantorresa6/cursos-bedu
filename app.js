const form = document.querySelectorAll(".signup-form")

// console.log($form);

const getTemplate = () => {
  return fetch("./template.htm").then((response) => response.text())
}

const sendEmailToApi = (address, template) => {
  fetch(`https://bedu-email-sender-api.herokuapp.com/send?id`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      template: template,
    }),
  })
    .then((results) => {
      console.log(results.status);
      if(results.status == 200){
        alert("E-mail send!!!")
      } else {
        alert("Send failed")
      }
      document.getElementById("email").value = ""
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("email").value = ""
      alert("Send failed")
    });
};

const sendEmail = (e) =>{
  e.preventDefault();
  const email = e.target.querySelector("input").value;
  // console.log(email);
  getTemplate()
  .then((template) => {
    console.log(template);
    sendEmailToApi(email, template)
  })
  .catch((error)=> {
    console.log(error, "No se encuentra el template");
  })
}

for(let i = 0; i < form.length; i++){
  console.log(form[0]);
  form[i].addEventListener("submit",sendEmail)
}