
class Ajax{
    async ajaxGet(callback){
            await fetch('http://localhost:3000/termekek').then((adatok)=>{
            adatok.json().then((adatok_json)=>{
                callback(adatok_json);
            })
        });
    }
}

export default Ajax;