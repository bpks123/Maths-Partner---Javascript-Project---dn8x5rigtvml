const searchBtn = document.querySelector(".search-btn")
const input = document.querySelector(".input")
const operation = document.querySelector("#operation")
const savedBtn = document.querySelector(".save-btn")
const currentSolution = document.querySelector(".current-solutions")
const savedSolution = document.querySelector(".solution-tab")
const btn = document.querySelector(".close")
const body = document.querySelector(".body")
const loader = document.querySelector(".loadercontainerdiv")
const logoutbtn = document.querySelector(".logbtn")
const loadingGif=document.getElementsByClassName("loadinggif")[0]
let savedsolution = document.querySelectorAll(".solution-div") 
let deletebtn = document.querySelectorAll(".fa-trash-can")
let viewmore = document.querySelector(".viewmore")
let closebtn = document.querySelector(".close-sample")

let expression
let solutions = []
let isLoading = true
let isUserLogin = {loginstatus :false, userName: ""}

if(localStorage.getItem("isLogin")){
    isUserLogin = JSON.parse(localStorage.getItem("isLogin"))
}
// Took solution in starting when user is not logout
if(localStorage.getItem("solution")){
    solutions = JSON.parse((localStorage.getItem("solution")))
}

function fetchProblem(){
    if(isLoading){
        currentSolution.innerHTML = `<div class="solution-div loading">
                                        <img class="ansloader" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-loading-10.png&r=105&g=105&b=105" alt="loading">                         
                                        <h4 class="loader-text">Please be patient while I'm calculating..</h4>
                                    </div>`
    }
    expression=encodeURIComponent(input.value)
    let operator = operation.value
    console.log(operator)
    fetch(`https://newton.vercel.app/api/v2/${operator}/${expression}`).then((response)=>{
        return response.json()
    }).then((result)=>{
        console.log(result)
        isLoading=false
        solutions.push(result)
        console.log(solutions)
        if(!isLoading){
            currentSolution.innerHTML = `<div class="solution-div">
                                    <h2>${result.operation} : ${result.expression}</h2>
                                    <div id="solution"><h3 class="anstitle">Solution: </h3> ${result.result}</div>
                                </div>`
        }
        localStorage.setItem("solution", JSON.stringify(solutions))
        isLoading = true
    }).catch((err)=>console.log(err))

}
searchBtn.addEventListener('click',()=>{
    if(input.value!=''){
        fetchProblem()
        input.value=''
    }
    else{
        currentSolution.innerHTML =`<div class="solution-div hidebg">
                                        <div class="model-error">
                                        <p>Please Enter a Valid Problem.</p>
                                        <p>"Click the button to view guidlines."</p>
                                        <button class="viewmore">Read more !</button>
                                        </div>
                                        
                                        </div>`
        viewmore = document.querySelector(".viewmore")
        listenviewmore()
    }
})
function closeviewmore(){
    closebtn.addEventListener("click", ()=>{
        currentSolution.innerHTML = ""
    })
}
function listenviewmore(){
    viewmore.addEventListener("click", ()=>{
        handleViewMore()
    })
}
function handleViewMore(){
    currentSolution.innerHTML=`<div class="solution-div description">
                                    <div class="close-div-sample">
                                        <button class="close-sample"> X </button>
                                    </div>
                                    <h2>Math Partner A Simplified Workspace For All your Problems...</h2>
                                    <h4>Home Page 👇 Get Start from here</h4>
                                    <img src="https://github.com/JishnuJsm/Maths-Partner---Javascript-Project---s218np8lws6e/assets/85431819/f12fdfff-dcb5-4011-9718-4070e4673eb7" alt="No image">
                                    <img src="https://github.com/JishnuJsm/Maths-Partner---Javascript-Project---s218np8lws6e/assets/85431819/121c5089-9a14-4604-a8dc-67ac7ecdec64" alt="No image">
                                    <h4>Results page Looks As<h4>
                                    <img src="https://github.com/JishnuJsm/Maths-Partner---Javascript-Project---s218np8lws6e/assets/85431819/3950b96c-db28-47af-b009-a499bd1bfe7c" alt="No image">
                                    <h4>Also You can get previous Search results by Clicking (Saved Solution) and Delete if it was Nolonger Needed😎</h4>
                                    <img src="https://github.com/JishnuJsm/Maths-Partner---Javascript-Project---s218np8lws6e/assets/85431819/bd57a4b1-8520-4264-97e5-cabcf33c37c5" alt="No image">
                                </div>`
    closebtn = document.querySelector(".close-sample")
    closeviewmore()
}

