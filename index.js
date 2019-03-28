
const PWNED_ENDPOINT = "https://haveibeenpwned.com/api/v2/breachedaccount/"


function getDataFromAPI(email, callback){
  const emailEndpoint = PWNED_ENDPOINT + email;
  
  $.ajax({
    method: "GET",
    dataType: "json",
    url: emailEndpoint,
    // beforeSend: function(xhr){
    //   xhr.setRequestHeader('User-Agent', 'application/json');
    //   xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // },
    success: callback
  })
  .fail(showErr);

	// $.getJSON(emailEndpoint, callback)
	// 	.fail(showErr)

}

function showErr(err){
  if (err.statusText === 'error') {
    generateErrorHtml();
  }}


function generateErrorHtml() {
  let errorString = `<div class="clear">Congrats!<br>Your email has not been pwned!<br>You're all good!</div>`;
  $('.search-results').html(errorString);
}

function generateHtmlString(item){
		let htmlString = `<div role="contentinfo" class="content-info">
      <h2 class="content-info-margin">Domain: <span>${item.Domain}</span></h2>
      <p class="content-info-margin">Date of Breach: <span>${
        item.BreachDate
      }</span></p>
      <p>${item.Description}</p>
    </div>
	`;
	return htmlString
}

function displayEmailInfo(data){
	let htmlString = `<div class="hacked">Your email was part of a data breach!</div>`;
	data.map(item => htmlString+= generateHtmlString(item))
	$('.search-results').html(htmlString)
}



function handleSubmit(){

	$('.form').submit(event => {

		event.preventDefault();
		
		const userEmail = $('.text-input').val()
		
		getDataFromAPI(userEmail, displayEmailInfo)

		$('.text-input').val('')
	})
}

$(handleSubmit())

$('#try-btn').click(function() {
  $('html, body').animate(
    {
      scrollTop: $('#email-section').offset().top,
    },
    1500,
  );
});