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
    })

}
searchBtn.addEventListener('click',()=>{
    if(input.value!=''){
        fetchProblem()
        input.value=''
    }
    else{
        console.log('Please type')
    }
})
