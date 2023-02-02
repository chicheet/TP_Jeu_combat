class Personnage {
    constructor(nom) {
        this.nom = nom;
        this.vie = Personnage.nombreAleatoire();
        this.attaque = Personnage.nombreAleatoire();
        this.defense = Personnage.nombreAleatoire();
        this.existe = true;
    }
    static nombreAleatoire() {
        return Math.floor(Math.random() * (100 - 20 + 1) + 20);
    }
    attaquer(cible) {
        console.log(`Nouvelle attaque de ${this.nom} sur ${cible.nom} !!`);
        if (this.attaque > cible.defense) {
            cible.vie -= 10;
        } else if (this.attaque === cible.defense) {
            cible.vie -= 5;
        } else {
            this.vie -= 5;
        }

        if (this.vie <= 0) {
            console.error(`Le personnage ${this.nom} est dead.`);
            this.existe = false;
        }

        if (cible.vie <= 0) {
            console.error(`Le personnage ${cible.nom} est dead.`);
            cible.existe = false;
        }

        this.info();
        cible.info();
    }
    info() {
        console.log(`Nom : ${this.nom} | Vie : ${this.vie} | Attaque : ${this.attaque} | Defense : ${this.defense}`);
    }

    static creationPersonnage(nom, sante, force,defense) {
        return new Personnage(nom, sante, force,defense);
    }

}

class CRS extends Personnage {
    constructor(nom, vie, attaque,defense) {
        super(nom, vie, attaque,defense);
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
    constructor(nom, vie, attaque,defense) {
        super(nom, vie, attaque,defense);
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


// Création des personnages
const giletsJaunes = [];
const crs = [];

for (let i = 1; i <= 8; i++) {
    giletsJaunes.push(new GJ(`GiletJaune ${i}`));
    crs.push(new CRS(`CRS ${i}`));
}

while (giletsJaunes.some(giletJaune => giletJaune.vie > 0) && crs.some(cr => cr.vie > 0)) {
    const giletJauneAttaquant = giletsJaunes[Math.floor(Math.random() * giletsJaunes.length)];
    const crCible = crs[Math.floor(Math.random() * crs.length)];

    if (giletJauneAttaquant.vie <= 0) {
        continue;
    }
    giletJauneAttaquant.attaquer(crCible);
    console.log(`${giletJauneAttaquant.nom} attaque ${crCible.nom}. La santé de ${crCible.nom} est maintenant de ${crCible.vie}`);

    if (crCible.vie <= 0) {
        console.log(`${crCible.nom} est tombé au combat.`);
        continue;
    }

    const crAttaquant = crs[Math.floor(Math.random() * crs.length)];
    const giletJauneCible = giletsJaunes[Math.floor(Math.random() * giletsJaunes.length)];

    if (crAttaquant.vie <= 0) {
        continue;
    }

    crAttaquant.attaquer(giletJauneCible);
    console.log(`${crAttaquant.nom} attaque ${giletJauneCible.nom}. La santé de ${giletJauneCible.nom} est maintenant de ${giletJauneCible.vie}`);

    if (giletJauneCible.vie <= 0) {
        console.log(`${giletJauneCible.nom} est tombé au combat.`);
    }
}

if (giletsJaunes.every(giletJaune => giletJaune.vie <= 0)) {
    console.log("Les CRS ont gagné le combat!");
} else {
    console.log("Les Gilets Jaunes ont gagné le combat!");
}
