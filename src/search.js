class Node{
	//Alphabet Size = 26 .
	constructor(){
		this.isEnd = false ;
		this.child = [] ;
		for( var i=0;i<26;i++ ) {
			this.child[i] = null ;
		}
	}
}
class Trie{
	
	constructor(){
		this.root = new Node() ;
		this.list = [] ;
	}
	
	add( str ) {

		let curr = this.root ;
		for( var i=0;i<str.length;i++ ) {
			var index = str.charCodeAt(i) - 97 ;
			if( index<0 ) continue;
			if( curr.child[index]==null ) curr.child[index] = new Node() ;
			curr = curr.child[index] ;	
		}

		curr.isEnd = true ;
	}
	//this helper() is used to generate all possible postfix for given prefix String :
	helper( curr , postfix , prefix ) {
		if( curr.isEnd==true ) 
			this.list.push(prefix+postfix) ;
		for( var i=0;i<26;i++ ) 
			if( curr.child[i]!=null ) {
				postfix += 'abcdefghijklmnopqrstuvwxyz'.charAt(i);
				this.helper( curr.child[i] , postfix , prefix ) ;
				postfix = postfix.substring( 0 , postfix.length-1 ) ;
			}
	}
	
	findPostFix( prefix ) {
		this.list = [] ;
		let curr = this.root ;
		for( var i = 0 ;i<prefix.length;i++ ) {
			var index = prefix.charCodeAt( i )-97 ;
			if( curr.child[index]==null ) return -1 ;
			curr = curr.child[index] ;
		}
		this.helper( curr , "" , prefix ) ;
		return curr ;
	}
}
//Head is Created her to make its scope Global .
const head = new Trie() ;

function insertTrie( input ){
	//Inserting character from an txt file .
	for( var i = 0 ; i<370104 ; i++ ) 
		head.add(input[i]) ;
}

function searchEngine( word ){
	var result = head.findPostFix( word ) ;
	return( head.list ) ;
}

$(document).ready(function(){

	$.get("https://raw.githubusercontent.com/SamirPaulb/assets/main/words_alpha-trie-autocomplete.txt",function(data){
		var input = data.split("\n") ;
		insertTrie(input) ;
	});
	
	$('.input').on('keyup',function( event ){
		var input = $(this).val() ;
		//When something is typed in input box ( i.e Only Alphabtes , without spaces are accepted ) .
		if( input.length>0){
			//I have only inserted words in lowerCase character so as soon you type every input is made to LowerCase character
			input = input.toLowerCase();
			//The input is passed and it return array of words which matches the input
			var arr = searchEngine(input) ;
			var words ="" ;
			for( var i=0;i<arr.length;i++ ) {
				words += "<div class=words>"+ arr[i] +"</div>"
			}
			$('.display-result').text('') ;
			$('.display-result').append( words ) ;	
		}
		else $('.display-result').text('') ;

	});


});
