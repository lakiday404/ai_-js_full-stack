// function bar(){
//     console.log(myName);
// }
// function foo(){
//     var myName = 'liu'
//     bar()
// }
// var myName = 'you'
// foo()

let count = 1
function main(){
    let count = 2
    function bar(){
        let count = 3
        function foo(){
            // let count =4
            console.log(count)
        }
        foo()
    }
    bar()
}
main()