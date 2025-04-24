"user strict";

// auto typing
var typed = new Typed("#invisible", {
  strings: ["front-end developer", "react developer", "python developer"],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true,
});

const menuIcon = document.getElementById("menu-icon");

menuIcon.addEventListener("click", function () {
  console.log("Menu Icon Clicked");
  const headerRight = document.querySelector("#header-right");
  headerRight.classList.toggle("active");

  // if user clicked on menu-icon then icon will be hide
  this.style.display = "none";
});

// closeing sidebar example1
 const closeButton = document.querySelector("#close-btn");

closeButton.addEventListener("click", function () {
  console.log("Close Button Clicked");

  const headerRight = document.querySelector("#header-right");
  headerRight.classList.remove("active");

  // Show menu icon again
  menuIcon.style.display = "block";
});


// closing sidebar example2
// function onClose(){
//   const headerRight = document.querySelector("#header-right");
//   headerRight.classList.remove("active");

//   // Show menu icon again
//   menuIcon.style.display = "block";
// }





// resume pdf

function downloadResume() {
  const link = document.createElement("a");
  link.href = "Resume.pdf"; // Replace with your actual file path
  link.download = "My_Resume.pdf"; // File name after download
  // temporarily add link
  document.body.appendChild(link);
  // if click on button automaticall download start
  link.click();
  //if pdf download remove link
  document.body.removeChild(link);
}

// more about me
const aboutMe = document.querySelector("#read-more");
const aboutDetails = document.getElementById("about-details");
let paraAdded = false; // Yeh variable function ke bahar hoga

aboutMe.addEventListener("click", () => {
  // if paragraph is niot added
  if (!paraAdded) {
    // create a paragraph
    const paragraph = document.createElement("p");
    const textContent = document.createTextNode(
      "I enjoy building interactive projects, solving complex challenges, and constantly improving my skills to stay up-to-date with modern web technologies. My goal is to create seamless web experiences that leave an impact!"
    );
    paragraph.style.color = "white";
    paragraph.id = "extra-info";
    // append text into a paragraph
    paragraph.appendChild(textContent);

    // insert before takes two parameter
    // first which element should be added
    // second which place should before added
    aboutDetails.insertBefore(paragraph, aboutMe);
    paraAdded = true;

    const bgColor = window.getComputedStyle(document.body).backgroundColor; // inline +external bacgroundcolor check karega
    if (bgColor === "rgb(0, 0, 0)") { // Black mode
      paragraph.style.color = "white";
    } else { // Light mode
      paragraph.style.color = "black";
    }

  } else {
    // target paragraph tag
    const paragraph = document.getElementById("extra-info");
    if (paragraph) {
      aboutDetails.removeChild(paragraph);
      paraAdded = false;
    }
  }
});

//linear progress bars
const progress = document.querySelectorAll(".progress");
setInterval(() => {
  progress.forEach((ele) => {
    ele.style.width = "0%"; // Pehle width reset karo
    // ele.children[0].innerText = "0%";  // Text bhi reset karo
    setTimeout(() => {
      const per = ele.getAttribute("data-percent");
      ele.style.width = per + "%";
      // ele.children[0].innerText=per+'%';
      let count = 0; // Alag count har progress bar ke liye

      clearInterval(ele.counter);

      ele.counter = setInterval(() => {
        if (count <= per) {
          ele.querySelector("span").innerText = count + "%";
          count++;
        } else {
          clearInterval(ele.counter); // Interval band karna zaroori hai
        }
      }, 20); // 20ms delay for smooth counting
    }, 2000);
  });
}, 4000);

// circular progress bar
const circularProgress = document.querySelectorAll(".progress-circle");

