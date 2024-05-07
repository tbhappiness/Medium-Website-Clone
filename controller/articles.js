const path = require('path');
const fs = require('fs/promises');
const articleDbPath = path.join(__dirname, '..', 'data', 'articles.json');

class Articles{
    static getArticle(indx){
        return new Promise(async (resolve, reject) => {
            try{
                const articles = JSON.parse(await fs.readFile(articleDbPath));
                resolve(articles[indx]);
            }
            catch(err){
                reject(err);
            }
        })
    }

    static getArticles(){
        return new Promise(async (resolve, reject) => {
            try{
                const articles = JSON.parse(await fs.readFile(articleDbPath));
                resolve(articles);
            }
            catch(err){
                reject(err);
            }
        })
    }

    static addArticle(story, title){
        return new Promise(async(resolve, reject) => {
            try{
                let articles = JSON.parse(await fs.readFile(articleDbPath));
                const newArticle = {
                    title,
                    story,
                }
                articles.push(newArticle);
                await fs.writeFile(articleDbPath, JSON.stringify(articles));
                resolve("Your Story is Published 👍");
            }
            catch(err){
                reject(err);
            }
        })
    }
}

module.exports = Articles;

