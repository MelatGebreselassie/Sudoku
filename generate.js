//a function to check if all integers from 1 to n appear in a column of a 2d array where n is the number of rows of the 2d array
function singleColCheck(arr,column) {
	
	var numRows = arr.length;
	var numCols = arr[0].length;

	// first we have a loop to check for all integers from 1 to the length of the column
	for (var i = 1; i <= numRows; i++) {

		// this variable is going to count the number of times the integer i is in the column; if it is ever greater than 1 then we will return false, if it equal to zero after checking all rows then we return false
		var count = 0;
		// this loop is going to SEARCH every column for the integer i
		for (var j = 0; j < numRows; j++) {
			if (arr[j][column] == i) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		// this is to check if the integer is in the column at all; if it is not, then count == 0 and we will return false
		if (count == 0) {
			return false;
		}

	}
	// so if it has gone through all of the checks and passed we return true;
	return true;

}

// a function to check that all integers appear in a square of a 2d array - (x1,y1) is the (row,colum) entry of the top-left element, and (x2,y2) is the bottom-right element of the square
// e.g. singleBlockCheck(arr,0,0,1,1) would check if the 2-by-2 block in the top-left contains all integers from 1 to 4
function singleBlockCheck(arr,x1,y1,x2,y2) {
	// this generates an array square of all the elements inside a particular square of a 2d array
	var square = [];
	for (var i = y1; i <= y2; i++) {
		for (var j = x1; j <= x2; j++) {
			square.push(arr[i][j]);
		}
	}

	// this then checks whether each integer from 1 to the length of the array square is inside the particular square
	var sqSize = square.length;
	for (var i = 1; i <= sqSize; i++) {
		var count = 0;
		for (var j = 0; j < sqSize; j++) {
			if (square[j] == i){
				count++;
			}
			if (count > 1){
				return false;
			}
		}
		if (count == 0){
			return false;
		}
	}

	return true;
}

// a function to randomly select n (row,column) entries of a 2d array with size columns and size rows, where size is assumed to be an integer and n is also assumed to be an integer
function entriesToDel(size,n) {
	if (n <= size ** 2) {

		// this creates an array of all the rows and column indices

		var array = [];
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				array[j+(size * i)] = [i,j];
			}
		}

		// this creates a new array, called array2 to store randomly chose elements of the array that will be removed, and then removes those elements from array

		var num = size ** 2;

		var array2 = [];
		for (var i = 0; i < n; i++) {
			var x = Math.round( (num - i - 1) * Math.random() );
			array2[i] = array[x];
			array.splice(x,1);
		}
		return array2;
	}
	return "Number of elements exceeds size of array!";
}



// WRITE YOUR CODE INTO THE BODY OF THESE FUNCTIONS TO GET THEM WORKING




function genArray(row) {
	

	// this function should return an array
    
	var put = [];
	for (var j = 0; j <= (row.length) - 1; j++) {
		put[j] = row.slice();
	}
	return put;

}
  
    


function colCheck(arr) {

	// this function should return a Boolean
   
   for ( var i = 0; i<4;i++)
   {
	   if (singleColCheck(arr,i)==false){
		   return false;
	   }
	   return true;
   }
    
}

function squCheck(arr) {
	
	// this function should return a Boolean singleBlockCheck(arr,x1,y1,x2,y2)(x1,y1) is the (row,colum) entry of the top-left element, and (x2,y2) is the bottom-right element of the square


     if (singleBlockCheck(arr,0,0,1,1) == true)
	 	{
	 		return true;
		}
	if (singleBlockCheck(arr,0,2,1,3) == true)
		 {
		return true;
         }
     if (singleBlockCheck(arr,2,0,3,1) == true)
         {
             return true; 
         }
    
     if (singleBlockCheck(arr,2,2,3,3) == true)
         {
             return true; 
		 }

	return false; 
  
}

function cyclicPerm(arr,row,n) {
	
	// this function should return an array
    	for (var j = 1; j <= n; j++) 
        {
		var end = arr[row][3];
		for (var i = 3; i > 0; i--)
        {
			arr[row][i] = arr[row][i-1];
		}
		arr[row][0] = end;
	}
	return arr;
}

function perm(arr,a,b,c) {

	// this function should return an array

    for (var i = 0; i<1; i++)
        {
            cyclicPerm(arr,1,a);
            cyclicPerm(arr,2,b);
            cyclicPerm(arr,3,c);
            
        }
      return arr; 
    
 

}

function permArray(arr) {
	
	// this function should return an array or a arr saying "There is no solution!"

	for (var i = 0; i<arr.length; i++){
		for (var j = 0; j<arr.length; j++){
			for (var v = 0; v<arr.length; v++){
				arr=(perm(arr,i,j,v));

					if (colCheck(arr) && squCheck(arr)==true)
					{
						return arr;
					}
	}
	}
	}
	return "There is no solution!";
}




	function delEntries(arr,n){
 // this function should return an array
    var del = entriesToDel(arr.length, n);
    for (var i=0; i < n; i++)
    {
        arr[del[i][0]][del[i][1]] = " ";
    }
    return arr;
}

function genPseudoku(row,n){
	
	// this function should return an array

	var arr = [];

	arr = genArray(row);
	arr = permArray(arr);
	arr = delEntries(arr,n);
	return arr; 

}


function visPseudoku(arr) {
	var rows = arr.length;
	var cols = arr[0].length;
	var outString = "";
	for (var i = 0; i < rows; i++) {
		outString =  outString + "-------------"+ "\n";
		
		for (var j = 0; j < cols; j++) {
			outString =  outString + arr[i][j] + " " + "|";
			

		}
		outString = outString +"\n";
	}
	return outString;
}
	





// PUT YOUR NON-FUNCTION WORKING BELOW HERE, e.g. function calls, printing to the console, creation of variables
///////////////////////////////////////////////////////////////////////////////////////////////////////

var row = [1,2,3,4];
var arrnew = [];
console.log(arrnew)
var arr = genArray(row);
console.log(" Task 1:", arr)
console.log(" Task 2:" , colCheck(genArray(row)))
console.log (" Task 3:", squCheck(genArray(row)))
console.log (" Task 4:", cyclicPerm(genArray(row),2,2))
console.log (" Task 5:", perm(genArray(row),3,1,0))
console.log (" Task 6: ", permArray(genArray(row)))
console.log (" Task 7: ", delEntries(genArray(row),2))
console.log (" Task 9: ")
console.log ( visPseudoku(genPseudoku(row,5)))
console.log("Task 10: part a ")
console.log(visPseudoku(genPseudoku([1,3,4,2],7)));
console.log("Task 10: part b ")
console.log(visPseudoku(genPseudoku([4,1,3,2],10)));

module.exports = {
	genArray : genArray,
	colCheck : colCheck,
	squCheck : squCheck,
	genPseudoku : genPseudoku,
	visPseudoku : visPseudoku
}