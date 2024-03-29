function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

export default {
  suppression_taxe_habitation: {
    template: function (payload) {
      return 'Pour <span>' +
        formatNumber(payload.nombre_foyers) +
        '</span>  foyers dans votre commune, la taxe d\'habitation était de <span>' +
        formatNumber(payload.baisse_total) +
        '</span> euros en 2018. Désormais, ils ne la paient plus. Pour savoir si vous êtes éligibles à la baisse rendez-vous <a href="https://www.impots.gouv.fr/portail/simulateur-de-la-reforme-de-la-taxe-dhabitation-pour-2019" target="_blank">ici</a>.';
    }
  },
  couverture_fibre: {
    template: function (payload) {
      let str = [];

      if (payload.nombre_locaux_raccordes_ville && payload.hausse_depuis_2017_ville) {
        str.push('Dans votre commune, il y a désormais <span>'+formatNumber(payload.nombre_locaux_raccordes_ville)+'</span> locaux raccordables au Très Haut Débit, '+
            'soit <span>'+formatNumber(payload.hausse_depuis_2017_ville)+'</span> de plus qu\'en mai 2017.');
      }

      if (payload.nombre_locaux_raccordes_departement && payload.hausse_depuis_2017_departement) {
        str.push('Au niveau départemental, il y a désormais <span>'+formatNumber(payload.nombre_locaux_raccordes_departement)+'</span> locaux raccordables au Très Haut Débit, '+
            'soit <span>'+formatNumber(payload.hausse_depuis_2017_departement)+'</span> de plus qu\'en mai 2017.');
      }

      return str.join(' ');
    }
  },
  maison_service_accueil_public: {
    template: 'Une Maison France Service a ouvert dans votre commune.'
  },
  creation_entreprises: {
    template: function (payload) {
      let str = 'Depuis mai 2017, il y a <span>'+formatNumber(payload.entreprises)+'</span> entreprises de plus dans votre commune';

      if (payload.micro_entreprises) {
        str += ', dont <span>'+formatNumber(payload.micro_entreprises)+'</span> micro-entreprises';
      }

      str += '.';

      return str;
    }
  },
  baisse_nombre_chomeurs: {
    template: function (payload) {
      let str = [];

      if (payload.baisse_ville) {
        str.push('Depuis mai 2017, il y a <span>'+formatNumber(payload.baisse_ville)+'</span> chômeurs en moins dans votre commune.');
      }

      if (payload.baisse_departement) {
        str.push('Depuis mai 2017, il y a <span>'+formatNumber(payload.baisse_departement)+'</span> chômeurs en moins au niveau départemental.');
      }

      return str.join(' ');
    }
  },
  pass_culture: {
    template: 'Dans votre commune, tous les jeunes de 18 ans peuvent bénéficier du PASS culture : c’est un total de 500€ pour s’offrir des activités culturelles et artistiques.'
  },
  emplois_francs: {
    template: "Un quartier de votre commune est éligible au dispositif des emplois francs."
  },
  quartier_reconquete_republicaine: {
    template: "Un Quartier de Reconquête Républicaine a été déployé dans votre ville."
  },
  cheque_energie: {
    template: function (payload) {
      return 'Au niveau départemental, <span>'+formatNumber(payload.nombre_beneficiaires)+'</span> personnes bénéficient d’un chèque énergie, ' +
          'pour un montant moyen de <span>200</span> euros. ' +
          'Pour savoir si vous êtes éligible, rendez-vous <a href="https://chequeenergie.gouv.fr/beneficiaire/eligibilite" target="_blank">ici</a>.';
    }
  },
  conversion_surface_agricole_bio: {
    template: function (payload) {
      return 'Au niveau départemental, <span>'+formatNumber(payload.hectares_bio)+'</span> hectares sont désormais cultivés en agriculture biologique, '+
          'ou sont en cours de conversion. C’est <span>'+formatNumber(payload.progression)+'%</span> de plus qu’en 2017.';
    }
  },
  prime_conversion_automobile: {
    template: function (payload) {
      return 'Dans votre département, <span>' + formatNumber(payload.nombre_beneficiaires) + '</span> personnes ont pu ' +
        'bénéficier d’une prime à la conversion automobile ou d’un bonus à l’achat pour acheter une voiture ' +
        'moins polluante et donc plus économique.';
    }
  },
  dedoublement_classes: {
    template: function (payload) {
      let str = 'Dans votre commune, les classes de CP ou de CE1 ont été dédoublées.';

      if (payload.total_eleves) {
        str += ' Au total, <span>'+formatNumber(payload.total_eleves)+'</span> élèves disposent de meilleures conditions d\'enseignement.';
      }

      return str;
    }
  },
  mission_bern: {
    template: function () {
      return 'Un projet de rénovation du patrimoine est soutenu par la Mission Bern. ' +
        'Pour plus d’information sur le financement et les restaurations entreprises, ' +
        'cliquez <a href="https://www.fondation-patrimoine.org/recherche-projet?typesChecked=Soutenus%20par%20Mission%20Bern&page=1" target="_blank">ici</a>.';
    }
  },
  france_relance: {
    template: function (payload) {
      let str = 'Le plan de relance a permis de financer <span>'+formatNumber(payload.nombre_projets)+'</span> projets dans le département.';

      if (payload.exemple) {
        str += ' '+payload.exemple;
      }

      return str;
    }
  },
  devoirs_faits: {
    template: function (payload) {
      return 'Pour permettre la réussite des élèves, déjà <span>'+ payload.proportion_eleves +'</span> du département ' +
        'sont suivis en dehors des heures de classe grâce au programme Devoirs faits.';
    }
  },
  maison_de_sante: {
    template: function (payload) {
      return 'Dans le département, il existe désormais <span>'+formatNumber(payload.nombre_maisons)+'</span> maisons de santé, ' +
        'soit une progression de <span>'+formatNumber(payload.pourcentage_progression)+'%</span> de plus qu\'en 2017.';
    }
  },
  ma_prime_renov: {
    template: function (payload) {
      return 'Dans le département, <span>'+formatNumber(payload.nombre_foyers)+'</span> foyers ont bénéficié d\'une prime à la rénovation énergétique.';
    }
  },
  apprentissage: {
    template: function (payload) {
      return 'Dans votre département, plus de <span>'+formatNumber(payload.nombre_jeunes)+'</span> jeunes ont opté pour ' +
        'l\'apprentissage en 2020, soit près de <span>'+formatNumber(payload.pourcentage_progression)+'%</span> de plus qu\'en 2017.';
    }
  },
  entreprises_aidees_covid: {
    template: function (payload) {
      return 'Au plus fort de la crise, plus de <span>'+formatNumber(payload.nombre_entreprises)+'</span> entreprises ' +
        'ont été aidées par les dispositifs de protection et les revenus ' +
        'de près de <span>'+formatNumber(payload.pourcentage_salaries)+'%</span> des salariés du département ont été préservés grâce au chômage partiel.';
    }
  }
};
