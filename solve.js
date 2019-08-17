var generate = require("./generate.js");

var genArray = generate.genArray;
var colCheck = generate.colCheck;
var squCheck = generate.squCheck;
var genPseudoku = generate.genPseudoku;
var visPseudoku = generate.visPseudoku;

//a function to check if all integers from 1 to n appear in a single row of a 2d array where n is the number of columns of the 2d array
function singleRowCheck(arr,row) {
	
	var numCols = arr[row].length;

	// first we have a loop to check for all integers from 1 to the length of the row
	for (var i = 1; i <= numCols; i++) {

		// this variable is going to count the number of times the integer i is in the row; if it is ever greater than 1 then we will return false, if it equal to zero after checking all columns then we return false
		var count = 0;
		// this loop is going to SEARCH every column for the integer i
		for (var j = 0; j < numCols; j++) {
			if (arr[row][j] == i) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		// this is to check if the integer is in the row at all; if it is not, then count == 0 and we will return false
		if (count == 0) {
			return false;
		}

	}
	// so if it has gone through all of the checks and passed we return true;
	return true;

}

// this takes two numbers n and len and returns an array of length len which is the representation of number n in base 4 with as many zeroes at the beginning as necessary
// be careful that len is as big as it needs to be to print n in full
function conversion(n,len) {
	var con = [];
	while (Math.floor(n/4) != 0) {
		con.push(n % 4);
		n = Math.floor(n/4);
	}
	con.push(n % 4);

	// the array con is in the wrong order, so we will create a new array which gives us what we want in the right order
	var out = [];
	for (var i = con.length - 1; i >= 0; i--) {
		out.push(con[i]);
		con.pop();
	}

	// this will add extra zeroes at the beginning of the array so that conversion is at length len
	while (out.length < len) {
		out.splice(0,0,0);
	}

	return out;
}



// WRITE YOUR CODE INTO THE BODY OF THESE FUNCTIONS TO GET THEM WORKING

function rowCheck(array) {
	
	for ( var i = 0; i<array.length;i++)
	{
		if (singleRowCheck(array,i)==false){
			return false;
		}
		
	}
	return true;
	 
 }

function blankEntries(array) {
var blank3 = []
	// this function should return an array
	for (var i =0; i <array.length; i++)
	{
		for (var j =0; j <array.length; j++){
			if (array[i][j] == " "){
				blank3.push([i,j])
		  }
	}
}
	return blank3; 
	
}


function makeCandidate(n,len) {

	// this function should return an array of integers between 1 and 4 of length len

	var candidate1 = [];
    can1= conversion(n,len);
    for(var i = 0; i < len; i++){
        candidate1.push(can1[i] + 1)
    }
    return candidate1;
}

function checkCandidate(array,candidate) {

	// this function should return a Boolean saying whether a candidate assignment of numbers satisfies the Pseudoku conditions
	var blank1 = blankEntries(array);
	for (var i =0; i <blank1.length; i++)
	{
		array[blank1[i][0]][blank1[i][1]] = candidate[i]
	}

	if(squCheck(array) && rowCheck(array) && colCheck(array)){
			return true;
		}
		else {
		for (var i =0; i <blank1.length; i++)
		{
			array[blank1[i][0]][blank1[i][1]] = " ";
		}
		
	}
	return false;	
}
		
	

// when calling this function for candidate do we put the makeCandidate function 


function solvePseudoku(array) {
	// this returns an array which is the completed Pseudoku puzzle
var blank = blankEntries(array)
	for (var n =0; n<4**blank.length;n++){
		var candidate = makeCandidate(n,blank.length);
		// console.log(candidate)
		var check = checkCandidate(array,candidate);
		// console.log(check)
		// console.log(check)
	if (check)
		{
			// return makeCandidate(n,blank.length);
			return array;
		}
}
return "No solutions!"
}

// WRITE YOUR TESTING CODE BELOW HERE
var row = [1,2,3,4];

console.log("Task 12: ", rowCheck(genArray(row)))
console.log("Task 13: ", blankEntries(genPseudoku(row,5)))
console.log("Task 14: ", makeCandidate(5,5))
console.log("Task 14: ", makeCandidate(12,4))
console.log("Task 14: ", makeCandidate(14,5))
console.log("Task 15: ", checkCandidate((genPseudoku(row,5)), makeCandidate(14,5)))
console.log("Task 16: ", solvePseudoku(genPseudoku(row,5)))

// console.log("Task 17:")

var arr1 = genPseudoku([2,3,4,1],8); 
console.log(visPseudoku(arr1));
var arr2 = genPseudoku([4,2,3,1],10); 
console.log(visPseudoku(arr2));
console.log(visPseudoku(solvePseudoku(arr1)));
console.log(visPseudoku(solvePseudoku(arr2)));
// console.log(solvePseudoku(arr1));