setInterval(() => {
  circularProgress.forEach((element) => {
    const per = element.getAttribute("data-percent");

    let progressCircle = element.querySelector(".circle-progress");
    let percentText = element.querySelector(".percentage"); // Correct selection for each progress-circle

    if (progressCircle && percentText) {
      progressCircle.style.strokeDasharray = 314;

      //  Reset strokeDashoffset
      progressCircle.style.strokeDashoffset = 314;

      //  Animate strokeDashoffset
      setTimeout(() => {
        progressCircle.style.strokeDashoffset = 314 - (314 * per) / 100;
      }, 600);

      // ✅ Reset counter
      let count = 0;

      // Stop any previous counter
      clearInterval(element.counterInterval);

      // Start new counter animation
      element.counterInterval = setInterval(() => {
        if (count <= per) {
          percentText.innerText = count + "%"; // ✅ Correct update for each element
          count++;
        } else {
          clearInterval(element.counterInterval);
        }
      }, 10);
    }
  });
}, 3000);







// Select project container
const projectContainer = document.querySelector(".project-container");

const fetchData = async () => {
  try {
    const response = await fetch("projects.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data:", error.message);
  }
};

const projectData=async()=>{
const data=await fetchData();
if (!data) {
  return;
}
// console.log(data);
projectContainer.innerHTML='';
data.forEach(proj=>{
  const projectCard=document.createElement('div');
  projectCard.classList.add('project-card');
let liveButton='';
let repoButton='';
  if (!proj.comingSoon) {
    // liveButton = `<button class="project-button"><a href="${proj.liveLink}" target="_blank">Live Demo</a></button>`;
    // repoButton = `<button class="project-button"><a href="${proj.repoLink}" target="_blank">GitHub</a></button>`;

    liveButton = `<button class="project-button" onclick="window.open('${proj.liveLink}', '_blank')">Live Demo</button>`;
      repoButton = `<button class="project-button" onclick="window.open('${proj.repoLink}', '_blank')">GitHub</button>`;

    

  }

   projectCard.innerHTML=`
   <div id="project-head">
    <img src=${proj.image} alt="${proj.name}"/>
  <h2>${proj.name}</h2>
   <h5>${proj.description}</h5>
   </div>
 <div id="project-buttons">
${liveButton}
${repoButton}
 </div>
   `;
 
projectContainer.appendChild(projectCard);
});
}


// document.addEventListener("DOMContentLoaded", projectData);
projectData();



// contact form sending data

// event.preventDefault() ek JavaScript method hai jo kisi default behavior ko rokne ke liye use hota hai.

// Example:
// Jab ek <form> submit hoti hai, to by default page refresh ho jata hai, lekin agar tum event.preventDefault(); use karte ho to page refresh nahi hoga aur tum form ka data JavaScript se process kar sakte ho.
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();
  let isValid = true;
  
  let name = document.getElementById("contact-name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  
  let nameError = document.getElementById("name-error");
  let emailError = document.getElementById("email-error");
  let messageError = document.getElementById("message-error");

  // ✅ Pehle sab errors hatao (taaki naye errors properly dikhein)
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  // ✅ Multiple spaces ko ek space me convert karo
  name = name.replace(/\s+/g, " ");
  email = email.replace(/\s+/g, " ");
  message = message.replace(/\s+/g, " ");
  
  let namePattern = /^[A-Za-z ]{3,}$/;
  if (name === "" || !namePattern.test(name)) {
      nameError.textContent = "Name must be at least 3 characters long and contain only letters and spaces.";
      isValid = false;
  }
  
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email === "" || !emailPattern.test(email)) {
      emailError.textContent = "Enter a valid email (e.g., example@domain.com).";
      isValid = false;
  }
  
  if (message === "" || message.length < 10) {
      messageError.textContent = "Message must be at least 10 characters long.";
      isValid = false;
  }
  
  if (isValid) {
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Message:", message);
      alert("Form submitted successfully!");
      document.getElementById("contact-form").reset();
  }
});


