export const environment = {
  production: true,
  BASE_URL: 'https://api-mean.onrender.com',
	USER_BASE_URL: 'https://api-mean.onrender.com/api/user/',
	USER: {
		getAllUser: 'getalluser',
		getUser: 'getuser/:id',
		updateUser: 'updatuser/:id',
		deleteUser: 'deletuser/:id',
		recupererVoiture: 'recuperervoiture',
		ajoutUser: 'inscription'
	},
	GARAGE_BASE_URL: 'https://api-mean.onrender.com/api/garage/',
	VOITURE: {
		ajoutVoiture: 'depotvoiture',
		getVoitureAReparer: 'listevoituregarage',
		getHistorique: 'listevoiturehistorique',
		getDetails: 'getfichedetail'
	},
	FACTURE_BASE_URL: 'https://api-mean.onrender.com/api/facture/',
	FACTURE: {
		getFactureFiche: 'getfacture'
	},
	ATELIER_BASE_URL: 'https://api-mean.onrender.com/api/atelier/',
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
	FINANCIER_BASE_URL: 'https://api-mean.onrender.com/api/financier/',
	FINANCIER: {
		validerPaiement: 'validerpaiement',
		getListePaiement: 'getlistevoiturepaiement',
		getListeTermine: 'getlistevoituretempsmoyenne',
		getTempsMoyenne: 'gettempsmoyenne',
		getChiffreAffaire: 'chiffreaffaire',
		ajoutType: 'ajoutertypedepense',
		getTypeDepense: 'gettypedepense',
		getListeDepense: 'getlistedepense',
		ajoutDepense: 'ajouterdepense',
		getBenefice: 'getbenefice',
		recherche: 'recherche'
	}

};
