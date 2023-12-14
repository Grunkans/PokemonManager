const url = 'https://api.adviceslip.com/advice'
	fortuneButton.addEventListener('click' , async () => {
		try{
		const response = await fetch(url)
		const data = await response.json()

		console.log('Data from API:', data);
		
		// adviceContainer.innerText = data.slip.advice
		// addToHistory(data.slip)
								
		}
		catch(error) {
			console.log('An error occurred! ' + error.message);
		}

		
	

		
	})