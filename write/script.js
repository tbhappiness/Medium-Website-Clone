const storyInput = document.querySelector('.storyInput');
const titleInput = document.querySelector('.titleInput');
const articleForm = document.querySelector('.articleForm');
const inputContent = document.querySelector('.inputContent');
const mediumLogo = document.querySelector('.mediumLogo');
const publish = document.querySelector('.publish');

setInterval(() => {
    function publishCSS(){
        if(titleInput.value == "" || storyInput.value == ""){
            publish.style.opacity = "0.5";
        }
        else{
            publish.style.opacity = "1";
        }
    
    }
    publishCSS();
}, 0)

storyInput.addEventListener('keyup',(ev)=>{ 
    // ev.target.scroll.style.visibility = 0;
    let scheight = ev.target.scrollHeight;
    storyInput.style.height = `${scheight}px`;
})


articleForm.addEventListener('submit', async(ev) => {
    if(storyInput == "" && titleInput == ""){
        ev.preventDefault();
        try{
            let title = titleInput.value;
            let story = storyInput.value;
            const {data} = await axios.get(`/publish?title=${title}&story=${story}`);
            titleInput.value = "";
            storyInput.value = "";
        }
        catch(err){
            console.log(err);
        }
    }
})


