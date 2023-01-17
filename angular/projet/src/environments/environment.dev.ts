export const environment = {
	production: false,
	BASE_URL: 'http://localhost:3000',
	USER_BASE_URL: 'http://localhost:3000/api/user/',
	USER: {
		getAllUser: 'getalluser',
		getUser: 'getuser/:id',
		updateUser: 'updatuser/:id',
		deleteUser: 'deletuser/:id',
		ajoutUser: 'inscription'
	},
	GARAGE_BASE_URL: 'http://localhost:3000/api/garage/',
	VOITURE: {
		ajoutVoiture: 'depotvoiture',
		getVoitureAReparer: 'listevoituregarage',
		getHistorique: 'listevoiturehistorique',
		getDetails: 'getfichedetail'
	}

}