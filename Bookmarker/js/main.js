// listen for form submit
document.getElementById("myForm").addEventListener('submit',saveBookmark);

function saveBookmark(e) {
	
	var siteName = document.getElementById("siteName").value;
	var siteURL = document.getElementById("siteURL").value;

	if(!validateForm(siteName, siteURL)) {
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteURL
	};

	/*
		// local storage (key, value) - only stores strings
		
		localStorage.setItem('test', "Hello World");
		localStorage.getItem('test');
		localStorage.removeItem('test');
	
	*/

	if(localStorage.getItem('bookmarks') == null ) {
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		var bm = JSON.parse(localStorage.getItem('bookmarks'));
		
		// add bookmarks to array
		bm.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bm));
	}

	document.getElementById("myForm").reset();

	fetchBookmarks();
	// prevent form from submitting
	e.preventDefault();
}

function validateForm(siteName, siteURL) {
	if(!siteURL || !siteName) {
		alert('Some input fields are empty, please provide valid inputs');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteURL.match(regex))	 {
		alert('URL validation failed, please enter a correct URL.');
		return false;
	}


	return true;
}

function deleteBookmark(url) {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(var i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url) {
			bookmarks.splice(i, 1);
		}
	}

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();
}

function fetchBookmarks() {
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	var bmResults = document.getElementById('bookmarkResults');

	// output strings
	bmResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bmResults.innerHTML += '<div class="well">' + 
								'<h3>' + name 
								+ '  <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>  ' 
								+ '  <a class="btn btn-danger" onclick="deleteBookmark(\'' + url + '\')" href="#">Delete</a>'
								+ '</h3>'
								+ '</div>'; 

	}
}