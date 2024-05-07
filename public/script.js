const blogposts = document.querySelector('#blogposts');
// const appjs = require('c:\Users\middh\Documents\webdev\lect-6-CSS\freshMedium\app.js');
// let totalArticles = appjs.totalArticles;

function updateArticles(story, title){
    let li = document.createElement('li');
    li.innerHTML = `
    <div class="div3">
        <div class="div1copywidthchanged">
            <div class="firstline">
                <div class="img14"></div>
                <div class="firstlinetext">Sivan Hermon in Code Like A Girl</div>
            </div>
            <div class="secondlinedouble">${title}</div>
            <div class="thirdline">${story}</div>
            <div class="fourthline">
                <div class="lastmaintext">
                    Jan 24 &centerdot; 7 min read &centerdot;
                    <div class="smalllarge">Leadership</div> 
                </div>
                <div class="img8"></div>
            </div>
        </div>
        <div class="img15"></div>
    </div>
    `
    li.classList.add('div3');
    blogposts.appendChild(li);
}



let totalArticles = 0;
let cnt = 0;
let norepeat = [];
async function totalArticle(){
    const {data} = await axios.get('/getArticles');
     totalArticles = data.length;
}totalArticle();


window.addEventListener('scroll', async(ev) => {
    if(cnt < totalArticles){
        try{
            let random = Math.floor(Math.random()*totalArticles);
            if(norepeat.indexOf(random) == -1){
                norepeat.push(random);
                let {data} = await axios.post(`/getArticle`, {
                    indx: random
                });
                const {story, title} = data;
                cnt++;
                updateArticles(story, title);
            }
        }
        catch(err){
            console.log(err);
        }
    }
})