function renderUi(){
    if(solutions.length>0){
        solutions.forEach((e)=>{
            let div = document.createElement("div")
            div.classList.add("solution-div")
        
            div.innerHTML = `<h2>${e.operation} : ${e.expression}</h2>
                              <div id="solution"><h3 class="anstitle">Solution: </h3> ${e.result}</div>
                              <i class="fa-regular fa-trash-can fa-2xl"></i>`
        
            savedSolution.appendChild(div)
        })
        deleteOperation()
    }   
    else{
        let div = document.createElement("div")
        
        div.innerHTML = `<h2 class="result">No Results Found</h2>`
        
        savedSolution.appendChild(div)
    }
}
savedBtn.addEventListener('click',()=>{
    savedSolution.innerHTML=''
    document.querySelector(".saved-solution").style.display = "block"
    loadingGif.classList.remove('hidden')
    let timer = setTimeout(()=>{
        loadingGif.classList.add('hidden')
        renderUi()
        clearTimeout(timer)
    },1500)
})
btn.addEventListener("click",()=>{
    document.querySelector(".saved-solution").style.display = "none"
})
function deleteOperation(){
    savedsolution = document.querySelectorAll(".solution-div") 
    deletebtn = document.querySelectorAll(".fa-trash-can")
    if(deletebtn.length){
        for(let i=0; i<deletebtn.length; i++){
            deletebtn[i].addEventListener("click",()=>{
                solutions.splice(i, 1)
                if(solutions.length>0){
                    localStorage.setItem("solution", JSON.stringify(solutions))
                }
                else{
                    localStorage.removeItem("solution")
                    document.querySelector(".saved-solution").style.display = "none"
                }
                savedSolution.innerHTML = ""
                renderUi()
            })
        }
    }
}
//Form

const title = document.querySelector(".form-title")
const namediv = document.querySelector(".name")
const names = document.querySelector("#name")
const email = document.querySelector("#email")
const pass = document.querySelector("#password")
const login = document.querySelector("#login")
const register = document.querySelector("#register")
const submit = document.querySelector("#submit")
const olduser = document.querySelector(".olduser")
const newuser = document.querySelector(".newuser")
const formdiv = document.querySelector(".form-div")
const form = document.querySelector(".form")
const weldiv = document.querySelector(".welcome-div")

if(isUserLogin.loginstatus){
    formdiv.classList.add("hidden")
}

// Form 
register.addEventListener("click", (e)=>{
    e.preventDefault()
    title.innerHTML="SignUp"
    namediv.classList.remove("hidden")
    submit.value = "Register"
    olduser.classList.remove("hidden")
    newuser.classList.add("hidden")
    names.value = ""
    email.value =""
    pass.value =""
})
login.addEventListener("click", (e)=>{
    e.preventDefault()
    title.innerHTML="Login"
    namediv.classList.add("hidden")
    submit.value = "Login"
    olduser.classList.add("hidden")
    newuser.classList.remove("hidden")
    names.value = "User"
    email.value =""
    pass.value =""
})

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    formdiv.style.backgroundColor = "transparent"
    formdiv.classList.add("hidden")
    isUserLogin.loginstatus=true
    isUserLogin.userName=names.value
    localStorage.setItem("isLogin", JSON.stringify(isUserLogin))
    names.value = ""
    email.value =""
    pass.value =""
    // weldiv.style.display='flex'
    // console.log('welcome')
    console.log(isUserLogin.userName)
    if(isUserLogin.loginstatus){
        weldiv.innerHTML=`
        <h2>Welcome ${isUserLogin.userName}!</h2>
        `
    }
    else{
        weldiv.innerHTML=`
        <h2>Welcome Guest!</h2>
        `
    }
    
    
})
logoutbtn.addEventListener("click", ()=>{
    isUserLogin.loginstatus=false
    isUserLogin.userName=''
    localStorage.setItem("isLogin", JSON.stringify(isUserLogin))
    formdiv.classList.remove("hidden")
    olduser.classList.remove("hidden")
    newuser.classList.remove("hidden")
    title.innerHTML="Sign / SignUp"
    localStorage.setItem('solution',[])
    weldiv.innerHTML=''
})