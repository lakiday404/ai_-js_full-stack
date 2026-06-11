let arr=[7,4,5,6,3,1,2]
function selectSort(arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let minIndex = getMinIndex(arr, i);
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
  }
  return arr
}

function getMinIndex(arr, i) {
  let minIndex = i
  for (let j = i; j < arr.length; j++) {
    if (arr[j] < arr[minIndex]) {
      minIndex = j
    }
  }
  return minIndex
}
console.log(selectSort(arr))