// 1️⃣ Breakdown of /^[A-Za-z ]{3,}$/
// Part	Meaning
// ^	Start of the string (ye ensure karega ki check shuru se ho)
// [A-Za-z ]	Allowed characters: A-Z (uppercase), a-z (lowercase), aur space (' ' allowed hai)
// {3,}	Kam se kam 3 characters hone chahiye, aur usse zyada ho sakte hain
// $	End of the string (ensure karega ki poora string match ho)



// 1️⃣ Breakdown of /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// Part	Meaning
// ^	Start of the string
// [a-zA-Z0-9._%+-]+	Username part: Letters (A-Z, a-z), numbers (0-9), aur special characters (._%+-) allowed hain
// @	"@" symbol must be present (Email ka required part)
// [a-zA-Z0-9.-]+	Domain name part: Letters, numbers, dots (.) aur hyphens (-) allowed
// \.	Dot (.) required before domain extension (e.g., .com, .net, .org)
// [a-zA-Z]{2,}	Domain extension: Sirf letters (A-Z, a-z) hone chahiye, aur kam se kam 2 characters hone chahiye (e.g., com, in, net)
// $	End of the string





// 🧐 Breakdown of name.replace(/\s+/g, " ")
// 1️⃣ \s+ → Space ka pattern
// \s → Whitespace match karega (space, tab, newline)
// + → Ek ya usse zyada baar ho toh match karega (1 ya more spaces)
// 2️⃣ g → Global flag
// Poori string me jitni baar bhi match milega, sabko replace karega.
// Agar g na lagayen, toh sirf pehla match replace hoga.
// 3️⃣ " " → Replace with single space
// Jitne bhi multiple spaces hain, unko ek single space me replace karega.





// toggle mode 

// header left 
const headerName=document.getElementById('first-name');

// header right
const headerlinks = document.querySelectorAll(".header-links a");

// home 
const homeLeft=document.getElementById('text');
// about
const aboutHead=document.getElementById('about');
const aboutDetail=document.getElementById('about-details');
const readMore=document.getElementById('read-more');

// education content
const content=document.querySelectorAll('.content');
// console.log(content);

// skills 
const technicalskills=document.querySelectorAll('.progress  span');
// console.log(skills);
const progressCircle=document.querySelectorAll('.progress-circle span');

// services
const serviceCards=document.querySelectorAll('.service-card');
// console.log(serviceCards);


