function mouseover(e){
    e.parentElement.children[1].style.visibility = "visible";
    e.parentElement.children[1].style.animation = "dropdown 0.4s";
};

function mouseout(e){
    e.parentElement.children[1].style.animation = "height 0.4s";
    e.parentElement.children[1].style.visibility = "hidden";
};

function mouseovertwo(e){
    e.style.visibility = "visible";
    e.style.animation = "dropdown 0.4s";
};

function mouseouttwo(e){
    e.style.animation = "height 0.4s";
    e.style.visibility = "hidden";
};

function disappear(e){
    e.parentElement.children[0].style.visibility = "hidden";
};

document.getElementsByTagName("body")[0].addEventListener("click",(e)=>{
    const classname = e.target.classList[0];

    if(classname != "input"){
        document.getElementsByClassName("fa-search")[0].style.visibility = "visible";
        document.getElementsByClassName("results")[0].style.display = "none";
        document.getElementsByClassName("result-search")[0].innerHTML = '<i class="fa fa-search" style="font-size:2.8rem;transform: translateY(-0.1rem);color:#0a2438;"></i>' + " " + "Search ...";
        document.getElementsByClassName("result-search")[0].style.display="block";
    } else {
        document.getElementsByClassName("fa-search")[0].style.visibility = "hidden";
        document.getElementsByClassName("results")[0].style.display = "flex";

        for(var i=0;i<25;i++){
            document.getElementsByTagName("a")[i].style.display= "none";
        }
    };
})

const searchEngine = () => {
    let a = document.getElementsByClassName("input")[0].value.toUpperCase();
    let b = document.getElementsByTagName("a");
    document.getElementsByClassName("result-search")[0].style.display="none";

    for(var i=0; i<25; i++){
        if(b[i].innerText.toUpperCase().indexOf(a) > -1 && a != ""){
            b[i].style.display = "inline-block";
        } else {
            b[i].style.display = "none";
        }
    }
    var j = 0;

    for(var i=0;i<25;i++){
        if(b[i].style.display == "none"){
            j++;

            if(j === 25){
                document.getElementsByClassName("result-search")[0].style.display="block";
                document.getElementsByClassName("result-search")[0].innerText = `No result found for  '${a}' `;
                j = 0;
            }
        }
    }
}

document.getElementsByTagName("button")[0].addEventListener("click", (e)=>{
    e.preventDefault();
})

window.onscroll = function() {myFunction()};

function myFunction (){
    if(document.body.scrollTop > 500 || document.documentElement.scrollTop > 500){
        document.getElementsByClassName("content-box")[0].style.position = "fixed";
        document.getElementsByClassName("content-box")[0].style.top= "0";
        document.getElementsByClassName("content-box")[0].style.width= "100%";
        document.getElementsByClassName("content-box")[0].style.height= "7rem";
        document.getElementsByClassName("content-box")[0].classList.add("zindex");
        document.getElementsByClassName("logo")[0].style.display= "none";
        document.getElementsByClassName("subitems")[0].style.display= "none";
        document.getElementsByClassName("subitems")[1].style.display= "none";
        document.getElementsByClassName("subitems")[2].style.display= "none";
        document.getElementsByClassName("subitems")[3].style.display= "none";
        document.getElementsByClassName("subitems")[4].style.display= "none";
    } else{
        document.getElementsByClassName("content-box")[0].style.position = "relative";
        document.getElementsByClassName("logo")[0].style.display= "flex";
        document.getElementsByClassName("content-box")[0].style.height= "min-content";
        document.getElementsByClassName("content-box")[0].classList.remove("zindex");
        document.getElementsByClassName("content-box")[0].style.width= "90%";
        document.getElementsByClassName("subitems")[1].style.display= "flex";
        document.getElementsByClassName("subitems")[0].style.display= "flex";
        document.getElementsByClassName("subitems")[2].style.display= "flex";
        document.getElementsByClassName("subitems")[3].style.display= "flex";
        document.getElementsByClassName("subitems")[4].style.display= "flex";
    }
}

document.getElementsByTagName("form")[0].children[1].addEventListener("click",()=>{
    document.getElementsByTagName("form")[0].children[0].value = " ";
    e.preventDefault();
});

document.getElementsByClassName("mobile")[0].addEventListener("click",()=>{
    document.getElementsByClassName("mobile-dash")[0].classList.toggle("mobile-1");
    document.getElementsByClassName("mobile-dash")[1].classList.toggle("mobile-2");
    document.getElementsByClassName("mobile-dash")[2].classList.toggle("mobile-3");
    document.getElementsByClassName("mobile-options")[0].classList.toggle("display");
});







