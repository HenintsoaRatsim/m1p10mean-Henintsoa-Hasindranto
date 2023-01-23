export const environment = {
	production: false,
	BASE_URL: 'http://localhost:3000',
	USER_BASE_URL: 'http://localhost:3000/api/user/',
	USER: {
		getAllUser: 'getalluser',
		getUser: 'getuser/:id',
		updateUser: 'updatuser/:id',
		deleteUser: 'deletuser/:id',
		recupererVoiture: 'recuperervoiture',
		ajoutUser: 'inscription'
	},
	GARAGE_BASE_URL: 'http://localhost:3000/api/garage/',
	VOITURE: {
		ajoutVoiture: 'depotvoiture',
		getVoitureAReparer: 'listevoituregarage',
		getHistorique: 'listevoiturehistorique',
		getDetails: 'getfichedetail'
	},
	FACTURE_BASE_URL: 'http://localhost:3000/api/facture/',
	FACTURE: {
		getFactureFiche: 'getfacture'
	},
	ATELIER_BASE_URL: 'http://localhost:3000/api/atelier/',
	ATELIER: {
		getListeVoitureAReparer: 'getlistevoitureareparer',
		receptionnerVoiture: 'receptionnervoiture',
		getListeVoitureReceptionner: 'getlistevoiturereceptionner',
		ajoutReparation: 'ajoutreparation',
		ajoutAvancement: 'ajouteravancement',
		voitureEnReparation: 'getvoitureenreparation',
		listeterminer: 'getvoiturereparationfini',
		validerBonSortie: 'validerbondesortie'
	},
	FINANCIER_BASE_URL: 'http://localhost:3000/api/financier/',
	FINANCIER: {
		validerPaiement: 'validerpaiement',
		getListePaiement: 'getlistevoiturepaiement',
		getListeTermine: 'getlistevoituretempsmoyenne',
		getTempsMoyenne: 'gettempsmoyenne',
		getChiffreAffaire: 'chiffreaffaire'
	}

}