// moon
let darkMode=document.querySelector('.bi-moon');
darkMode.addEventListener('click',()=>{
document.body.style.background='white';
document.querySelector('.bi-brightness-high-fill').style.display='inline';
darkMode.style.display='none';
darkMode.style.color='white';

// navbar
const navbar=document.querySelector('.navigation-bar');
navbar.style.background='white';
// navbar.style.boxShadow='none';

// home 
// const home=document.querySelector('.home').style.background='burlywood';



// headerleft
headerName.style.color='black';
// headerright
headerlinks.forEach(link => {
  link.style.color='black';
  });

  // homeleft
  homeLeft.style.color='black';

  // abouthead
  aboutHead.style.color='black';

  // aboutdetails
  aboutDetail.style.color='black';

  // about read more
  readMore.style.backgroundColor = "white"; 
  readMore.style.color = "aqua";
  readMore.style.border='2px solid aqua';
  readMore.addEventListener("mouseover", function() {
    readMore.style.color = "black";
    readMore.style.backgroundColor = "aqua";
    readMore.style.border = "none";
    readMore.style.boxShadow = "2px 2px 10px aqua, -2px -2px 10px aqua";
  });
  
  // Mouse hataane par wapas original color aana chahiye
  readMore.addEventListener("mouseout", function() {
    readMore.style.backgroundColor = "white"; // Light mode ke original color me wapas lao
    readMore.style.color = "aqua";
    readMore.style.boxShadow = "none"; // Box shadow bhi remove karo
    readMore.style.border='2px solid aqua';
  });


  // education content

  content.forEach((item)=>{
    item.style.color='black';
  });

  // skills
  document.querySelector('#skill').style.color='black';
  document.querySelector('.technical-head').style.color='black';
  document.querySelector('.professional-head  h1').style.color='black';
  technicalskills.forEach(element => {
    element.style.color='black';
  });
  progressCircle.forEach((ele)=>{
    ele.style.color='black';
  }
     
);

// services
// services head
const serviceHead=document.querySelector('.service-head').style.color='black';
// service card
serviceCards.forEach((ele)=>{
ele.style.background='white';
ele.querySelector('p').style.color = 'black'; 
});

// projects
 // project head
 const projectHead=document.querySelector('.project-head').style.color='black';

const projectCard=document.querySelectorAll('.project-card');
projectCard.forEach((ele)=>{
        ele.style.backgroundColor='white';
        ele.querySelector('h5').style.color='black';
        ele.querySelector('h2').style.color='black';

                    //project card buttons
         const btn = ele.querySelectorAll('button'); 
          
         btn.forEach((e)=>{
          e.style.background='white';
          e.style.border = '2px solid aqua';
          e.addEventListener("mouseover",()=>{
            e.style.background='aqua';
            e.style.boxShadow='2px 2px 10px aqua, -2px -2px 10px aqua';
            e.style.color='black';
           });
 
           e.addEventListener("mouseout",()=>{
                     e.style.background='white';
                     e.style.boxShadow = 'none';
                     e.style.color='aqua';
           });
         });

});

// contact section
const contactHeading=document.getElementById('contact').style.color='black';
// document.querySelector('#contact-head h1').style.color = 'black';
document.querySelector('#contact-head p').style.color = 'black';

document.querySelectorAll('#contact-form input, #contact-form textarea').forEach((ele)=>{
  // ele.classList.remove('contactinputdark');
  // ele.classList.add('contactinputlight');

  ele.classList.toggle('contactinputdark');
  ele.classList.toggle('contactinputlight');
});


// button
const contactButton=document.querySelector('#contact-form  button');
contactButton.style.color='aqua';
contactButton.addEventListener("mouseout",function(){
  contactButton.style.color='aqua';
});

contactButton.addEventListener("mouseover",function(){
contactButton.style.color='black';
});



// footer
document.querySelector('.footer').style.background='whitesmoke';
const footerLinks=document.querySelectorAll('.footer-links a');
footerLinks.forEach(link => {
  link.classList.remove('footerlight');
  link.classList.add('footerdark');
});


// footer my name
document.querySelector('#copy-right p').style.color='black';

// close button
const closeButton=document.getElementById('close-btn').style.color='black';
// menu icon
const menuIcon=document.getElementById('menu-icon').style.color='black';


// side icons
document.querySelectorAll('#side-icon a').forEach(ele=>ele.style.color='black');

// header-rigth
const headerRight=document.querySelector('#header-right');
headerRight.style.background='white';
headerRight.style.border='none';
});

