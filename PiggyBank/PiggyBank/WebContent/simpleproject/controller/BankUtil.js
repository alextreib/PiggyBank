var _token_id;

function getAccounts() {
	// alert("Get accounts for Token:   " + _token_id); 
	jQuery.ajax({
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		url: "https://hackathon.postbank.de:443/bank-api/gold/postbankid/?refreshCache=false",
		dataType: "json",
		headers: {
			"API-Key": "485430390021fc15",
			"x-auth": _token_id,
		},
		success: function(data) {
			// alert("success: " + data.accounts[0].iban);
		},
		error: function(data) {
			//  alert("error: " + data);
		}
	});
}

function getBankToken() {
	jQuery.ajax({
		type: "POST",
		contentType: "application/x-www-form-urlencoded",
		url: "https://hackathon.postbank.de/bank-api/gold/postbankid/token",
		dataType: "json",
		data: "username=HackathonNov01_7&password=hat1116",
		headers: {
			"API-Key": "485430390021fc15"
		},
		success: function(data) {
			_token_id = data.token;
			// alert("success! Token is:   " + _token_id);         
			getAccounts();
		}
	});
}