
const PWNED_ENDPOINT = "https://haveibeenpwned.com/api/v2/breachedaccount/"


function getDataFromAPI(email, callback){
	const emailEndpoint = PWNED_ENDPOINT + email;

	$.getJSON(emailEndpoint, {}, callback)
		.fail(showErr)

}

function showErr(err){
	console.log(err)
}

function generateHtmlString(item){
		let htmlString = `<div class="container">
    <div role="contentinfo" class="contentinfo">
      <h4><a href="${item.Domain}" target="_blank">${item.Name}</a></h4>
      <p>${item.BreachDate}</p>
      <p>${item.Description}</p>
    </div>
  </div>
	`
	return htmlString
}

function displayEmailInfo(data){
	let htmlArray = ''
	data.map(item => htmlArray+= generateHtmlString(item))
	$('.search-results').html(htmlArray)
}



function handleSubmit(){

	$('.form').submit(event => {

		event.preventDefault();
		
		const userEmail = $('.text-input').val()
		
		getDataFromAPI(userEmail, displayEmailInfo)
	})
}

$(handleSubmit())