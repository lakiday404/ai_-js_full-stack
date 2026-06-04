let obj = {
    age: 18,
    name: `nange`,
    like:{
        n:'valorant',
        m:'deltaforce',
        o : {
            a:'xijiao'
        }
    }
}

function deepCopy(obj){    
    let res = {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof(obj[key]) == 'object' && obj[key] != null){
                res[key] = deepCopy(obj[key])
            }else{
                res[key] = obj[key]
            }
        }
    }

    return res
}
let oo = deepCopy(obj)
obj.like.o.a = 'anmo'
console.log(oo)