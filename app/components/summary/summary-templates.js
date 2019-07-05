function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

export default {
  suppression_taxe_habitation: {
    label: "Suppression de la taxe d’habitation",
    template: function (payload) {
      return 'Pour <span>'+formatNumber(payload.nombre_foyers)+'</span> foyers dans votre commune, '+
          'la taxe d\'habitation a baissé de <span>'+formatNumber(payload.baisse_2018)+'</span> euros en 2018. '+
          'Elle baissera de <span>'+formatNumber(payload.baisse_2019)+'</span> euros supplémentaires en 2019 et à nouveau en 2020. '+
          'Au total, votre taxe d\'habitation va donc baisser de <span>'+formatNumber(payload.baisse_total)+'</span> euros. '+
          'Pour savoir si vous êtes éligibles, rendez-vous <a href="https://www.impots.gouv.fr/portail/simulateur-de-la-reforme-de-la-taxe-dhabitation-pour-2019" target="_blank">ici</a>.';
    }
  },
  couverture_fibre: {
    label: "Couverture en fibre de tout le territoire",
    template: function (payload) {
      let str = [];

      if (payload.nombre_locaux_raccordes_ville && payload.hausse_depuis_2017_ville) {
        str.push('Dans votre commune, il y a désormais <span>'+formatNumber(payload.nombre_locaux_raccordes_ville)+'</span> locaux raccordés au Très Haut Débit, '+
        'soit <span>'+formatNumber(payload.hausse_depuis_2017_ville)+'</span> de plus qu\'en mai 2017.');
      }

      if (payload.nombre_locaux_raccordes_departement && payload.hausse_depuis_2017_departement) {
        str.push('Au niveau départemental, il y a désormais <span>'+formatNumber(payload.nombre_locaux_raccordes_departement)+'</span> locaux raccordés au Très Haut Débit, '+
            'soit <span>'+formatNumber(payload.hausse_depuis_2017_departement)+'</span> de plus qu\'en mai 2017.');
      }

      return str.join(' ');
    }
  },
  maison_service_accueil_public: {
    label: "Généralisation des maisons de service et d'accueil du public",
    template: "Une Maison de service et d’accueil du public a ouverte dans votre commune."
  },
  creation_entreprises: {
    label: "Création nettes d'entreprises",
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
    label: "Baisse du nombre de chômeurs",
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
    label: "Mise en Place du Pass Culture",
    template: "Dans votre commune, tous les jeunes de 18 ans peuvent expérimenter le PASS culture : c’est une réserve de <span>500€</span> pour s’offrir des activités culturelles et artistiques."
  },
  emplois_francs: {
    label: "Emplois francs",
    template: "Un quartier de votre commune est éligible au dispositif des emplois francs."
  },
  quartier_reconquete_republicaine: {
    label: "Création d'un quartier de reconquête républicaine",
    template: "Un Quartier de Reconquête Républicaine a été déployé dans votre ville."
  },
  cheque_energie: {
    label: "Chèque énergie",
    template: function (payload) {
      return 'Au niveau départemental, <span>'+formatNumber(payload.nombre_beneficiaires)+'</span> personnes bénéficient d’un chèque énergie, pour un montant moyen de <span>200</span> euros.';
    }
  },
  conversion_surface_agricole_bio: {
    label: "Conversion de la surface agricole en Bio",
    template: "Au niveau départemental, <span>{{hectares_bio}}</span> hectares sont désormais cultivés en agriculture biologique, ou sont en cours de conversion. C’est <span>{{progression}}%</span> de plus qu’en 2017."
  },
  prime_conversion_automobile: {
    label: "Prime à la conversion automobile",
    template: "Au niveau départemental, <span>{{nombre_beneficiaires}}</span> personnes ont pu bénéficier d’une prime à la conversion automobile d’un montant moyen de <span>{{montant_moyen}}</span> euros."
  },
  dedoublement_classes: {
    label: "Dédoublement de classe",
    template: function (payload) {
      if (1 === payload.total_cp_ce1) {
        return 'Dans votre commune, <span>1</span> classe de CP ou de CE1 a été dédoublée.';
      } else {
        return 'Dans votre commune, <span>'+payload.total_cp_ce1+'</span> classes de CP ou de CE1 ont été dédoublées.';
      }
    }
  }
};