// light mode
let lightmode=document.querySelector('.bi-brightness-high-fill').style.color='black';
let lightMode=document.querySelector('.bi-brightness-high-fill');
lightMode.addEventListener('click',()=>{
document.body.style.background='black';
document.querySelector('.bi-moon').style.display='inline';
lightMode.style.display='none';
lightMode.style.color='black';


// navbar
const navbar=document.querySelector('.navigation-bar');
navbar.style.backgroundColor='black';
// navbar.style.boxShadow='0px 0px 5px #333';

// home 
// const home=document.querySelector('.home').style.backgroundColor='black';

// headerleft
headerName.style.color='white';
// headerright
headerlinks.forEach(link => {
link.style.color='white';
});

  // homeleft
  homeLeft.style.color='white';

    // abouthead
    aboutHead.style.color='white';

      // aboutdetails
  aboutDetail.style.color='white';

    // about read more
 // about read more
 readMore.style.backgroundColor = "black"; 
 readMore.style.color = "aqua";
 readMore.style.border='2px solid aqua';
 readMore.addEventListener("mouseover", function() {
  readMore.style.color = "white";
  readMore.style.backgroundColor = "aqua";
  readMore.style.border = "none";
  readMore.style.boxShadow = "2px 2px 10px aqua, -2px -2px 10px aqua";
});

// Mouse hataane par wapas original color aana chahiye
readMore.addEventListener("mouseout", function() {
  readMore.style.backgroundColor = "black"; // Light mode ke original color me wapas lao
  readMore.style.color = "aqua";
  readMore.style.boxShadow = "none"; // Box shadow bhi remove karo
  readMore.style.border='2px solid aqua';
});


  // education content

  content.forEach((item)=>{
    item.style.color='white';
});

  // skills
  document.querySelector('#skill').style.color='white';
  document.querySelector('.technical-head').style.color='white';
  document.querySelector('.professional-head  h1').style.color='white';
 technicalskills.forEach(element => {
  element.style.color='white';
  });
   
  progressCircle.forEach((ele)=>{
    ele.style.color='white';
  });

  // services
// services head
const serviceHead=document.querySelector('.service-head').style.color='white';
// service card
serviceCards.forEach((ele)=>{
  ele.style.background='black';
  ele.querySelector('p').style.color = 'white'; 
  });


  // projects
  // project head
   const projectHead=document.querySelector('.project-head').style.color='white';

  const projectCard=document.querySelectorAll('.project-card');
  projectCard.forEach((ele)=>{
          ele.style.backgroundColor='black';
          ele.querySelector('h5').style.color='white';
          ele.querySelector('h2').style.color='white';
          //project card buttons
         const btn = ele.querySelectorAll('button'); 
          
         btn.forEach((e)=>{
          e.style.background='black';
          e.style.border = '2px solid aqua';
          e.addEventListener("mouseover",()=>{
            e.style.background='aqua';
            e.style.boxShadow='2px 2px 10px aqua, -2px -2px 10px aqua';
            e.style.color='white';
           });
 
           e.addEventListener("mouseout",()=>{
                     e.style.background='black';
                     e.style.boxShadow = 'none';
                     e.style.color='aqua';
           });
         });   
  });


  // contact section
const contactHeading=document.getElementById('contact').style.color='white';
// document.querySelector('#contact-head h1').style.color = 'white';
document.querySelector('#contact-head p').style.color = 'white';
// console.log(contact);

document.querySelectorAll('#contact-form input, #contact-form textarea').forEach((ele)=>{
  // ele.classList.remove('contactinputlight');
  // ele.classList.add('contactinputdark');
  ele.classList.toggle('contactinputlight');
  ele.classList.toggle('contactinputdark');

  //ele.style.setProperty("--placeholder-color", "black"); // Placeholder fix
});

// button
const contactButton=document.querySelector('#contact-form  button');
contactButton.style.color='aqua';
contactButton.addEventListener("mouseout",function(){
  contactButton.style.color='aqua';
});

contactButton.addEventListener("mouseover",function(){
contactButton.style.color='white';


});

// footer
document.querySelector('.footer').style.background='rgb(2, 2, 2)';
const footerLinks=document.querySelectorAll('.footer-links a');
footerLinks.forEach(link => {
  link.classList.remove('footerdark');
  link.classList.add('footerlight');
});
// footer my name
document.querySelector('#copy-right p').style.color='white';


// close button
const closeButton=document.getElementById('close-btn').style.color='white';
// menu icon
const menuIcon=document.getElementById('menu-icon').style.color='white';


// side icons
document.querySelectorAll('#side-icon a').forEach(ele=>ele.style.color='white');

// header right
const headerRight=document.querySelector('#header-right');
headerRight.style.background='rgba(0, 0, 0, 0.8)';
headerRight.style.border='none';
});