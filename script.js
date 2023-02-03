class Personnage {
    constructor(nom) {
        this._nom = nom;
        this._vie = Personnage.nombreAleatoire();
        this._attaque = Personnage.nombreAleatoire();
        this._defense = Personnage.nombreAleatoire();
        this._existe = true;
    }

    static nombreAleatoire() {
        return Math.floor(Math.random() * (100 - 20 + 1) + 20);
    }

    attaquer(cible) {
        console.log(`Nouvelle attaque de ${this._nom} sur ${cible._nom} !!`);
        if (this._attaque > cible._defense) {
            cible._vie -= 10;
        } else if (this._attaque === cible._defense) {
            cible._vie -= 5;
        } else {
            this._vie -= 5;
        }
        this.info();
        cible.info();
    }

    info() {
        console.log(`Nom : ${this._nom} | Vie : ${this._vie} | Attaque : ${this._attaque} | Defense : ${this._defense}`);
    }

    get nom() {
        return this._nom;
    }

    set nom(nom) {
        this._nom = nom;
    }

    get vie() {
        return this._vie;
    }

    set vie(vie) {
        if (vie <= 0) {
            this._vie = 0;
            this.existe = false;
            console.log("Le personnage est mort");
        } else {
            this._vie = vie;
        }
    }
}

class CRS extends Personnage {
    constructor(nom) {
        super(nom);
    }

    attaquer(cible) {
        super.attaquer(cible);

        let chance = Math.floor(Math.random() * 10) + 1;
        console.log(`Chance: ${chance}`);

        if (chance >= 7 && chance <= 9) {
            this.fumigene(cible);
        } else if (chance === 10) {
            this.canonAEau(cible);
        } else {
            console.log("Aucun coup spécial n'a été déclenché.");
        }
    }

    fumigene(cible) {
        cible.vie -= 5;
        console.log(`${this.nom} utilise une attaque fumigène contre ${cible.nom} et lui enlève 5 points de vie.`);
        console.log(`${cible.nom} a maintenant ${cible.vie} points de vie.`);
    }

    canonAEau(cible) {
        cible.vie -= 10;
        console.log(`${this.nom} utilise un canon à eau contre ${cible.nom} et lui enlève 10 points de vie.`);
        console.log(`${cible.nom} a maintenant ${cible.vie} points de vie.`);
    }
}

class GJ extends Personnage {
    constructor(nom) {
        super(nom);
    }

    attaquer(cible) {
        super.attaquer(cible);

        let chance = Math.floor(Math.random() * 10) + 1;
        console.log(`Chance: ${chance}`);

        if (chance >= 7 && chance <= 9) {
            this.caillassage(cible);
        } else if (chance === 10) {
            this.mouvementDeFoule(cible);
        } else {
            console.log("Aucun coup spécial n'a été déclenché.");
        }
    }

    caillassage(cible) {
        cible.vie -= 5;
        console.log(`${this.nom} utilise la technique de caillassage et inflige 5 points de dégâts à ${cible.nom}!`);
    }

    mouvementDeFoule(cible) {
        cible.vie -= 15;
        console.log(`${this.nom} utilise la technique de mouvement de foule et inflige 15 points de dégâts à ${cible.nom}!`);
    }
}

class Init {

    static instancierJoueurs() {
        let joueurs = [];
        let ajouterJoueur = true;
        while (ajouterJoueur) {
            let nom = prompt("Entrez le nom du joueur:");
            let type = prompt("Entrez le type de joueur (GJ ou CRS):");

            if (joueurs.some(joueur => joueur.nom === nom)) {
                alert(`Le nom ${nom} est déjà utilisé. Veuillez entrer un autre nom.`);
            } else if (type === "GJ") {
                joueurs.push(new GJ(nom));
            } else if (type === "CRS") {
                joueurs.push(new CRS(nom));
            } else {
                alert("Type de joueur incorrect. Veuillez entrer 'GJ' ou 'CRS'.");
            }
            ajouterJoueur = confirm("Voulez-vous ajouter un autre joueur?");
        }
        console.log(joueurs);
        return joueurs;
    }

    static lancerMatch(joueurs) {
        const giletsJaunes = joueurs.filter(joueur => joueur instanceof GJ);
        const crs = joueurs.filter(joueur => joueur instanceof CRS);
        let match = new Match(giletsJaunes,crs);
        match.start();
    }
}

class Match {
    constructor(giletsJaunes, crs) {
        this.giletsJaunes = giletsJaunes;
        this.crs = crs;
        this.round = 0;
        this.winner = null;
    }

    start() {
        while (this.giletsJaunes.some(giletJaune => giletJaune.vie > 0)
        && this.crs.some(cr => cr.vie > 0)) {
            this.round++;
            const randomGiletJaune = this.giletsJaunes[Math.floor(Math.random() * this.giletsJaunes.length)];
            const randomCRS = this.crs[Math.floor(Math.random() * this.crs.length)];

            if (randomGiletJaune.vie > 0) {
                randomGiletJaune.attaquer(randomCRS);
            }

            if (randomCRS.vie > 0) {
                randomCRS.attaquer(randomGiletJaune);
            }
        }

        if (this.giletsJaunes.every(giletJaune => giletJaune.vie <= 0)) {
            console.log(`Les CRS ont gagné après ${this.round} tours !`);
            this.winner = this.crs.find(cr => cr.vie > 0);
        } else if (this.crs.every(cr => cr.vie <= 0)) {
            console.log(`Les Gilets Jaunes ont gagné après ${this.round} tours !`);
            this.winner = this.giletsJaunes.find(giletJaune => giletJaune.vie > 0);
        }

        console.log("Information du vainqueur:");
        console.log(`Nom: ${this.winner.nom}`);
        console.log(`Type: ${this.winner.type}`);
        console.log(`Vie: ${this.winner.vie}`);
    }
}


let joueurs = Init.instancierJoueurs();
Init.lancerMatch(joueurs);